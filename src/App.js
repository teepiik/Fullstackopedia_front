import React, { useState, useEffect } from 'react'
import Login from './Components/Login'
import Menu from './Components/Menu'
import NewUserForm from './Components/NewUserForm'
import Logout from './Components/Logout'
import Home from './Components/Home'
import Game from './Components/Game'
import QuizPage from './Components/QuizPage'
import Notification from './Components/Notification'
import {
    BrowserRouter as Router,
    Route, Redirect
} from 'react-router-dom'
import loginService from './Services/login'
import userService from './Services/user'
import categoryService from './Services/categories'
import quizService from './Services/quiz'

const App = () => {
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [categories, setCategories] = useState('')
    const [quizzes, setQuizzes] = useState('')

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if(loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
        }
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const categories = await categoryService.getAll()
            setCategories(categories)
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const quizzes = await quizService.getAll()
            setQuizzes(quizzes)
        }
        fetchData()
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            setUser(user)
            setUsername('')
            setPassword('')
            setUpNotification(`Logged in as ${user.username}`)
        } catch (error) {
            setUpNotification('Login failed.')
            setPassword('')
        }
    }

    const handleNewUser = async (event) => {
        event.preventDefault()
        try {
            const newUser = await userService.newUser({ username:newUsername, password:newPassword })

            setUpNotification(`${newUser.username} created!`)
            setNewUsername('')
            setNewPassword('')
        } catch(error) {
            setUpNotification('New user registration failed.')
        }
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleNewUsernameChange = (event) => {
        setNewUsername(event.target.value)
    }

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value)
    }

    const handleLogout = () => {
        window.localStorage.clear()
        setUser(null)
        setUpNotification('Logged out')
    }

    const setUpNotification = (message) => {
        setMessage(message)
        setTimeout(() => {
            setMessage(null)
        }, 5000)
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
                        <Login handleLogin={handleLogin}
                            username={username}
                            password={password}
                            handleUsernameChange={handleUsernameChange}
                            handlePasswordChange={handlePasswordChange}
                        />}
                    />
                    <Route exact path = '/quiz' render={() =>
                        <QuizPage
                            categories={categories}
                            quizzes={quizzes}
                        />}
                    />
                    <Route path='/game' render={() => user ?
                        <Game /> :
                        <Redirect to='/login' />} />
                    <Route path = '/register' render={() =>
                        <NewUserForm handleNewUser={handleNewUser}
                            newUsername={newUsername}
                            newPassword={newPassword}
                            handleNewUsernameChange={handleNewUsernameChange}
                            handleNewPasswordChange={handleNewPasswordChange}
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