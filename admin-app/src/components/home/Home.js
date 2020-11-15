import React, { Fragment } from 'react'
import Layout from "../layout/Layout.js"
import { Container ,Row,Col} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
function Home() {
    return (
        <Fragment>
            <Layout>
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
                            <div className="jumbotron">
                                <h1 className="display-4">Hello, world!</h1>
                                <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                                <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>

            </Layout>
        </Fragment>
    )
}

export default Home
