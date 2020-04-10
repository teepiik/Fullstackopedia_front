import React, { useState } from 'react'
import { useField } from '../Hooks/hooks'
import { Form, Button, Row, Col } from 'react-bootstrap'

const GameQuizForm = (props) => {
    const question = useField('text')
    const choiceA = useField('text')
    const choiceB = useField('text')
    const choiceC = useField('text')
    const choiceD = useField('text')
    const [rightAnswer, setRightAnswer] = useState('A')
    const [level, setLevel] = useState(1)
    const labels = ['A', 'B', 'C', 'D']
    const levels = [1, 2, 3, 4, 5, 6, 7, 8]

    const createNewQuestion = (event) => {
        event.preventDefault()
        const quizObject = {
            question: question.field.value,
            choiceA: choiceA.field.value,
            rightAnswer,
            level
        }
        props.handleNewGameQuestion(quizObject)
        question.setEmpty()
        choiceA.setEmpty()
        choiceB.setEmpty()
        choiceC.setEmpty()
        choiceD.setEmpty()
    }

    const handleRightAnswerChange = (event) => {
        setRightAnswer(event.target.value)
    }

    const handleLevelChange = (event) => {
        setLevel(event.target.value)
    }

    const makeRows = (choices) =>
        choices.map(c =>
            <option key={c} value={c}>{c}</option>
        )

    return (
        <div>
            <h4>Add new Question</h4>
            <Row>
                <Col>
                    <Form onSubmit={createNewQuestion}>
                        <Form.Group>
                            <Form.Label>Question</Form.Label>
                            <Form.Control
                                as="textarea" rows="2"
                                {...question.field}
                            />
                            <Form.Label>Choice A</Form.Label>
                            <Form.Control
                                as="textarea" rows="2"
                                {...choiceA.field}
                            />
                            <Form.Label>Choice B</Form.Label>
                            <Form.Control
                                as="textarea" rows="2"
                                {...choiceB.field}
                            />
                            <Form.Label>Choice C</Form.Label>
                            <Form.Control
                                as="textarea" rows="2"
                                {...choiceC.field}
                            />
                            <Form.Label>Choice D</Form.Label>
                            <Form.Control
                                as="textarea" rows="2"
                                {...choiceD.field}
                            />
                            <Form.Label>Right Answer</Form.Label>
                            <Form.Control as='select' onChange={handleRightAnswerChange}>
                                {makeRows(labels)}
                            </Form.Control>
                            <Form.Label>Question Level</Form.Label>
                            <Form.Control as='select' onChange={handleLevelChange}>
                                {makeRows(levels)}
                            </Form.Control>
                            <Button className='button' variant='dark' type='submit'>
                                Create
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col></Col>
            </Row>

        </div>
    )

}

export default GameQuizForm