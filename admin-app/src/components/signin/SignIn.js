import React, { Fragment,useState} from 'react'
import Layout2 from "../layout/Layout2.js"
import Input from "../UI//Input.js"
import {loginAction} from "../../redux/authentication/authAction.js"
import {useDispatch,useSelector} from "react-redux";
import { Redirect } from 'react-router-dom';


function SignIn(props) {
    const [formData,setFormData]=useState({
        email:"",
        password:"",
        error:"",
    });

    const setValue= e =>setFormData({...formData,[e.target.name]:e.target.value})
    const {email,password,error}=formData;
    const dispatch=useDispatch();

    const submitData=async (e) =>{
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
            <Layout2>
                <form  onSubmit={e=>submitData(e)}>
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
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </Layout2>
        </Fragment>
    )
}

export default SignIn
