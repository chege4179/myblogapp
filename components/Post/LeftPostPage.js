import React, {useEffect, useState} from 'react';
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import {BsFillBookmarkFill, BsThreeDots} from "react-icons/bs";
import BaseURL from "../../util/BaseURL";
import {useSelector} from "react-redux";
import {SelectUser} from "../../ReduxStore/UserReducer";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {GrView} from "react-icons/gr";

const LeftPostPage = ({likes, post, views}) => {
	const [isLiked, setIsLiked] = useState(false)
	const [likesCount, setLikesCount] = useState(likes.length)
	const [viewsCount, setViewsCount] = useState(views.length)
	const user = useSelector(SelectUser)
	const LikePost = async () => {
		if (user === null) {
			toast.error('Login or create an account to like this post')
		} else {
			try {
				const reqbody = {id: user._id, name: user.name, email: user.email, postId: post._id}
				const LikeResponse = await fetch(`${BaseURL}/like/add`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(reqbody)
				})
				const LikeRes = await LikeResponse.json()
				if (LikeRes.success) {
					toast.success(LikeRes.msg)
					setLikesCount(likesCount + 1)
					setIsLiked(!isLiked)
				} else {
					toast.error(LikeRes.msg)
				}
			} catch (e) {
				console.log(e)
				toast.error('The post could not be liked at the moment please try again later')

			}
		}
	}
	const UnlikePost = async () => {
		if (user === null) {
			toast.error('Login or create an account to like this post')
		} else {
			setIsLiked(!isLiked)
			try {
				const reqbody = {id: user._id, name: user.name, email: user.email, postId: post._id}
				const LikeResponse = await fetch(`${BaseURL}/like/remove`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(reqbody)
				})
				const LikeRes = await LikeResponse.json()
				if (LikeRes.success) {
					toast.success(LikeRes.msg)
					setLikesCount(likesCount - 1)
					setIsLiked(!isLiked)
				} else {
					toast.error(LikeRes.msg)
				}
			} catch (e) {
				console.log(e)
				toast.error('The post could not be unliked at the moment please try again later')

			}
		}
	}
	useEffect(() => {
		setTimeout(async () => {
			if (user !== null) {
				const reqbody = {id: user._id, name: user.name, email: user.email, postId: post._id}
				const ViewResponse = await fetch(`${BaseURL}/view/add`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(reqbody)
				})
				const res = await ViewResponse.json()
				console.log('View Response :', res)
				if (res.success) {
					setViewsCount(viewsCount + 1)
				}
			} else {

			}

		}, 5000)
	}, [post._id, user, viewsCount])
	return (
		<div className='w-1/12 h-full flex justify-center sm:hidden md:hidden'>
			<ToastContainer autoClose={1000}/>
			<div className='flex items-center flex-col justify-center'>
				<div className='p-4 flex justify-center flex-col'>
					<GrView size={30}/>
					{viewsCount} Views
				</div>
				<div className='p-4'>
					{isLiked ? <AiFillHeart size={30} onClick={UnlikePost}/> :
						<AiOutlineHeart size={30} onClick={LikePost}/>}
					{likesCount} likes
				</div>
				<div className='p-4'>
					<BsFillBookmarkFill size={30}/>
				</div>
				<div className='p-4'>
					<BsThreeDots size={30}/>
				</div>


			</div>

		</div>
	);
};

export default LeftPostPage;
