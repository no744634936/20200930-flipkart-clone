import React, {useState,useEffect} from 'react';
import './App.css';
import HomePage from "./components/homePage/HomePage.js"
import ProductListPage from "./components/productListPage/ProductListPage.js"
import ProductDetailsPage from "./components/productListPage/ProductDetailsPage/ProductDetailsPage.js"
import {BrowserRouter, Route,Switch} from "react-router-dom"
import { useDispatch, useSelector, } from "react-redux"
import { loadUserAction } from './redux/auth/authAction';
function App() {

  let dispatch=useDispatch()
  let loginData = useSelector(state => state.loginData)

  useEffect(() => {
    if (!loginData.isAuthenticated) {
      dispatch(loadUserAction())
    }
  }, [loginData.isAuthenticated])



  return (
    <BrowserRouter>
    <div className="App">
        <Switch>
            <Route exact path="/" component={HomePage}></Route>
            <Route exact path="/:slug" component={ProductListPage}></Route>
            <Route exact path="/:productSlug/:productId" component={ProductDetailsPage}></Route>
        </Switch>
    </div>
</BrowserRouter>
  );
}

export default App;
