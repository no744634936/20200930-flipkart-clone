import React from 'react'
import { Container ,Row,Col} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import "./Sidebar.style.css"
function Sidebar(props) {
    return (
        <Container fluid>
        <Row>
            <Col md={2} className="sidebar">
                <ul>
                    <li><NavLink to={"/"}>Home</NavLink></li>
                    <li><NavLink to={"/products"}>Products</NavLink></li>
                    <li><NavLink to={"/orders"}>Orders</NavLink></li>
                </ul>
            </Col>
            <Col md={10} className="content">
                {props.children}
            </Col>
        </Row>
    </Container>
    )
}

export default Sidebar
