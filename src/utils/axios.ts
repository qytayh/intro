import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {ElMessage} from "element-plus"
import store from "../store";
import router from "../router";
import { IResponse } from "@/types/axios";

const token = store.getters["user/getToken"];

const white_list = ["/user/login"]; // 请求白名单


const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 20000, // request timeout
});

// 请求拦截
request.interceptors.request.use((config: AxiosRequestConfig) => {
  const url: string | undefined = config.url;
  if (url && !white_list.includes(url)) {
    // 不在白名单  
    if (!token) {
      // 没有token 就回到登录页
      const redirectTo = router.currentRoute.value.fullPath;
      router.push(`/login?redirectTo=${redirectTo}`);
    }
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

// 响应拦截
// eslint-disable-next-line @typescript-eslint/no-explicit-any
request.interceptors.response.use((response:any)=>{
  const res:IResponse = response.data
    if(res.code===401){
      // token过期拦截
      ElMessage.warning(res.msg)
      const redirectTo = router.currentRoute.value.fullPath;
      router.push(`/login?redirectTo=${redirectTo}`);
      return Promise.reject(res)
    }
    return Promise.resolve(res)
},
)

export default request;
