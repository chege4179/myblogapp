import React, {useEffect, useState} from 'react';

import {useSelector} from "react-redux";
import {SelectUser} from "../../ReduxStore/UserReducer";
import {useRouter} from "next/router";
import BaseURL from "../../util/BaseURL";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Image from "next/image";
import FeedArticle from "../FeedArticle";


const RightPostPage = ({ user,post,posts }) => {
    const [totalposts,setTotalPosts] = useState(posts.length)
    const [followers, setFollowers] = useState(user.followers.length);
    const [following, setFollowing] = useState(user.following.length);
    const [IsFollowed,setIsFollowed] = useState(false)

    const LoggedInUser = useSelector(SelectUser)
    const router = useRouter()
    const GoToNextPostScreen = (id) => {
        router.push(`/post/${id}`)
    }
    useEffect(() => {
        const existingFollowerIndex = user.followers.findIndex((follow) => follow.id === LoggedInUser?._id)
        console.log('Existing Follower Index',existingFollowerIndex)
        if (existingFollowerIndex === -1){
            setIsFollowed(false)
        }else {
            setIsFollowed(true)
        }
    }, [LoggedInUser?._id,user.followers]);

    const AddFollower = async () => {
        const reqbody = {
            follower:{
                id:LoggedInUser._id,
                name:LoggedInUser.name,
                email:LoggedInUser.email

            },
            followed:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        }
        try {
            const response = await fetch(`${BaseURL}/follower/add`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(reqbody)
            })
            const res = await response.json()
            if (res.success){
                toast.success(res.msg)
                setFollowers(followers + 1)
            }else {
                toast.error(res.msg)
            }
        }catch (e){
            console.log(e)
            toast.error('Server error')
        }

    }
    const RemoveFollower =() => {

    }
    function FollowUnFollowButtons(){
        if (LoggedInUser === null){
            return (
                <div>

                </div>
            )
        }else {
            if (LoggedInUser.email !== user.email){
                if (IsFollowed){
                    return (
                        <button
                            onClick={RemoveFollower}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Following
                        </button>
                    )
                }else {
                    return (
                        <button
                            onClick={AddFollower}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Follow
                        </button>
                    )
                }

            }else {
                return (
                    <div>

                    </div>
                )
            }
        }
    }

    return (
        <div className='w-4/12 py-4 sm:hidden md:w-full md:h-full'>
            <ToastContainer autoClose={1000}/>
            <div className='w-full h-full  p-2 md:flex md:flex-col md:items-center'>
                <div className='md:w-8/12  bg-white rounded-xl border-gray-300 border-solid border-2'>
                    <div className='flex items-center p-2'>
                        <div>
                            <Image width={48} height={48} src={user.imageUrl} alt={user.name} className='h-12 w-12 rounded-3xl'/>
                        </div>
                        <div className='p-1'>
                            <h3>{user.name}</h3>
                            <h3>{user.email}</h3>
                        </div>
                    </div>
                    <div className='flex justify-evenly'>
                        <div>
                            <p className='text-center font-bold'>{totalposts}</p>
                            <p>Posts</p>
                        </div>
                        <div>
                            <p className='text-center font-bold'>{followers}</p>
                            <p>Followers</p>
                        </div>
                        <div>
                            <p className='text-center font-bold'>{following}</p>
                            <p>Following</p>
                        </div>
                    </div>
                    <div className='w-full px-2 mt-2'>
                        {FollowUnFollowButtons()}
                    </div>

                    <div className='p-2'>
                        <p className='capitalize font-bold'>Joined</p>
                        <h3>{user.dateJoined}</h3>
                    </div>
                </div>
                <div className='w-full  bg-white rounded-xl mt-2 p-2 md:mx-3'>
                    <h2 className='text-2xl font-bold'>More from <span className='text-indigo-500'>{user.name}</span></h2>
                    <div className='my-2 md:mx-2'>
                        {
                            posts.filter((posty) => posty.title !== post.title).map((post,index) => {
                                return(

                                    <FeedArticle key={index} post={post}/>
                                )
                            })
                        }

                    </div>

                </div>
                <div className='w-full h-4'>

                </div>
            </div>
        </div>
    );
};

export default RightPostPage;
