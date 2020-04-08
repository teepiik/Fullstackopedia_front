import React, { useState, useEffect } from 'react'
import Login from './Components/Login'
import Menu from './Components/Menu'
import NewUserForm from './Components/NewUserForm'
import Logout from './Components/Logout'
import Home from './Components/Home'
import Game from './Components/Game'
import WarmupPage from './Components/WarmupPage'
import Notification from './Components/Notification'
import {
    BrowserRouter as Router,
    Route, Redirect
} from 'react-router-dom'
import { useField } from './Hooks/hooks'
import categoryService from './Services/categories'
import quizService from './Services/quiz'

const App = () => {
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState('')
    const [categories, setCategories] = useState(null)
    const [quizzes, setQuizzes] = useState(null)
    const newQuestion = useField('text')
    const newAnswer = useField('text')
    const [newQuizCategoryId, setNewQuizCategoryId] = useState('')

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if(loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
        }
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const quizzes = await quizService.getAll()
            setQuizzes(quizzes)
            const categories = await categoryService.getAll()
            setCategories(categories)
        }
        fetchData()
    }, [])

    const setUpNotification = (message) => {
        setMessage(message)
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    const QuestionFormRef = React.createRef()

    const handleQuizCategoryIdChange = (event) => {
        setNewQuizCategoryId(event.target.value)
    }

    const handleNewQuestion = async (event) => {
        event.preventDefault()
        try {
            QuestionFormRef.current.toggleVisibility()
            const quizObject = {
                question: newQuestion.field.value,
                answer: newAnswer.field.value,
                category_id: newQuizCategoryId
            }
            quizService.setToken(user.token)
            const newQuiz = await quizService.create(quizObject)
            setQuizzes(quizzes.concat(newQuiz))
            newQuestion.setEmpty()
            newAnswer.setEmpty()
            setUpNotification('New question added!')
        } catch (error) {
            console.log(error)
            // TODO SOMETHING ELSE
        }
    }
    /* HUOMHUOMHUOM
        CLEAN APP.JS
        siirrä fieldit formeille ja muuta handlesendit sen mukaan

        Lisää gameQui service, gameservice etc
        componentteja, routea
    */

    const handleLogout = () => {
        window.localStorage.clear()
        setUser(null)
        setUpNotification('Logged out')
    }

    return (
        <div className='container'>
            <Router>
                <div>
                    <div>
                        <Menu user={user} />
                        <Notification message={message} />
                    </div>
                    <Route exact path = '/' render={() => <Home />} />
                    <Route path = '/login' render={() =>
                        <Login
                            setUser={setUser}
                            setUpNotification={setUpNotification}
                        />}
                    />
                    <Route exact path = '/warmup' render={() =>
                        <WarmupPage
                            categories={categories}
                            quizzes={quizzes}
                            handleNewQuestion={handleNewQuestion}
                            newQuestion={newQuestion.field}
                            newAnswer={newAnswer.field}
                            QuestionFormRef={QuestionFormRef}
                            handleQuizCategoryIdChange={handleQuizCategoryIdChange}
                        />}
                    />
                    <Route path='/game' render={() => user ?
                        <Game /> :
                        <Redirect to='/login' />} />
                    <Route path = '/register' render={() =>
                        <NewUserForm
                            setUpNotification={setUpNotification}
                        />}
                    />
                    <Route path = '/logout' render={() =>
                        <Logout handleLogout={handleLogout} />}
                    />
                </div>
            </Router>
        </div>
    )
}

export default App