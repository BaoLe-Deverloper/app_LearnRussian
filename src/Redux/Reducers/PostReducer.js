import types from "../Types";
const initialState = {
    Posts:[]
}
export default function postReducer (state = initialState, action) {

    switch(action.type){
        case types.getPost:
            return {...state, Posts:action.payload};  
        default:
            return state;    
    }
}