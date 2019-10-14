import {combineReducers} from "redux";
import UserReducer from './UserReducer';
import VideoReducer from './VideoReducer';
import PostReducer from "./PostReducer"
import TestReducer from "./TestReducer";
import SystemReducer from './SystemReducer'
import VocabularyReducer from "./vocabularyReducer"
export default combineReducers ({
    user : UserReducer,
    video:VideoReducer,
    post: PostReducer,
    test:TestReducer,
    system:SystemReducer,
    vocabulary: VocabularyReducer
})