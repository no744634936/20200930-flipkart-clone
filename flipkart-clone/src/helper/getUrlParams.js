
//从网页的url里获取参数
const getUrlParams=(query)=>{
    
    if(query){
        //?cid=cbajjdfgdj12g&type=page
        let queryString=query.split("?")[1]
        if(queryString.length>0){
            let params=queryString.split("&")
            let paramsObj={}
            params.forEach(param=>{
                let key_value=param.split("=")
                paramsObj[key_value[0]]=key_value[1]

            })
            return paramsObj
        }
    }
   return{}
}

export default getUrlParams