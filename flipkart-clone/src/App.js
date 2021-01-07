import './App.css';
import HomePage from "./components/homePage/HomePage.js"
import ProductListPage from "./components/productListPage/productListPage.js"
import {BrowserRouter, Route,Switch} from "react-router-dom"

function App() {
  return (

    <BrowserRouter>
    <div className="App">
        <Switch>
            <Route exact path="/" component={HomePage}></Route>
            <Route path="/:slug" component={ProductListPage}></Route>
        </Switch>
    </div>
</BrowserRouter>
  );
}

export default App;
