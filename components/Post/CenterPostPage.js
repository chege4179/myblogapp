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



const CenterPostPage = ({ post,user }) => {
    const LoggedInUser = useSelector(SelectUser)
    const [commentBody,setCommentBody] = useState('')
    const router = useRouter()

    useEffect(() => {
        const postbody = document.getElementById(`postbody-${post._id}`)
        postbody.innerHTML = post.body
    }, [post._id,post.body]);


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
        <div className='w-7/12 px-1 sm:w-full sm:px-3 md:w-11/12 md:mx-3 md:px-2'>
            <ToastContainer autoClose={1500}/>
            <div className="rounded-sm overflow-hidden shadow-lg w-full my-4 bg-white mb-4" >
                <Image className="w-full h-64"width={740} height={300} src={post.imageUrl} alt="Sunset in the mountains"/>
                <div className="px-6 pt-4 pb-2 flex justify-between sm:px-1">
                    <div className='flex items-center px-4 w-full h-20 sm:px-0'>
                        <Image width={48} height={48} src={user.imageUrl} className='w-12 h-12 rounded-3xl mx-4' alt={post.title}/>
                        <div >
                            <h1>Article By : <span className='text-lg font-bold'>{post.author}</span></h1>
                            <h1>Posted on <span className='font-bold'>{post.createdOn}</span> at <span className='font-bold'>{post.createdAt}</span> </h1>
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
