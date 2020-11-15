import React,{Fragment}from 'react'
import {useSelector,useDispatch} from "react-redux";
import { signoutAction } from "../../redux/authentication/authAction.js"
import {Navbar,Nav, Container} from "react-bootstrap"

function Navigation() {
    const loginData = useSelector(state => state.loginData)
    const dispatch=useDispatch();
    const logout=()=>{
        dispatch(signoutAction());
    }

    const authLinks = (
        <Fragment>
            <Nav>
                <span className="nav-link" >{loginData.user.firstName}</span>
            </Nav>
            <Nav>
                <span className="nav-link" onClick={logout}>Signout</span>
            </Nav>
        </Fragment>
    )
    const guestLinks = (
        <Fragment>
            <Nav>
                <Nav.Link href="/signin">signin</Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link href="/signup">signup</Nav.Link>
            </Nav>
        </Fragment>

    )
    return (
        <Fragment>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{zIndex: 1}}>
                <Container>
                    <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#features">Features</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>
                        </Nav>
                        {
                            loginData.isAuthenticated ? authLinks : guestLinks
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Fragment>
    )
}

export default Navigation
