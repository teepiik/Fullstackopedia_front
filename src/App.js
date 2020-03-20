import React, { useState, useEffect } from 'react'
import Login from './Components/Login'
import Menu from './Components/Menu'
import NewUserForm from './Components/NewUserForm'
import Logout from './Components/Logout'
import Home from './Components/Home'
import Game from './Components/Game'
import WarmupPage from './Components/WarmupPage'
import Notification from './Components/Notification'
import Footer from './Components/Footer'
import {
    BrowserRouter as Router,
    Route, Redirect
} from 'react-router-dom'
import { useField } from './Hooks/hooks'
import loginService from './Services/login'
import userService from './Services/user'
import categoryService from './Services/categories'
import quizService from './Services/quiz'

const App = () => {
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState('')
    const username = useField('text')
    const password = useField('password')
    const newUsername = useField('text')
    const newPassword = useField('password')
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

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username:username.field.value, password:password.field.value })
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            setUser(user)
            username.setEmpty()
            password.setEmpty()
            setUpNotification(`Logged in as ${user.username}`)
        } catch (error) {
            setUpNotification('Login failed.')
            password.setEmpty()
        }
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

    const handleNewUser = async (event) => {
        event.preventDefault()
        try {
            const newUser = await userService.newUser({ username:newUsername.field.value, password:newPassword.field.value })
            setUpNotification(`${newUser.username} created!`)
            newUsername.setEmpty()
            newPassword.setEmpty()
        } catch(error) {
            setUpNotification('New user registration failed.')
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
                            username={username.field}
                            password={password.field}
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
                            handleNewUser={handleNewUser}
                            newUsername={newUsername.field}
                            newPassword={newPassword.field}
                        />}
                    />
                    <Route path = '/logout' render={() =>
                        <Logout handleLogout={handleLogout} />}
                    />
                </div>
            </Router>
            <Footer />
        </div>
    )
}

export default App