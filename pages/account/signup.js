import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import {toast, ToastContainer} from "react-toastify";
import BaseURL from "../../util/BaseURL";
import 'react-toastify/dist/ReactToastify.css'
import moment from "moment";
import {useSelector} from "react-redux";
import {SelectUser} from "../../ReduxStore/UserReducer";
import {useRouter} from "next/router";

const SignUpPage = () => {
	const user = useSelector(SelectUser)
	const router = useRouter()
	const [email, setEmail] = useState('')
	const [fullname, setFullName] = useState('')
	const [username, setUsername] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')
	const [password, setPassword] = useState('')
	const [conpassword, setConPassword] = useState('')
	useEffect(() => {
		if (user) {
			router.push('/')
		}
	}, [router, user]);


	const SignUpUser = async (e) => {
		e.preventDefault()
		if (password !== conpassword) {
			toast.error('Passwords do not match ...Please try again')
		} else {
			const reqbody = { email, fullname, username, phoneNumber, password, dateJoined: moment().format('L')}
			try {
				const response = await fetch(`${BaseURL}/user/signup`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(reqbody)
				})
				const res = await response.json()
				if (res.success) {
					toast.success(res.msg)
				} else {
					toast.error(res.msg)
				}
			} catch (e) {
				toast.error('Server error')
			}
		}
	}
	return (
		<Layout post={{title: 'Login Page', description: "Blogify Login Page"}}>
			<div className='flex justify-center items-center grow w-full '>
				<div className='w-full h-full max-w-screen-xl flex items-center justify-center'>
					<div className='flex w-2/5 sm:w-full md:w-full'>
						<ToastContainer autoClose={1500}/>
						<div className="min-h-full w-full flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8 md:px-2">
							<div className="max-w-md w-full space-y-8">
								<div>
									<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign
										Up</h2>
								</div>
								<form className="mt-8 space-y-6" action="#" method="POST" onSubmit={SignUpUser}>
									<input type="hidden" name="remember" defaultValue="true"/>
									<div className="rounded-md shadow-sm -space-y-px">
										<div className='py-2'>
											<label htmlFor="Email Address"
												  className="text-xl font-bold text-gray-900 px-2">
												Email Address
											</label>
											<input
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												id="username"
												name="email"
												type="email"
												autoComplete="email"
												required
												className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
												placeholder="Email Address"
											/>
										</div>
										<div className='py-2'>
											<label htmlFor="Email Address"
												  className="text-xl font-bold text-gray-900 px-2">
												Full Name
											</label>
											<input
												value={fullname}
												onChange={(e) => setFullName(e.target.value)}
												id="username"
												name="full name"
												type="text"
												autoComplete="username"
												required
												className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
												placeholder="Username"
											/>
										</div>
										<div className='py-2'>
											<label htmlFor="Username"
												  className="text-xl font-bold text-gray-900 px-2">
												Username
											</label>
											<input
												value={username}
												onChange={(e) => setUsername(e.target.value)}
												id="username"
												name="email"
												type="text"
												autoComplete="username"
												required
												className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
												placeholder="Username"
											/>
										</div>
										<div className='py-2'>
											<label htmlFor="Username"
												  className="text-xl font-bold text-gray-900 px-2">
												Phone Number
											</label>
											<input
												value={phoneNumber}
												onChange={(e) => setPhoneNumber(e.target.value)}
												id="username"
												name="Phone Number"
												type="text"
												autoComplete="phone"
												required
												className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
												placeholder="Phone Number"
											/>
										</div>
										<div className='py-2'>
											<label htmlFor="password"
												  className="text-xl font-bold text-gray-900 px-2">
												Password
											</label>
											<input
												value={password}
												onChange={(e) => setPassword(e.target.value)}
												id="password"
												name="password"
												type="password"
												autoComplete="current-password"
												required
												className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
												placeholder="Password"
											/>
										</div>
										<div className='py-2'>
											<label htmlFor="password"
												  className="text-xl font-bold text-gray-900 px-2">
												Confirm Password
											</label>
											<input
												value={conpassword}
												onChange={(e) => setConPassword(e.target.value)}
												id="password"
												name="password"
												type="password"
												autoComplete="current-password"
												required
												className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
												placeholder="Password"
											/>
										</div>
									</div>
									<div>
										<button
											type="submit"
											className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
										>
											Sign Up
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default SignUpPage;
