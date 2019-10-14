import types from "./../Types";
import {userAuth} from "./../../auth/isAuthenticated";
const initialState = {
    currentUser:{},
    message:"",
    auth: false,
    students:[]

}
export default function userReducer (state = initialState, action) {

    switch(action.type){
        case types.login:
            userAuth.authenticate(action.payload.claim);
            return {...state, currentUser:action.payload,auth:true, message:""};

        case types.message:{
            return {...state, message: action.payload, auth:false};
        } 
        case types.logout:
            sessionStorage.removeItem("notifications");
            userAuth.signOut();
            return{...state, currentUser:null, auth:false};  
        case types.getStudents:
          return {...state, students: action.payload};
        default:
            return state;    
    }
}