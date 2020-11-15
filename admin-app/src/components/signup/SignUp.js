import React,{Fragment,useState}from 'react'
import Layout from "../layout/Layout.js"
import Input from "../UI//Input.js"
import {useSelector,useDispatch} from "react-redux"
import {signupAction} from "../../redux/signup/signupAction.js"
import { Container,Form,Button,Row,Col} from 'react-bootstrap';


function SignUp() {
    const[formData,setFormData]=useState({
        firstName:"",
        lastName:"",
        password:"",
        email:"",
    })


    const setValue= e =>setFormData({...formData,[e.target.name]:e.target.value})
   
    const {firstName,lastName,email,password}=formData;

    const dispatch=useDispatch();
    const submitData=async (e) =>{
        e.preventDefault();
        dispatch(signupAction(formData))
    }

    
    const signupData=useSelector(state=>state.signupData)

    return (
        <Fragment>
            <Layout>
                {
                    signupData.error? signupData.error.message:""
                }
                <Container>
                    <Row>
                        <Col>
                            <Form onSubmit={e=>submitData(e)}>
                                <Row>
                                    <Col>
                                        <Input
                                            label="First Name"
                                            placeholder="First Name"
                                            name="firstName"
                                            value={firstName}
                                            type="text"
                                            onChange={e=>setValue(e)}
                                        />
                                    </Col>
                                    <Col>
                                        <Input
                                            label="Last Name"
                                            placeholder="Last Name"
                                            name="lastName"
                                            value={lastName}
                                            type="text"
                                            onChange={e=>setValue(e)}
                                        />
                                    </Col>
                                </Row>

                                <Input
                                    label="Email"
                                    placeholder="Email"
                                    name="email"
                                    value={email}
                                    type="email"
                                    onChange={e=>setValue(e)}
                                />
                                <Input
                                    label="password"
                                    placeholder="password"
                                    name="password"
                                    value={password}
                                    type="password"
                                    onChange={e=>setValue(e)}
                                />
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
                {/* <form onSubmit={e=>submitData(e)}>
                    <Input
                        label="first name" 
                        type="text"
                        placeholder="Enter first name"
                        name="firstName"
                        value={firstName}
                        onChange={e=>setValue(e)}
                    />
                    <Input
                        label="last name" 
                        type="text"
                        placeholder="Enter last name"
                        name="lastName"
                        value={lastName}
                        onChange={e=>setValue(e)}
                    />
                    <Input
                        label="email address" 
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={email}
                        onChange={e=>setValue(e)}
                    />
                    <Input
                        label="Password" 
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        value={password}
                        onChange={e=>setValue(e)}
                    />
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form> */}
            </Layout>
        </Fragment>
    )
}

export default SignUp
