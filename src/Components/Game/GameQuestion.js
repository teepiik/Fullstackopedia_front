import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'

// Constains question, answer options, answer buttons

const GameQuestion = ({ question, handleAnswer }) => {
    const [answer, setAnswer] = useState('')

    if(question === '') return null

    const handleLevelChange = (event) => {
        setAnswer(event.target.value)
    }

    const sendAnswer = (e) => {
        e.preventDefault()
        console.log(answer)
    }

    return (
        <div>
            <Row>
                <Col>
                    <Form onSubmit={() => sendAnswer()}>
                        <Form.Group>
                            <Form.Label>{question.question}</Form.Label>
                            <Form.Control as='select' onChange={handleLevelChange}>
                                <option key={'A'} value={'A'}>{question.choiceA}</option>
                                <option key={'B'} value={'B'}>{question.choiceB}</option>
                                <option key={'C'} value={'C'}>{question.choiceC}</option>
                                <option key={'D'} value={'D'}>{question.choiceD}</option>
                            </Form.Control>
                            <Button className='button' variant='dark' type='submit'>
                                Answer
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
        </div>
    )
}

export default GameQuestion