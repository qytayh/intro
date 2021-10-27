interface IResponse {
    code:number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?:any,
    msg:string,
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as axios from 'axios'

declare module 'axios' {
  interface AxiosInstance {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (config: AxiosRequestConfig): Promise<any>
  }
}