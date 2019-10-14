import types from "../Types";
const initialState = {
    menuVisible:false
}
export default function systemReducer (state = initialState, action) {

    switch(action.type){
        case types.toggleMenu:
            
            return {...state, menuVisible:!state.menuVisible};  
        default:
            return state;    
    }
}