import {UserActions} from "./UserConstants";


const SearchActiveTabReducer = (state = {myposts: [], posts: [], users: []}, action) => {
	switch (action.type) {
		case UserActions.SEARCH_ALL_POSTS:
			return {
				myposts: [],
				posts: action.payload,
				users: []
			}
		case UserActions.SEARCH_MY_POSTS:
			return {
				myposts: action.payload,
				post: [],
				users: []
			}
		case UserActions.SEARCH_USERS:
			return {
				myposts: [],
				post: [],
				users: action.payload
			}
		default :
			return state


	}
}
export default SearchActiveTabReducer
