import axios from "axios"

//设置一个全局的header,使用api向后端请求数据时使用。
const setAuthToken=(token)=>{
    if(token){
        //header 
        axios.defaults.headers.common["Authorization"]=token
    }else{
        delete axios.defaults.headers.common["Authorization"]
    }
}

export default setAuthToken;