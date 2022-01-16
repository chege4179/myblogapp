import React, {useState} from 'react';
import {BsSearch} from "react-icons/bs";
import {useDispatch, useSelector} from "react-redux";
import {SelectUser} from "../ReduxStore/UserReducer";
import {useRouter} from "next/router";
import Link from 'next/link';
import DropdownMenu from "./DropdownMenu";
import Image from "next/image";

const Header = () => {

    const user = useSelector(SelectUser)
    const dispatch = useDispatch()
    const router = useRouter()
    const [showDropdown,setShowDropdown] = useState(false)
    const [searchTerm,setSearchTerm] = useState('')
    const GoToLoginPage =() => {
        router.push('/account/login')
    }
    const GoToSignUpPage =() => {
        router.push('/account/signup')
    }
    const GoToCreatePost =() => {
        router.push('/post/new')
    }
    const SearchPost =() => {
        router.push(`/post/search?query=${searchTerm}`)
    }
    const GoToSearchPost = () => {
        router.push(`/post/search?query=${searchTerm}`)
    }

    return (
        <div className='bg-white text-gray-200 shadow transition sticky top-0 z-20 border-b-2 border-gray-300 border-solid  w-full h-16 flex items-center justify-center px-4 '>
            <div className='max-w-screen-xl w-screen flex items-center justify-center'>
                <div className='flex w-4/5 sm:w-3/5'>
                    <Link href='/' passHref>
                        <h1 className='text-indigo-500 text-center font-bold text-2xl hover:cursor-pointer hover:text-blue-700'>Blogifyyrrrrr</h1>
                    </Link>
                    <div className={`${router.pathname ==='/post/new' && 'hidden'} bg-gray-100 p-1 border-2 border-solid border-gray-600 rounded-md w-1/2 mx-2 flex sm:hidden md:w-80`}>
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            type='text'
                            placeholder='Search......'
                            className='p-1 bg-gray-100 ml-6 h-8 w-4/5 flex-1 outline-none text-black  '
                        />
                        <div>
                            <button disabled={searchTerm === ''} className='p-2' onClick={SearchPost}>
                                <BsSearch color='black'/>
                            </button>
                        </div>
                    </div>
                    <div className='w-full flex justify-end hidden'>
                        <button disabled={searchTerm === ''} className='p-2 font-bold text-2xl' onClick={GoToSearchPost}>
                            <BsSearch color='black'/>
                        </button>
                    </div>
                </div>
                <div className='flex'>
                    {
                        user === null ? (

                            <>
                                <button
                                    onClick={GoToLoginPage}
                                    className="whitespace-nowrap relative mx-1 flex justify-center p-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:underline"
                                >
                                    Log In
                                </button>
                                <button
                                    onClick={GoToSignUpPage}
                                    className="whitespace-nowrap group relative mx-1 flex justify-center p-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:underline">
                                    Create Account
                                </button>
                            </>
                        ):(

                                <div className='flex '>
                                    <h1 className='text-black sm:hidden'>{user.name}</h1>
                                    <div className=''>
                                        <Image  src={user?.imageUrl} alt={user?.username} width={40} height={40} className='sm:w-8 sm:h-8   mx-1 rounded-2xl hover:cursor-pointer hover:border-black border-2 border-solid' onClick={() => setShowDropdown(!showDropdown)}/>
                                        { showDropdown && <DropdownMenu/> }
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
    );
};

export default Header;
