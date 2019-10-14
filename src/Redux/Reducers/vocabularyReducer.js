import types from "../Types";
const initialState = {
  vocabularies:[],
  name:"",
  topics:[]
}
export default function vocabularyReducer(state = initialState, action) {

  switch (action.type) {
    case types.getVocabulary:
      return { ...state, vocabularies: action.payload.data,name:action.payload.name };
    case types.resetVocabulary:
      return { ...state, vocabularies: [],name:"" };
    case types.getTopics:
      return { ...state, topics:action.payload };
    default:
      return state;
  }
}