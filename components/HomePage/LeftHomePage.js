import React from 'react';
import Link from 'next/link';
import {useSelector} from "react-redux";
import {SelectUser} from "../../ReduxStore/UserReducer";
import ListItem from "../ListItem";

const LeftHomePage = () => {
	const user = useSelector(SelectUser)
	const UserLoggedInMenu = [
		{
			name: 'My Profile',
			route: '/profile',
		},
		{
			name: 'Saved Posts',
			route: '/saved',
		},
		{
			name: 'Trending Topics',
			route: '/trending',
		},


	]
	const UserLoggedOutMenu = [
		{
			name: 'Trending Topics',
			route: '/trending',
		},
	]
	return (
		<div className='mt-4 w-1/5 flex sm:w-full md:w-full '>
			{
				user === null ? (
					<ul className='flex w-full flex-col sm:flex-row md:flex-row'>
						{
							UserLoggedOutMenu.map((menuItem, index) => {
								return (<ListItem key={index} menuItem={menuItem}/>)
							})
						}
					</ul>
				) : (
					<ul className='flex w-full flex-col sm:flex-row md:flex-row'>
						{
							UserLoggedInMenu.map((menuItem, index) => {
								return (<ListItem key={index} menuItem={menuItem}/>)
							})
						}
					</ul>
				)
			}

		</div>
	);
};


export default LeftHomePage;
