import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Start game
// Get question
// show question
// answer
// show result

const GamePage = () => {
    const [question, setQuestion] = useState('')
    const [player, setPlayer] = useState('')

    const handleNewGame = () => {

    }

    const handleNewQuestion = () => {

    }

    const handleAnswer = () => {

    }

    return (
        <div>
            <h1>Who wants to be a Full Stack Developer?</h1>
            <Link to='/addgamequestion'>Create gamequestion</Link>
        </div>
    )
}

export default GamePage