import { IResponse } from "@/types/axios";
import request from "@/utils/axios";

const prefix = "/user"

export const loginForm = (data:{phone: string; password: string }):Promise<IResponse> => {
 return request({
    url: `${prefix}/login`,
    data,
    method: "POST",
  });
};
