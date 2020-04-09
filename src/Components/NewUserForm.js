import React from 'react'
import { useField } from '../Hooks/hooks'
import { Form, Button, Row, Col } from 'react-bootstrap'

const NewUserForm = ({ handleNewUser }) => {
    const newUsername = useField('text')
    const newPassword = useField('password')

    const createUser = (event) => {
        event.preventDefault()
        handleNewUser({ username:newUsername.field.value, password:newPassword.field.value })
        newUsername.setEmpty()
        newPassword.setEmpty()
    }

    return (
        <div>
            <h2>Register new Player</h2>
            <Row>
                <Col>
                    <Form onSubmit={createUser}>
                        <Form.Group>
                            <Form.Label>Username: </Form.Label>
                            <Form.Control
                                {...newUsername.field}
                            />
                            <Form.Label>Password: </Form.Label>
                            <Form.Control
                                {...newPassword.field}
                            />
                            <Button className='button' variant='dark' type='submit'>
                                Register
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
        </div>
    )
}

export default NewUserForm