import {createStore,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import rootReducer from "./rootReducer.js"
import { composeWithDevTools } from 'redux-devtools-extension';

//composeWithDevTools(applyMiddleware(logger)) 使用了 logger 跟 thunk ,redux-devtools-extension 三个个中间件
const store=createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store