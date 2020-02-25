import React from 'react'
import QuestionForm from './QuestionForm'
import Togglable from './Togglable'

const Quiz = props => {
    const quiz = props.quiz
    return (
        <li>
            <p>{quiz.question}</p>
        </li>
    )
}

const QuizPage = props => {
    if(props.quizzes === null || props.categories === null) {
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
            <Togglable buttonLabel='New Question' ref={props.QuestionFormRef}>
                <QuestionForm
                    handleNewQuestion={props.handleNewQuestion}
                    newQuestion={props.newQuestion}
                    newAnswer={props.newAnswer}
                    categories={props.categories}
                    handleQuizCategoryIdChange={props.handleQuizCategoryIdChange}
                />
            </Togglable>
        </div>
    )
}

export default QuizPage