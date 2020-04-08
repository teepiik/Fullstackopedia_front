import React from 'react'
import userService from '../Services/user'
import { useField } from '../Hooks/hooks'
import { Form, Button, Row, Col } from 'react-bootstrap'

const NewUserForm = (props) => {
    const newUsername = useField('text')
    const newPassword = useField('password')

    const handleNewUser = async () => {
        try {
            const newUser = await userService.newUser({ username:newUsername.field.value, password:newPassword.field.value })
            props.setUpNotification(`${newUser.username} created!`)
            newUsername.setEmpty()
            newPassword.setEmpty()
        } catch(error) {
            props.setUpNotification('New user registration failed.')
        }
    }

    return (
        <div>
            <h2>Register new Player</h2>
            <Row>
                <Col>
                    <Form onSubmit={() => handleNewUser()}>
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