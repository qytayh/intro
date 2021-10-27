// import { ActionContext } from "vuex";
import { IVuex } from "../index";
const jsonwebtoken = require('jsonwebtoken')

interface IUserInfo  {
  _id:string,
  username:string,
  role:number
}


interface IUserState{
    token:string,
    secret:string,
}

const user: IVuex = {
  state: {
    token: "",
    secret:"secret",
  },
  getters: {
    getToken: (state: IUserState) => state.token,
    getInfo:(state:IUserState):IUserInfo => {
      return jsonwebtoken.decode(state.token);
    },
  },
  mutations: {
    updateToken(state:IUserState,payload:string){
      state.token = payload
    },
  
  },
  actions: {
  },
};
export default {
  namespaced: true,
  ...user,
};
