import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Menu = (props) => {
    return(
        <div className='menu'>
            <Navbar collapseOnSelect expand='md' bg='dark' variant='dark'>
                <Navbar.Toggle aira-controls='responsive-navbar-nav' />
                <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav className='mr-auto'>
                        <Nav.Link href='#' as='span'>
                            <Link className='menulink' to='/'>Home</Link>
                        </Nav.Link>
                        <Nav.Link href='#' as='span'>
                            <Link className='menulink' to='/quiz'>Quiz</Link>
                        </Nav.Link>
                        <Nav.Link href='#' as='span'>
                            <Link className='menulink' to='/game'>Game</Link>
                        </Nav.Link>
                        <Nav.Link href='#' as='span'>
                            {props.user
                                ? <Link className='menulink' to='/logout'>Logout</Link> :
                                <Link className='menulink' to='/login'>Login</Link>
                            }
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Menu