import types from "../Types";

const initialState = {
    questions: [],
    text: '',
    status: false,
    result: false,
    id: "",
    test: null,
    response:null,
    update_status:false
}
export default function testReducer(state = initialState, action) {

    switch (action.type) {
        case types.addTest:
            return { ...state, result: action.payload.result, id: action.payload.id }
        case types.updateTest:
            return { ...state, update_status: action.payload.result }
        case types.getTest:
            return { ...state, test: action.payload }
        case types.checkTest:
            return {...state,response:action.payload } 
        case types.resetTest:
            return { ...state, update_status: false, response: null, result: false, test: null, questions: [], status: false, id: "", text:'' }    
        default:
            return state;
    }
}