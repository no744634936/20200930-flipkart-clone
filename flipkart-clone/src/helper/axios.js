import axios from "axios"
import {backend_base_url} from "./backendBaseUrl.js"
import store from "../redux/store.js"
import {userConstants} from "../redux/actionTypes.js"


// const token = localStorage.getItem('token');
const axiosInstance = axios.create({
    baseURL:backend_base_url,
    // headers: {
    //     'Authorization': token ? `${token}` : ''
    // }
})


//リクエストとレスポンスの前に処理を共通化させる場合などに使えると思います。
//固定写法 
axiosInstance.interceptors.request.use(req=>{
    const { loginData } = store.getState();
    //每次请求都api都携带token
    console.log("token",loginData.token);
    if (loginData.token) {
      req.headers.Authorization = `${loginData.token}`;
    }
    return req
})



axiosInstance.interceptors.response.use(res=>{
    console.log("jwt",res);
    if(res.data.errnum===10020){
        //jwt 过期，token被更改之类的错误就会自动退出登录
        localStorage.clear();
        store.dispatch({type:userConstants.LOGOUT})
        //终止请求，因为后端不管发生什么都一定会返回一个response，所以必须手动写个error来终止程序
        //这样写之后，每次用axios呼叫api就都要用try catch了
        throw new axios.Cancel('Operation canceled');
    }else{
        return res
    }
},(error)=>{
    return Promise.reject(error);
})


export default axiosInstance