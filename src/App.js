import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
// Components
import Login from './Components/Login'
import Menu from './Components/Menu'
import NewUserForm from './Components/NewUserForm'
import Logout from './Components/Logout'
import Home from './Components/Home'
import Game from './Components/Game'
import WarmupPage from './Components/WarmupPage'
import GameQuizForm from './Components/GameQuizForm'
import Notification from './Components/Notification'
// Services
import loginService from './Services/login'
import userService from './Services/user'
import categoryService from './Services/categories'
import quizService from './Services/quiz'
import gameService from './Services/game'

const App = () => {
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState('')
    const [categories, setCategories] = useState(null)
    const [quizzes, setQuizzes] = useState(null)

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

    // For warm-up page
    const QuestionFormRef = React.createRef()

    const handleLogin = async (userObject) => {
        try {
            const user = await loginService.login(userObject)
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            setUser(user)
            setUpNotification(`Logged in as ${user.username}`)
        } catch (error) {
            setUpNotification('Login failed.')
        }
    }

    // User registeration
    const handleNewUser = async (newUserObject) => {
        try {
            const newUser = await userService.newUser(newUserObject)
            setUpNotification(`${newUser.username} created!`)
        } catch(error) {
            setUpNotification('New user registration failed.')
        }
    }
    // Warm-up question
    const handleNewQuestion = async (quizObject) => {
        try {
            QuestionFormRef.current.toggleVisibility()
            quizService.setToken(user.token)
            const newQuiz = await quizService.create(quizObject)
            setQuizzes(quizzes.concat(newQuiz))
            setUpNotification('New question added!')
        } catch (error) {
            // Add better message from logs
            setUpNotification('Creation failed')
        }
    }

    // Game question
    const handleNewGameQuestion = async (quizObject) => {
        try {
            gameService.setToken(user.token)
            const newQuiz = await gameService.create(quizObject)
            console.log(newQuiz)
            setUpNotification('New question added!')
        } catch (error) {
            // Add better message from logs
            setUpNotification('Creation failed')
        }
    }

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
                            handleLogin={handleLogin}
                        />}
                    />
                    <Route exact path = '/warmup' render={() =>
                        <WarmupPage
                            categories={categories}
                            quizzes={quizzes}
                            handleNewQuestion={handleNewQuestion}
                            QuestionFormRef={QuestionFormRef}
                        />}
                    />
                    <Route exact path = '/addgamequestion' render={() =>
                        <GameQuizForm
                            handleNewGameQuestion={handleNewGameQuestion}
                        />}
                    />
                    <Route path='/game' render={() => user ?
                        <Game /> :
                        <Redirect to='/login' />} />
                    <Route path = '/register' render={() =>
                        <NewUserForm
                            handleNewUser={handleNewUser}
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