import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {SelectUser} from "../ReduxStore/UserReducer";
import {UserActions} from "../ReduxStore/UserConstants";


const DropdownMenu = () => {
	const user = useSelector(SelectUser)
	const dispatch = useDispatch()
	const LogOut = () => {
		dispatch({
			type: UserActions.LOGOUT_SUCCESS
		})
		sessionStorage.removeItem('user')
	}
	return (
		<div className=" mt-2 mr-80 py-2 w-48 bg-white rounded-md shadow-xl z-20 ">
			<h2 className='block px-4 py-2 text-sm font-bold capitalize text-gray-700 hover:bg-blue-500 hover:text-white'>{user.name}</h2>
			<h2 className='block px-4 py-2 text-sm font-bold text-gray-700 hover:bg-blue-500 hover:text-white'>{user.email}</h2>
			<hr className='bg-black h-0.5'/>
			<a href="#"
			   className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white">
				My Profile
			</a>
			<a href="#"
			   className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white">
				Create Post
			</a>
			<a href="#"
			   className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white">
				Settings
			</a>
			<a href="#" onClick={LogOut}
			   className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white">
				Sign Out
			</a>
		</div>
	);
};

export default DropdownMenu;
