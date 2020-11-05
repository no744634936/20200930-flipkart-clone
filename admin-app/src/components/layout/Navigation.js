import React,{Fragment}from 'react'
import {Link} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux";
import {signoutAction} from "../../redux/authentication/authAction.js"

function Navigation() {
    const loginData = useSelector(state => state.loginData)

    const dispatch=useDispatch();
    const logout=()=>{
        dispatch(signoutAction());
    }
    
    const authLinks = (
        <ul className="navbar-nav ml-auto">
        <li className="nav-item">
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
        </li>
            <li className="nav-item">
            <Link className="nav-link" to="#!">{loginData.user.firstName}</Link>
        </li>
        <li className="nav-item">
                <span className="nav-link" onClick={logout}>Signout</span>
        </li>
    </ul>
    )
    const guestLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/signin">signin</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/signup">signup</Link>
            </li>
        </ul>
    )
    return (
        <Fragment>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-3">
                <div className="container">
                    <Link className="navbar-brand" href="#">EC site</Link>
                    <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        {

                                loginData.isAuthenticated ? authLinks : guestLinks
                        }
                    </div>
                </div>
            </nav>
        </Fragment>
    )
}

export default Navigation
