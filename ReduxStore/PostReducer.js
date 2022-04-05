import {UserActions} from "./UserConstants";


const PostsReducer = (state = {posts: []}, action) => {
	switch (action.type) {
		case UserActions.FETCH_FEED_POSTS:
			return {
				posts: action.payload,
			}

		default:
			return state
	}


}
export const SelectPosts = state => state.posts.posts
export default PostsReducer
