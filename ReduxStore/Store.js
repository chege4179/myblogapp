
import {createStore, applyMiddleware, combineReducers} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import UserReducer from "./UserReducer";
import modalReducer from "./ModalReducer";
import PostsReducer from "./PostReducer";

const middleware = [thunk];

const AppReducer = combineReducers({
    user:UserReducer,
    modal:modalReducer,
    posts:PostsReducer

})
const store = createStore(AppReducer,composeWithDevTools(applyMiddleware(...middleware)));
export default store;
