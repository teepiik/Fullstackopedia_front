import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Gameservice from '../../Services/game'

// Start game
// Get question
// show question
// answer
// show result

const GamePage = (props) => {
    const [question, setQuestion] = useState('')
    const user = props.user // Tarviiko päivittää?? todnäk

    // TODO check this with logout, possible bugs
    // TODO, vedä player tila suoraan user tilaks ja pyöritä sitä app js
    useEffect(() => {
        Gameservice.setToken(user.token)
    }, [])

    const handleNewGame = async () => {
        const res = await Gameservice.startNewGame(user.id)
        const updatedUser = { ...user }
        updatedUser.gameLevel = res.gameLevel
        props.setUser(updatedUser)
        console.log(updatedUser)
    }

    const handleNewQuestion = () => {

    }

    const handleAnswer = () => {

    }

    return (
        <div>
            <h1>Who wants to be a Full Stack Developer?</h1>
            <Button onClick={() => handleNewGame()}>Start new game</Button>
            <Link to='/addgamequestion'>Create gamequestion</Link>
        </div>
    )
}

export default GamePage