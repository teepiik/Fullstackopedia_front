import React, { useState } from 'react'

// Constains question, answer options, answer buttons

const GameQuestion = ({ question, handleAnswer }) => {
    const [answer, setAnswer] = useState('')

    if(question === '') return null

    return (
        <div>
            {question.question}
        </div>
    )
}

export default GameQuestion