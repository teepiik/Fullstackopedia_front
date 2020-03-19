import React from 'react'
import { Navbar, Container, NavbarBrand } from 'react-bootstrap'

const Footer = () => {
    const style = {
        marginTop: '30px'
    }

    return (
        <div className='fixed-bottom'>
            <Navbar style={style}>
                <Container>
                    <NavbarBrand>Footer</NavbarBrand>
                </Container>
            </Navbar>
        </div>
    )
}

export default Footer