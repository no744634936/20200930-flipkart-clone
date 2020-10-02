/**
 * @description 校验 json schema
 * @author zhanghaifeng 
 */


var Ajv = require('ajv');
var ajv = new Ajv({allErrors: true, jsonPointers: true});
require('ajv-errors')(ajv /*, {singleError: true} */);


/**
 * @param {object} schema json schema的规则
 * @param {object} schema data 等待校验的数据
 */
validate_data=(schema,data={})=>{
   let valid=ajv.compile(schema)

   //如果验证没有通过,就返回一个错误，如果通过了就不需要返回认识的东西
   if(!valid(data)){
       return valid.errors   //返回所有错误
   }
}

module.exports=validate_data