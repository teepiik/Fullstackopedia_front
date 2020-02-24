import React from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'

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