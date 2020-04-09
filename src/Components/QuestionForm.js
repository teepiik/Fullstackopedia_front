import React, { useState } from 'react'
import { useField } from '../Hooks/hooks'
import { Form, Button, Row, Col } from 'react-bootstrap'

const QuestionForm = (props) => {
    const newQuestion = useField('text')
    const newAnswer = useField('text')
    const [newQuizCategoryId, setNewQuizCategoryId] = useState(props.categories[0].id)

    const handleQuizCategoryIdChange = (event) => {
        setNewQuizCategoryId(event.target.value)
    }

    const createNewQuestion = (event) => {
        event.preventDefault()
        const quizObject = {
            question: newQuestion.field.value,
            answer: newAnswer.field.value,
            category_id: newQuizCategoryId
        }
        props.handleNewQuestion(quizObject)
        newQuestion.setEmpty()
        newAnswer.setEmpty()
    }

    const categoryRows = () =>
        props.categories.map(c =>
            <option key={c.id} value={c.id}>{c.categoryName}</option>
        )

    return (
        <div>
            <h4>Add new Question</h4>
            <Row>
                <Col>
                    <Form onSubmit={createNewQuestion}>
                        <Form.Group>
                            <Form.Label>Question: </Form.Label>
                            <Form.Control
                                {...newQuestion.field}
                            />
                            <Form.Label>Answer: </Form.Label>
                            <Form.Control
                                {...newAnswer.field}
                            />
                            <Form.Label>Category: </Form.Label>
                            <Form.Control as='select' onChange={handleQuizCategoryIdChange}>
                                {categoryRows()}
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

export default QuestionForm