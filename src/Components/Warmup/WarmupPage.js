import React, { useState } from 'react'
import QuizForm from './QuizForm'
import Togglable from '../Togglable'
import { Button, Card, Row, Col } from 'react-bootstrap'

const Quiz = props => {
    const [showAns, setShowAns] = useState(false)
    const quiz = props.quiz

    // prevent null pointer crash
    if(props.quiz === null || props.categories === null) {
        return null
    }
    // Find category info
    const category = props.categories.find(c => c.id === quiz.category)

    // Reveal or hide the answer
    const handleAnswer = () => {
        setShowAns(!showAns)
    }

    return (
        <div>
            <Card>
                <Card.Header>Category: {category.categoryName}</Card.Header>
                <Card.Body>
                    <Card.Title>{quiz.question}</Card.Title>
                    <Card.Text>
                        {showAns ? quiz.answer : ''}
                    </Card.Text>
                    <Button
                        variant="dark"
                        onClick={() => handleAnswer()}
                    >
                        {showAns ? 'Hide answer': 'Show answer'}
                    </Button>
                </Card.Body>
            </Card>
        </div>
    )
}

const WarmupPage = props => {
    const [currentQuiz, setCurrentQuiz] = useState(null)

    const handleNextQuestion = () => {
        setCurrentQuiz(props.quizzes[Math.floor(Math.random() * props.quizzes.length)])
    }

    // prevent null pointer crash
    if(props.quizzes === null || props.categories === null) {
        return (
            <div>loading</div>
        )
    }
    return (
        <div>
            <h3>This is warm up area</h3>
            <p>Answer random questions to get ready for the game.</p>
            <Row>
                <Col>
                    <Quiz quiz={currentQuiz} categories={props.categories}/>
                    <Button variant='dark' onClick={() => handleNextQuestion()}>Next question</Button>
                </Col>
                <Col>
                    <Togglable buttonLabel='Create Warm-up question' ref={props.QuizFormRef}>
                        <QuizForm
                            handleNewQuestion={props.handleNewQuestion}
                            newQuestion={props.newQuestion}
                            newAnswer={props.newAnswer}
                            categories={props.categories}
                            handleQuizCategoryIdChange={props.handleQuizCategoryIdChange}
                        />
                    </Togglable>
                </Col>
            </Row>
        </div>
    )
}

export default WarmupPage