import React, {useState} from 'react';
import {BsSearch} from "react-icons/bs";
import {useDispatch, useSelector} from "react-redux";
import {SelectUser} from "../ReduxStore/UserReducer";
import {useRouter} from "next/router";
import Link from 'next/link';
import DropdownMenu from "./DropdownMenu";
import Image from "next/image";
import {generateAvatarURL} from "../util/HelperFunctions";
import {Popover} from '@mantine/core';
import {UserActions} from "../ReduxStore/UserConstants";

const Header = () => {
	const user = useSelector(SelectUser)
	const dispatch = useDispatch()
	const router = useRouter()
	const [showDropdown, setShowDropdown] = useState(false)
	const [searchTerm, setSearchTerm] = useState(router.query.query)
	const GoToLoginPage = () => {
		router.push('/account/login')
	}
	const GoToSignUpPage = () => {
		router.push('/account/signup')
	}
	const GoToCreatePost = () => {
		router.push('/post/new')
	}
	const SearchPost = () => {
		router.push(`/post/search?query=${searchTerm}`)
	}
	const GoToSearchPost = () => {
		router.push(`/post/search?query=${searchTerm}`)
	}
	const LogOut = () => {
		dispatch({
			type: UserActions.LOGOUT_SUCCESS
		})
		sessionStorage.removeItem('user')
	}

	return (
		<div className='bg-white text-gray-200 shadow transition border-b-2 border-gray-300 border-solid  w-full h-16 sm:h-32 flex items-center justify-center px-4 fixed z-10'>
			<div className='max-w-screen-xl w-screen flex sm:flex-col-reverse sm:w-full sm:h-full sm:justify-evenly items-center justify-center'>
				<div className='flex w-4/5 sm:w-full sm:h-16 sm:h-full sm:flex sm: items-center'>
					<Link href='/' passHref className="sm:hidden">
						<h1 className='text-indigo-500 text-center font-extrabold sm:hidden text-3xl hover:cursor-pointer hover:text-blue-700'>Blogify</h1>
					</Link>
					<div className={`${router.pathname === '/post/new' && 'hidden'} bg-gray-100 p-1 border-2 border-solid border-gray-600 rounded-md w-1/2 mx-2 flex sm:h-3/4 sm:items-center sm:justify-center  md:w-80`}>
						<input
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							type='text'
							placeholder='Search......'
							className='p-1 bg-gray-100 ml-2 h-8 w-4/5 flex-1 outline-none text-black  '
						/>
						<div className='hover:bg-gray-300 rounded'>
							<button disabled={searchTerm === ''} className='p-2' onClick={SearchPost}>
								<BsSearch color='black'/>
							</button>
						</div>
					</div>
					<div className='w-full flex justify-end hidden '>
						<button disabled={searchTerm === ''} className='p-2 font-bold text-2xl'
							   onClick={GoToSearchPost}>
							<BsSearch color='black'/>
						</button>
					</div>
				</div>
				<div className='flex sm:1/2  sm:w-full justify-end sm:justify-evenly'>
					<div className="w-1/2 flex justify-start xl:hidden">
						<Link href='/' passHref>
							<h1 className='text-indigo-500 text-center font-bold  text-2xl hover:cursor-pointer hover:text-blue-700'>Blogify</h1>
						</Link>
					</div>
					<div className="flex">
						{
							user === null ? (

								<>
									<button
										onClick={GoToLoginPage}
										className="btn-primary"
									>
										Log In
									</button>
									<button
										onClick={GoToSignUpPage}
										className="btn-primary">
										Create Account
									</button>
								</>
							) : (

								<div className='flex '>
									<h1 className='text-black sm:hidden pt-2 pr-2'>{user.name}</h1>
									<div className=''>
										<Image
											src={user.imageUrl} alt={user?.username} width={40}
											height={40}
											className='sm:w-8 sm:h-8   mx-1 rounded-2xl hover:cursor-pointer hover:border-black border-2 border-solid'
											onClick={() => setShowDropdown(!showDropdown)}/>
										<Popover
											opened={showDropdown}
											onClose={() => setShowDropdown(!showDropdown)}
											width={210}
											position="bottom">
											<h2 className='block px-2 py-2 text-sm font-bold capitalize text-gray-700 hover:bg-blue-500 hover:text-white'>{user.name}</h2>
											<h2 className='block px-2 py-2 text-sm font-bold text-gray-700 hover:bg-blue-500 hover:text-white'>{user.email}</h2>
											<hr className='bg-black h-0.5'/>

											<Link href={`/profile/${user.username}`}>
												<h1
													className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white">
													My Profile
												</h1>
											</Link>
											<Link href={"/post/new"}>
												<h1
													className="block px-2 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white">
													Create Post
												</h1>
											</Link>
											<Link href="/account/settings">
												<h1
												   className="block px-2 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white">
													Settings
												</h1>
											</Link>

											<h1 onClick={LogOut}
											    className="block px-2 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white">
												Sign Out
											</h1>
										</Popover>
									</div>
									<button
										onClick={GoToCreatePost}
										className="whitespace-nowrap group relative mx-1 flex justify-center p-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:underline">
										Create Post
									</button>

								</div>
							)
						}
					</div>

				</div>
			</div>
		</div>
	);
};

export default Header;
