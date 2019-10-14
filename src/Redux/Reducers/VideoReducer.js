import types from "../Types";
const initialState = {
    videos:[]
}
export default function mediaReducer (state = initialState, action) {

    switch(action.type){
        case types.getVideo:
            return {...state, videos:action.payload};  
        default:
            return state;    
    }
}