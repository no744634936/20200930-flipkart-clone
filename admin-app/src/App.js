import React ,{useEffect}from 'react';
import {BrowserRouter, Route,Switch} from "react-router-dom"
import PrivateRoute from "./components/HOC/PrivateRoute.js"
import Home from "./components/home/Home.js"
import SignIn from "./components/signin/SignIn.js"
import SignUp from "./components/signup/SignUp.js"
import {loadUserAction} from "./redux/authentication/authAction"
import { useDispatch, useSelector } from "react-redux";
import Products from "./components/products/Products.js"

function App() {

    //想在app.js 文件里面写redux，就必须把     <Provider store={store}></Provider> 放到index.js文件中去。
    //因为刷新网页redux里的state就回丢失，为了不让state丢失就要想这样每次的加载一次user的信息放入state里面
    let dispatch=useDispatch()
    let loginData = useSelector(state => state.loginData)
    useEffect(()=>{
        if(!loginData.isAuthenticated){
            dispatch(loadUserAction())
        }
    },[])
  return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <PrivateRoute exact path="/" component={Home}></PrivateRoute>
                    <PrivateRoute exact path="/products" component={Products}></PrivateRoute>
                    <PrivateRoute exact path="/orders" component={()=><p>orders</p>}></PrivateRoute>
                    <Route exact path="/signin" component={SignIn}></Route>
                    <Route exact path="/signup" component={SignUp}></Route>
                </Switch>
            </div>
        </BrowserRouter>
  );
}

export default App;
