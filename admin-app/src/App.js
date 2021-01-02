import React ,{useEffect}from 'react';
import {BrowserRouter, Route,Switch} from "react-router-dom"
import PrivateRoute from "./components/HOC/PrivateRoute.js"
import Home from "./components/home/Home.js"
import SignIn from "./components/signin/SignIn.js"
import SignUp from "./components/signup/SignUp.js"
import NewPage from "./components/newPage/NewPage.js"
import {loadUserAction} from "./redux/authentication/authAction"
import { useDispatch, useSelector } from "react-redux";
import Products from "./components/products/Products.js"
import Category from "./components/category/Category.js"
// import {getAllCategories} from "./redux/category/categoryAction.js"
import {getInitialData} from "./redux/initData/initDataAction.js"

function App() {

    //想在app.js 文件里面写redux，就必须把     <Provider store={store}></Provider> 放到index.js文件中去。
    //因为刷新网页redux里的state就回丢失，为了不让state丢失就要想这样每次的加载一次user的信息放入state里面
    let dispatch=useDispatch()
    let loginData = useSelector(state => state.loginData)
    useEffect(()=>{
        if(!loginData.isAuthenticated){
            dispatch(loadUserAction())
        }

        //只有当用户登录之后才加载数据，没登陆不加载，在登录页面的时候
        //不使用getInitialData()方法，
        //useEffect 相当于componentDidMount 与  componentDidUpdate
        //因为app是root文件，当打登录页面之后，useEffect就已经执行了componentDidMount
        //而这个时候因为用户还没有登录，所以没有调用getInitialData()方法
        //即使你去了category页面也得不到categories跟products的数据，
        //现在就是要写上[loginData.isAuthenticated]
        //当loginData.isAuthenticated改变的时候执行componentDidUpdate 方法。
        //就可以得到categories跟products的数据，
        if(loginData.isAuthenticated){
            dispatch(getInitialData())
        }
    },[loginData.isAuthenticated])
  return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <PrivateRoute exact path="/" component={Home}></PrivateRoute>
                    <PrivateRoute exact path="/page" component={NewPage}></PrivateRoute>
                    <PrivateRoute exact path="/products" component={Products}></PrivateRoute>
                    <PrivateRoute exact path="/category" component={Category}></PrivateRoute>
                    <PrivateRoute exact path="/orders" component={()=><p>orders</p>}></PrivateRoute>
                    <Route exact path="/signin" component={SignIn}></Route>
                    <Route exact path="/signup" component={SignUp}></Route>
                </Switch>
            </div>
        </BrowserRouter>
  );
}

export default App;
