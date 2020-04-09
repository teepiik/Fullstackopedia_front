import React from 'react'
import { useField } from '../Hooks/hooks'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Login = ({ handleLogin }) => {
    const username = useField('text')
    const password = useField('password')

    const login = (event) => {
        event.preventDefault()
        handleLogin({ username:username.field.value, password:password.field.value })
        username.setEmpty()
        password.setEmpty()
    }

    return (
        <div>
            <h2>Log in</h2>
            <Row>
                <Col>
                    <Form onSubmit={login}>
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