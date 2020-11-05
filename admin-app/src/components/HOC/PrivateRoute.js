//私有路由是固定的写法，记下来就可以了，不用弄懂
//如果没有token就跳转到signin页面

import React from 'react'
import {Route,Redirect} from "react-router-dom"

function PrivateRoute({component:Component,...rest}) {
    return (
        <Route {...rest} component={(props)=>{
            let token=window.localStorage.getItem("token")
            if(token){
                return (<Component {...props}></Component>)
            } else {
                //如果没有登录就跳转到signin界面
                return (<Redirect to="/signin"/>)
            }
        }}></Route>
    )
}

export default PrivateRoute

