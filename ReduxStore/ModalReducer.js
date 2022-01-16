import {UserActions} from "./UserConstants";

const UserReducer = (state = {modal:false,deleteModal:false},action) => {
    switch (action.type){
        case UserActions.OPEN_MODAL:
            return {
                modal:true,
                deleteModal: false
            }

        case UserActions.CLOSE_MODAL:
            return {
                modal:false,
                deleteModal: false
            }
        case UserActions.OPEN_DELETE_MODAL:
            return {
                modal:false,
                deleteModal: true
            }

        case UserActions.CLOSE_DELETE_MODAL:
            return {
                modal:false,
                deleteModal: false
            }

        default:
            return state
    }

}
export const SelectModal = state => state.modal.modal
export const SelectDeleteModal = state => state.modal.deleteModal
export default UserReducer;
