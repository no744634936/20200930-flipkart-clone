import axios from "axios"
import {backend_base_url} from "./backendBaseUrl.js"
import store from "../redux/store.js"
import {LOGOUT} from "../redux/actionTypes.js"

const token = localStorage.getItem('token');
console.log("token",token);
const axiosInstance = axios.create({
    baseURL:backend_base_url,
    headers: {
        'Authorization': token ? `${token}` : ''
    }
})


//リクエストとレスポンスの前に処理を共通化させる場合などに使えると思います。
//固定写法 
axiosInstance.interceptors.request.use(req=>{
    return req
})
axiosInstance.interceptors.response.use(res=>{
    // // console.log(res.data);
    // if(res.data.errnum===10020){
    //     console.log("ttttttt");
    //     //jwt 过期，token被更改之类的错误就会自动退出登录
    //     localStorage.clear();
    //     store.dispatch({type:LOGOUT})
    // }else{
    //     console.log("ggggg",res);
    //     return res
    // }
    return res
})


export default axiosInstance