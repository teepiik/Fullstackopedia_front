import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Gameservice from '../../Services/game'
import GameQuestion from '../Game/GameQuestion'

// Start game
// Get question
// show question
// answer
// show result

const GamePage = (props) => {
    const [question, setQuestion] = useState('')
    const user = props.user // Tarviiko päivittää?? todnäk

    // TODO check this with logout, possible bugs
    // TODO token updating?
    // TODO RELOAD BUG, not updating as should
    useEffect(() => {
        if(user !== null) {
            Gameservice.setToken(user.token)
        }
    }, [])

    // Starts a new game
    const handleNewGame = async () => {
        const res = await Gameservice.startNewGame(user.id)
        const updatedUser = { ...user } // stupid des?
        updatedUser.gameLevel = res.gameLevel
        props.setUser(updatedUser)
    }

    // Gets next question
    const getNextQuestion = async () => {
        const res = await Gameservice.getQuestion(user.id)
        setQuestion(res)
        console.log(res)
    }

    const handleAnswer = () => {

    }

    return (
        <div>
            <h1>Who wants to be a Full Stack Developer?</h1>
            <Button onClick={() => handleNewGame()}>Start new game</Button>
            <Button onClick={() => getNextQuestion()}>question</Button>
            <Link to='/addgamequestion'>Create gamequestion</Link>
            <GameQuestion question={question} />
        </div>
    )
}

export default GamePage