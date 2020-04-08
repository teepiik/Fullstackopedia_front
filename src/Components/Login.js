import React from 'react'
import { useField } from '../Hooks/hooks'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import loginService from '../Services/login'

const Login = (props) => {
    const username = useField('text')
    const password = useField('password')

    // TODO Fix post login redirect, reload problem

    const handleLogin = async () => {
        try {
            console.log(username.field.value)
            const user = await loginService.login({ username:username.field.value, password:password.field.value })
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            props.setUser(user)
            username.setEmpty()
            password.setEmpty()
            props.setUpNotification(`Logged in as ${user.username}`)
        } catch (error) {
            props.setUpNotification('Login failed.')
            password.setEmpty()
        }
    }

    return (
        <div>
            <h2>Log in</h2>
            <Row>
                <Col>
                    <Form onSubmit={() => handleLogin()}>
                        <Form.Group>
                            <Form.Label>Username: </Form.Label>
                            <Form.Control
                                {...username.field}
                            />
                            <Form.Label>Password: </Form.Label>
                            <Form.Control
                                {...password.field}
                            />
                            <Button className='button' variant='dark' type='submit'>
                                login
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
            <p> You can also register new user <Link to='/register'>here</Link></p>
        </div>
    )
}

export default Login