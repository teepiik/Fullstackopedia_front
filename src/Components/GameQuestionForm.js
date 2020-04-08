import React from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useField, useSelectField } from '../Hooks/hooks'

const GameQuestionForm = () => {
    const question = useField('text')
    const optionA = useField('text')
    const optionB = useField('text')
    const optionC = useField('text')
    const optionD = useField('text')
    const correctAnswer = useSelectField(['A', 'B', 'C', 'D'])

    const handleNewGameQuestion = () => {
        //gameService.setToken(user.token) // gameservice
    }

    return (
        <div>
            <h4>Add new Question</h4>
            <Row>
                <Col>
                    <Form onSubmit={() => handleNewGameQuestion()}>
                        <Form.Group>
                            <Form.Label>Question: </Form.Label>
                            <Form.Control
                                {...question.field}
                            />
                            <Form.Label>Option A</Form.Label>
                            <Form.Control
                                {...optionA.field}
                            />
                            <Form.Label>Option B</Form.Label>
                            <Form.Control
                                {...optionB.field}
                            />
                            <Form.Label>Option C</Form.Label>
                            <Form.Control
                                {...optionC.field}
                            />
                            <Form.Label>Option D</Form.Label>
                            <Form.Control
                                {...optionD.field}
                            />
                            <Form.Label>Right Answer </Form.Label>
                            <Form.Control
                                {...correctAnswer.field}
                            >
                                {correctAnswer.makeRows()}
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

export default GameQuestionForm