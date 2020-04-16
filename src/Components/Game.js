import React from 'react'
import { Link } from 'react-router-dom'

const Game = () => {
    return (
        <div>
            <h1>Who wants to be a Full Stack Developer?</h1>
            <Link to='/addgamequestion'>Create gamequestion</Link>
        </div>
    )
}

export default Game