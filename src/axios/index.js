import axios from "axios";



// const service = axios.create({
//   // baseURL会自动加载接口地址上
//   baseURL: 'https://www.codeman.store/',
//   // baseURL: 'http://localhost:3000/',
//   // 指定请求超时的毫秒数，请求花费的时间超过timeout设置的时间，请求则会被中断
//   timeout: 1000 * 10,
//   // `withCredentials` 表示跨域请求时是否需要使用凭证
//   withCredentials: true,
//   headers: {
//     'Content-type': 'application/json;charset=utf-8'
//   }
// });
// service.defaults.withCredentials = true
//
//
//
// // 添加请求拦截器
// service.interceptors.request.use(function (config) {
//   // Do something before request is sent
//   return config;
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error);
// });
//
// // 添加响应拦截器
// service.interceptors.response.use(function (response) {
//   // Do something with response data
//   return response;
// }, function (error) {
//   // Do something with response error
//   return Promise.reject(error);
// });
//
// export default service


 export function service(url,params){

   const instance = axios.create({
     // baseURL:'http://localhost:3000/',
     baseURL: 'https://www.codeman.store/',
     timeout: 1000 * 6 ,
     withCredentials:true,
   })

   //axios 拦截器
   instance.interceptors.request.use(config=>{
     return config
   }),err=>{
     console.log(err)
   }

   instance.defaults.withCredentials = true

   if(params){
     params={
       params:params
     }
     return instance.get(url,params)
   }else {
     return instance.get(url)
   }
}
