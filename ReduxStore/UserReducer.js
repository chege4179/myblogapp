import {UserActions} from "./UserConstants";

const UserReducer = (state = {user:null},action) => {
    switch (action.type){
        case UserActions.LOGIN_REQUEST:
            return {
                loading:true,
                error:false,
                user:null,
            }

        case UserActions.LOGIN_SUCCESS:
            return {
                loading: false,
                error: false,
                user: action.payload
            }
        case UserActions.LOGIN_FAILED:
            return {
                loading: false,
                error: false,
                user: action.payload,
            }
        case UserActions.LOGOUT_REQUEST:
            return {
                loading: true,
                error: false,
                user: state.user,
            }
        case UserActions.LOGOUT_SUCCESS:
            return {
                loading: false,
                error: false,
                user: null,
            }
        case UserActions.LOGOUT_FAILED:
            return {
                loading: false,
                error: true,
                user: state.user
            }
        case UserActions.LOGIN_ERROR:
            return {
                loading: false,
                error: true,
                user:null,
            }
        default:
            return state
    }

}
export const SelectUser = state => state.user.user
export default UserReducer;
