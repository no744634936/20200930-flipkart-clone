import React,{Fragment,useState}from 'react'
import Layout2 from "../layout/Layout2.js"
import Input from "../UI//Input.js"
import {useSelector,useDispatch} from "react-redux"
import {signupAction} from "../../redux/signup/signupAction.js"


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
            <Layout2>
                {
                    signupData.error? signupData.error.message:""
                }
                <form onSubmit={e=>submitData(e)}>
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
                </form>
            </Layout2>
        </Fragment>
    )
}

export default SignUp
