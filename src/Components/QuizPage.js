import React from 'react'

const Quiz = props => {
    const quiz = props.quiz
    return (
        <li>
            <p>{quiz.question}</p>
        </li>
    )
}

const QuizPage = props => {
    if(props.quizzes === null || props.quizzes === '') {
        return (
            <div>loading</div>
        )
    }
    return (
        <div>
            <p>Quiz page</p>
            <ul>
                {props.quizzes.map((quiz, i) =>
                    <Quiz
                        key={i}
                        quiz={quiz}
                    />
                )}
            </ul>
        </div>
    )
}

export default QuizPage