import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {SelectUser} from "../../ReduxStore/UserReducer";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import BaseURL from "../../util/BaseURL";
import CommentBox from "../Comment/CommentBox";
import { useRouter } from "next/router";
import {refreshData} from "../../util/HelperFunctions";
import Image from "next/image";
import {GrView} from "react-icons/gr";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import {BsFillBookmarkFill, BsThreeDots} from "react-icons/bs";



const CenterPostPage = ({ post,user }) => {
    const LoggedInUser = useSelector(SelectUser)
    const [commentBody,setCommentBody] = useState('')
    const router = useRouter()
    const [isLiked,setIsLiked] = useState(false)
    const [likesCount,setLikesCount] = useState(post.likes.length)
    const [viewsCount,setViewsCount] = useState(post.views.length)

    useEffect(() => {
        const postbody = document.getElementById(`postbody-${post._id}`)
        postbody.innerHTML = post.body
    }, [post._id,post.body]);
    const LikePost = async () => {
        if (user === null){
            toast.error('Login or create an account to like this post')
        }else {
            try {
                const reqbody = { id:user._id,name:user.name,email:user.email,postId:post._id }
                const LikeResponse = await fetch(`${BaseURL}/like/add`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(reqbody)
                })
                const LikeRes = await  LikeResponse.json()
                if (LikeRes.success){
                    toast.success(LikeRes.msg)
                    setLikesCount(likesCount + 1)
                    setIsLiked(!isLiked)
                }else {
                    toast.error(LikeRes.msg)
                }
            }catch (e) {
                console.log(e)
                toast.error('The post could not be liked at the moment please try again later')

            }
        }
    }
    const UnlikePost = async () => {
        if (user === null){
            toast.error('Login or create an account to like this post')
        }else {
            setIsLiked(!isLiked)
            try {
                const reqbody = { id:user._id,name:user.name,email:user.email,postId:post._id }
                const LikeResponse = await fetch(`${BaseURL}/like/remove`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(reqbody)
                })
                const LikeRes = await  LikeResponse.json()
                if (LikeRes.success){
                    toast.success(LikeRes.msg)
                    setLikesCount(likesCount - 1)
                    setIsLiked(!isLiked)
                }else {
                    toast.error(LikeRes.msg)
                }
            }catch (e) {
                console.log(e)
                toast.error('The post could not be unliked at the moment please try again later')

            }
        }
    }
    useEffect(() => {
        setTimeout(async () => {
            if (user !== null){
                const reqbody = { id:user._id,name:user.name,email:user.email,postId:post._id }
                const ViewResponse = await fetch(`${BaseURL}/view/add`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(reqbody)
                })
                const res = await ViewResponse.json()
                console.log('View Response :',res)
                if (res.success){
                    setViewsCount(viewsCount + 1)
                }
            }else {

            }

        },5000)
    },[post._id,user,viewsCount])


    const AddComment = async () => {
        if (user ==null){
            toast.error('Log in to post a comment')
        }else {
            try {
                const reqbody = {
                    postId:post._id,
                    body:commentBody,
                    userId:LoggedInUser._id,
                    name:LoggedInUser.name,
                    email:LoggedInUser.email,
                    imageUrl:LoggedInUser.imageUrl
                }
                const commentResponse = await fetch(`${BaseURL}/comment/add`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(reqbody)
                })
                const commentRes = await commentResponse.json()
                if (commentRes.success){
                    setCommentBody('')
                    toast.success(commentRes.msg)
                    refreshData(router)
                }else {
                    toast.error(commentRes.msg)
                }
            }catch (e) {
                console.log(e)
                toast.error('Server error ...please try again later')

            }
        }

    }


    return (
        <div className='w-8/12 px-1 sm:w-full sm:p-0 md:w-full md:p-0 lg:w-9/12'>
            <ToastContainer autoClose={1500}/>
            <div className="rounded-sm overflow-hidden shadow-lg w-full my-4 bg-white mb-4 sm:w-full sm:p-0" >
                <Image className="w-full h-64"width={853} height={400} src={post.imageUrl} alt="Sunset in the mountains"/>
                <div className="px-6 pt-4 pb-2 flex justify-between sm:px-1 sm:flex-col">
                    <div className='flex items-center px-4 w-full h-20 sm:px-0 '>
                        <Image width={48} height={48} src={user.imageUrl} className='w-12 h-12 rounded-3xl mx-4' alt={post.title}/>
                        <div >
                            <h1>Article By : <span className='text-lg font-bold'>{post.author}</span></h1>
                            <h1>Posted on <span className='font-bold'>{post.createdOn}</span> at <span className='font-bold'>{post.createdAt}</span> </h1>
                        </div>

                    </div>
                    <div className='flex items-center justify-center'>
                        <div className='p-4 flex justify-center '>
                            <GrView size={25}/>
                            <p className='whitespace-nowrap'>{viewsCount} Views</p>

                        </div>
                        <div className='p-4 flex justify-center '>
                            {isLiked ? <AiFillHeart size={25} onClick={UnlikePost}/> : <AiOutlineHeart size={30} onClick={LikePost}/>}
                            <p className='whitespace-nowrap'>{likesCount} likes</p>
                        </div>
                        <div className='p-4'>
                            <BsFillBookmarkFill size={25}/>
                        </div>
                        <div className='p-4'>
                            <BsThreeDots size={25}/>
                        </div>


                    </div>

                </div>
                <div className="px-6 py-4 sm:px-3">
                    <div className="font-bold text-xl mb-2">{post.title}</div>
                    <div className="text-gray-700 text-base" id={`postbody-${post._id}`}>
                    </div>
                </div>
                <div className='flex w-full items-center justify-center px-6'>
                    <hr className='w-full h-0.5 bg-black px-1'/>
                </div>
                <div className='px-6 py-4 w-full '>
                    <h2 className='font-bold text-2xl'>Comments ({post.comments.length + post.comments.map((comment) => comment.replies.length).reduce((a,b) => a + b,0) })</h2>
                </div>
                <div className='w-full px-6 py-4 sm:px-3'>
                    {
                        LoggedInUser !== null && (
                            <>
                                <div className='flex my-2'>
                                    <Image width={48} height={48}  src={LoggedInUser?.imageUrl} alt='image' className='w-12 h-12 rounded-2xl'/>
                                    <textarea
                                        value={commentBody}
                                        placeholder='Comment...'
                                        onChange={(e) => setCommentBody(e.target.value)}
                                        className='w-full h-20 p-2 rounded-lg border-solid border-gray-300 border-2 focus:outline-none'/>
                                </div>
                                {
                                    commentBody !== '' && (
                                        <button
                                            onClick={AddComment}
                                            className="group relative w-1/4 flex justify-center py-2 ml-12 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Post
                                        </button>
                                    )
                                }

                            </>

                        )
                    }
                    {
                        post.comments.map((comment,index) =>{
                            return(
                                <CommentBox key={index} post={post} user={user} comment={comment}/>
                            )
                        })
                    }
                </div>

            </div>

            <div className='w-full h-4'>


            </div>
        </div>
    );
};



export default CenterPostPage;
