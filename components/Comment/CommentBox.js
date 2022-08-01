import React, {useState} from 'react';
import {BiCommentDetail} from "react-icons/bi";
import {useDispatch, useSelector} from "react-redux";
import {SelectUser} from "../../ReduxStore/UserReducer";
import BaseURL from "../../util/BaseURL";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Image from "next/image";
import {generateAvatarURL, refreshData} from "../../util/HelperFunctions";
import {
	SelectShowMainCommentReplyBox,
	SelectShowMainCommentReplyBoxID,
	SeleteShowMainCommentReplyBox,
	SeleteShowSideCommentReplyBox
} from "../../ReduxStore/ModalReducer";
import {UserActions} from "../../ReduxStore/UserConstants";


const CommentBox = ({ comment, user, post }) => {

	const showReplyCommentBox = useSelector(SeleteShowMainCommentReplyBox)
	const LoggedInUser = useSelector(SelectUser)
	const dispatch = useDispatch()
	const [MainCommentReply, setMainCommentReply] = useState('')


	const OpenMainCommentReplyBox = (id) => {
		dispatch({
			type:UserActions.CLOSE_REPLY_MAIN_COMMENT_BOX
		})
		dispatch({
			type:UserActions.SELECT_CLOSE_MAIN_COMMENT_BOX_ID,
		})
		dispatch({
			type:UserActions.SELECT_OPEN_MAIN_COMMENT_BOX_ID,
			payload:id
		})

		// if (showReplyCommentBox){
		//
		// }else {
		//
		// }

	}
	const PublishCommentReply = async () => {
		try {
			const reqbody = {
				body: MainCommentReply,
				userId: LoggedInUser._id,
				name: LoggedInUser.name,
				email: LoggedInUser.email,
				commentId: comment.commentId,
				postId: post._id,
				imageUrl: LoggedInUser.imageUrl
			}
			const CommentResponse = await fetch(`${BaseURL}/comment/reply`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(reqbody)
			})
			const commentRes = await CommentResponse.json()
			if (commentRes.success) {
				toast.success(commentRes.msg)
				refreshData()
			} else {
				toast.error(commentRes.msg)
			}
		} catch (e) {
			console.log(e)
			toast.error('Server error')
		}

	}
	return (
		<div className='flex flex-col my-2'>
			<ToastContainer autoClose={1500}/>
			<div className='flex flex-col my-2'>
				<div className='flex'>
					<Image width={48} height={48} src={comment.imageUrl} alt='image'
						  className='w-12 h-12 rounded-2xl'/>
					<div className='w-full ml-2'>
						<p className='text-sm font-bold '>{comment.name}</p>
						<p className='w-full  p-2 rounded-lg border-solid border-gray-300 border-2'>{comment.body}</p>
					</div>
				</div>
				{
					LoggedInUser !== null && (
						<div className='flex ml-12 '>
							{
								!showReplyCommentBox && (
									<div className='flex justify-center items-center mt-0.5 p-2 hover:cursor-pointer hover:bg-gray-300 hover:rounded'
										onClick={() => OpenMainCommentReplyBox(comment.commentId)}
									>
										<BiCommentDetail size={17}/>
										<p className='px-2'>Reply</p>
									</div>
								)
							}
							{
								showReplyCommentBox && (
									<div className='flex flex-col w-full justify-center mx-2 mt-2'>
										<textarea
											  value={MainCommentReply}
											  onChange={(e) => setMainCommentReply(e.target.value)}
											  placeholder='Comment...'
											  className='w-full h-20 p-2 rounded-lg border-solid border-gray-300 border-2 focus:outline-none'/>
													<div className='flex w-full justify-start py-2'>
														<button
															className="group relative w-1/4 flex justify-center py-2 mr-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
															onClick={PublishCommentReply}
														>Post
														</button>
														<button
															className="group relative w-1/4 flex justify-center py-2 mr-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"

															onClick={OpenMainCommentReplyBox}>Close
														</button>
													</div>
									</div>
								)
							}

						</div>
					)
				}

			</div>

			<div className='ml-12'>
				{
					comment.replies.map((comment, index) => {
						return (
							<ReplyMainCommentBox key={index} comment={comment} post={post}/>
						)
					})
				}
			</div>

		</div>
	);
};
const ReplyMainCommentBox = ({comment, post}) => {
	const showReplyBox = useSelector(SeleteShowSideCommentReplyBox)

	const activeReplyMainCommentId = useSelector(SelectShowMainCommentReplyBoxID)
	console.log("Active comment id",activeReplyMainCommentId)
	const LoggedInUser = useSelector(SelectUser)
	const dispatch = useDispatch()
	const OpenCommentReplyBox = () => {

		if (comment.commentId === activeReplyMainCommentId){
			dispatch({
				type:UserActions.OPEN_REPLY_MAIN_COMMENT_BOX
			})
		}
		if (showReplyBox){
			dispatch({
				type:UserActions.CLOSE_REPLY_SIDE_COMMENT_BOX
			})
		}else {
			dispatch({
				type:UserActions.OPEN_REPLY_SIDE_COMMENT_BOX
			})
		}
	}
	return (
		<>
			<div className='flex'>
				<Image width={48} height={48} src={generateAvatarURL(comment.name)} alt='image' className='w-12 h-12 rounded-2xl'/>
				<div className='w-full ml-2'>
					<p className='text-sm font-bold '>{comment.name}</p>
					<p className='w-full  p-2 rounded-lg border-solid border-gray-300 border-2'>{comment.body}</p>
				</div>

			</div>
			{
				LoggedInUser !== null && (
					<div className='flex  ml-12 hover:cursor-pointer '>
						{!showReplyBox && (
							<div className='flex justify-center items-center mt-0.5 p-2 hover:cursor-pointer hover:bg-gray-300 hover:rounded'
								onClick={OpenCommentReplyBox}>
								<BiCommentDetail size={17}/>
								<p className='px-2'>Reply</p>
							</div>
						)}
						{showReplyBox && (<ReplyMainCommentBox/>)}
					</div>
				)
			}

		</>


	)
}
// const ReplySideCommentBox = ({  }) => {
// 	const [replyComment, setReplyComment] = useState('')
// 	const LoggedInUser = useSelector(SelectUser)
// 	const showSideReplyBox = useSelector(SeleteShowSideCommentReplyBox)
// 	const dispatch = useDispatch()
// 	const OpenCommentReplyBox = () => {
// 		if (showSideReplyBox){
// 			dispatch({
// 				type:UserActions.CLOSE_REPLY_SIDE_COMMENT_BOX
// 			})
// 		}else {
// 			dispatch({
// 				type:UserActions.OPEN_REPLY_SIDE_COMMENT_BOX
// 			})
// 		}
// 	}
//
// 	const PublishComment = async () => {
// 		try {
// 			const reqbody = {
// 				body: replyComment,
// 				userId: LoggedInUser._id,
// 				name: LoggedInUser.name,
// 				email: LoggedInUser.email,
// 				commentId: comment.commentId,
// 				postId: post._id,
// 				imageUrl: LoggedInUser.imageUrl
// 			}
// 			const CommentResponse = await fetch(`${BaseURL}/comment/reply`, {
// 				method: 'POST',
// 				headers: {
// 					'Content-Type': 'application/json'
// 				},
// 				body: JSON.stringify(reqbody)
// 			})
// 			const commentRes = await CommentResponse.json()
// 			if (commentRes.success) {
// 				toast.success(commentRes.msg)
//
//
// 			} else {
// 				toast.error(commentRes.msg)
// 			}
// 		} catch (e) {
// 			console.log(e)
// 			toast.error('Server error')
// 		}
//
// 	}
// 	return (
// 		<div className='flex flex-col w-full justify-center'>
//            <textarea
// 			 value={replyComment}
// 			 onChange={(e) => setReplyComment(e.target.value)}
// 			 placeholder='Comment....'
// 			 className='w-full h-20 p-2 rounded-lg border-solid border-gray-300 border-2 focus:outline-none'/>
// 			<div className='flex w-full justify-start py-2'>
// 				<button
// 					className="group relative w-1/4 flex justify-center py-2 mr-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
// 					onClick={PublishComment}
// 				>Post
// 				</button>
// 				<button
// 					className="group relative w-1/4 flex justify-center py-2 mr-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//
// 					onClick={OpenCommentReplyBox}>Close
// 				</button>
// 			</div>
//
// 		</div>
// 	)
// }
//



export default CommentBox;
