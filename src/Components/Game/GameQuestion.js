import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'

// Constains question, answer options

const GameQuestion = ({ question, setAnswer }) => {
    //const [answer, setAnswer] = useState('')

    if(question === '') return null

    const handleAnswerChange = (event) => {
        setAnswer(event.target.value)
    }

    return (
        <div>
            <Row>
                <Col>
                    <Form>
                        <Form.Group>
                            <Form.Label>{question.question}</Form.Label>
                            <Form.Control as='select' onChange={handleAnswerChange}>
                                <option key={'A'} value={'A'}>{question.choiceA}</option>
                                <option key={'B'} value={'B'}>{question.choiceB}</option>
                                <option key={'C'} value={'C'}>{question.choiceC}</option>
                                <option key={'D'} value={'D'}>{question.choiceD}</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
        </div>
    )
}

export default GameQuestion