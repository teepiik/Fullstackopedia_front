import React from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'

// TODO Change Select options to mapping

const QuestionForm = (props) => {
    return (
        <div>
            <h4>Add new Question</h4>
            <Row>
                <Col>
                    <Form onSubmit={props.handleNewQuestion}>
                        <Form.Group>
                            <Form.Label>Question: </Form.Label>
                            <Form.Control
                                {...props.newQuestion}
                            />
                            <Form.Label>Answer: </Form.Label>
                            <Form.Control
                                {...props.newAnswer}
                            />
                            <Form.Label>Category: </Form.Label>
                            <Form.Control as='select' onChange={props.handleQuizCategoryIdChange}>
                                <option value={props.categories[0].id}>{props.categories[0].categoryName}</option>
                                <option value={props.categories[1].id}>{props.categories[1].categoryName}</option>
                                <option value={props.categories[2].id}>{props.categories[2].categoryName}</option>
                                <option value={props.categories[3].id}>{props.categories[3].categoryName}</option>
                                <option value={props.categories[4].id}>{props.categories[4].categoryName}</option>
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