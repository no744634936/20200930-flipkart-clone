import React, { Fragment,useState} from 'react'
import Layout from "../layout/Layout.js"
import Input from "../UI//Input.js"
import {loginAction} from "../../redux/authentication/authAction.js"
import {useDispatch,useSelector} from "react-redux";
import { Redirect } from 'react-router-dom';
import { Container,Form,Button,Row,Col} from 'react-bootstrap';


function SignIn(props) {
    const [formData,setFormData]=useState({
        email:"",
        password:"",
        error:"",
    });

    const setValue= e =>setFormData({...formData,[e.target.name]:e.target.value})
   
    const {email,password,error}=formData;

    const dispatch=useDispatch();

    const submitData = async (e) => {
        console.log(formData);
        e.preventDefault();
        dispatch(loginAction(formData))
    }

    //获取state的数据，如果已登录那就
    const loginData=useSelector(state=>state.loginData)
    if(loginData.isAuthenticated){
        //这里必须要写return
        return(<Redirect to={"/"}></Redirect>)
    }
    return (
        <Fragment>
            <Layout>
                <Container>
                    <Row>
                        <Col>
                            <Form onSubmit={e => submitData(e)}>
                                <Input
                                    label="Email"
                                    placeholder="Email"
                                    value={email}
                                    type="email"
                                    name="email"
                                    onChange={e=>setValue(e)}
                                />
                                <Input
                                    label="password"
                                    placeholder="password"
                                    value={password}
                                    type="password"
                                    name="password"
                                    onChange={e=>setValue(e)}
                                />
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
                {/* <form  onSubmit={e=>submitData(e)}>
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

export default SignIn
