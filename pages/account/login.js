import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import BaseURL from "../../util/BaseURL";
import {useDispatch, useSelector} from "react-redux";
import {UserActions} from "../../ReduxStore/UserConstants";
import {useRouter} from "next/router";
import {SelectUser} from "../../ReduxStore/UserReducer";

const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const dispatch = useDispatch()
    const router = useRouter()
    const user = useSelector(SelectUser)
    useEffect(() => {
        if (user !== null){
            router.replace('/')
        }
    }, [router,user]);


    const LoginUser = async (e) => {
        e.preventDefault()
        const reqbody = { email,password }
        try {
            const response = await fetch(`${BaseURL}/user/login`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(reqbody)
            })
            const res = await response.json()
            if (res.success){
                toast.success(res.msg)
                dispatch({
                    type:UserActions.LOGIN_SUCCESS,
                    payload:res.user
                })
                sessionStorage.setItem('user',JSON.stringify(res.user))
                router.push('/')
            }else {
                toast.error(res.msg)
            }
        }catch (e) {
            console.log(e)
            toast.error('Server error ocurred',)

        }


    }
    return (
        <Layout title='Login Page'>
            <div className='flex justify-center items-center w-full h-full'>
                <div className='w-full h-full max-w-screen-xl flex items-center justify-center'>
                    <div className='flex w-2/5 sm:w-full md:w-full'>

                        <ToastContainer autoClose={1500}/>
                        <div className="min-h-full w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                            <div className="max-w-md w-full space-y-8">
                                <div>
                                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log in</h2>
                                </div>
                                <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={LoginUser}>
                                    <input type="hidden" name="remember" defaultValue="true" />
                                    <div className="rounded-md shadow-sm -space-y-px">
                                        <div className='py-2'>
                                            <label htmlFor="Username" className="text-xl font-bold text-gray-900 px-2">
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
                                            <label htmlFor="password" className="text-xl font-bold text-gray-900 px-2">
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
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <input
                                                id="remember-me"
                                                name="remember-me"
                                                type="checkbox"
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                            />
                                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                                Remember me
                                            </label>
                                        </div>

                                        <div className="text-sm">
                                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                Forgot your password?
                                            </a>
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Sign in
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

export default Login;