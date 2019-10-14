import { config } from "./../../config";
import axios from "axios";
import types from "./../Types";



export const userLoginFetch = user => {
 
  return dispatch => {
    
    return axios(
    config.UrlServerBase + "user/login",
     {
     data: {email:user.email,password:user.password},
     method:"POST",
     headers:{
      'content-Type': 'application/json',
       Accept: 'application/json',
       "Access-Control-Allow-Origin": "*"
    }}).then(resp => {
      
      if (!resp.data.message) {
        localStorage.setItem("accessToken", resp.data.AccessToken);
        dispatch(loginUser(resp.data.user));
      } else {
        dispatch({ type: types.message, payload: resp.data.message });
      }

    });
  }
}
export const userSignupFetch = user => {
  return dispatch => {
    var user_obj = { name:user.username ,email:user.email,password:user.password, claim:user.claim, lever:user.lever, urlAvatar:user.urlAvatar}
    return axios.post(config.UrlServerBase + "user/signup", user_obj).then(resp => {
        dispatch({ type: types.message, payload: resp.data.message });
    });
  }
}

export const userLogOut = () => {

  return dispatch => {
    localStorage.removeItem("accessToken");
    dispatch({ type: types.logout });
  };
}

export const getProfileFetch = () => {
  return dispatch => {
    const token = localStorage.getItem("accessToken");
    if (token) {
    return  axios(config.UrlServerBase + "user", {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            'Authorization': "Bearer " + token
          
        }}).then(resp => {
          if(!resp.data.message)
             dispatch(loginUser( resp.data));
        })
    }
  }
}

// export const getManager = () => {
//   return dispatch => {
    
//   }
// }
const loginUser = user => ({
  type: types.login,
  payload: user
})



