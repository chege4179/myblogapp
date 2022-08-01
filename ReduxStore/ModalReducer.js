import {UserActions} from "./UserConstants";

const UserReducer = (state = {
	modal: false,
	deleteModal: false,
	openMainReplyCommentBox: false,
	openSideReplyCommentBox: false,
	selectOpenMainCommentBoxID:""
     }, action) => {

	switch (action.type) {
		case UserActions.OPEN_MODAL:
			return {
				modal: true,
				deleteModal: false,
				openReplyCommentBox: false,
			}

		case UserActions.CLOSE_MODAL:
			return {
				modal: false,
				deleteModal: false,
				openReplyCommentBox: false,
			}
		case UserActions.OPEN_DELETE_MODAL:
			return {
				modal: false,
				deleteModal: true,
				openReplyCommentBox: false,
			}

		case UserActions.CLOSE_DELETE_MODAL:
			return {
				modal: false,
				deleteModal: false,
				openReplyCommentBox: false,
			}

		case UserActions.OPEN_REPLY_MAIN_COMMENT_BOX:
			return {
				...state,
				openMainReplyCommentBox: true,
			}
		case UserActions.CLOSE_REPLY_MAIN_COMMENT_BOX:
			return {
				...state,
				openMainReplyCommentBox: false
			}


		case UserActions.OPEN_REPLY_SIDE_COMMENT_BOX:
			return {
				...state,
				openSideReplyCommentBox: true,
			}
		case UserActions.CLOSE_REPLY_SIDE_COMMENT_BOX:
			return {
				...state,
				openSideReplyCommentBox: false
			}
		case UserActions.SELECT_OPEN_MAIN_COMMENT_BOX_ID:
			return {
				...state,
				selectOpenMainCommentBoxID:action.payload,

			}
		case UserActions.SELECT_CLOSE_MAIN_COMMENT_BOX_ID:
			return {
				...state,
				selectOpenMainCommentBoxID:"",

			}
		default:
			return state
	}

}
export const SelectModal = state => state.modal.modal
export const SelectDeleteModal = state => state.modal.deleteModal
export const SeleteShowMainCommentReplyBox = state => state.modal.openMainReplyCommentBox
export const SeleteShowSideCommentReplyBox = state => state.modal.openSideReplyCommentBox
export const SelectShowMainCommentReplyBoxID = state => state.modal.selectOpenMainCommentBoxID
export default UserReducer;
