import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import dynamic from "next/dynamic";
import BaseURL from "../../util/BaseURL";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import moment from "moment";
import {useSelector} from "react-redux";
import {SelectUser} from "../../ReduxStore/UserReducer";
import Image from "next/image";
import {useRouter} from "next/router";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import {UploadPostImage} from "../../util/HelperFunctions";
import { convertToRaw, EditorState } from "draft-js"
import draftToHtml from 'draftjs-to-html';


const ReactEditor = dynamic(
	() => import("react-draft-wysiwyg").then((module) => module.Editor),
	{
		ssr: false
	}
)

const NewPostPage = () => {
	const router = useRouter()
	const [coverImage, setCoverImage] = useState('')
	const [title, setTitle] = useState('')
	const user = useSelector(SelectUser)
	const [editorState,setEditorState] = useState(EditorState.createEmpty())

	useEffect(async () => {
		if (!user) {
			await router.replace("/")
		}
	}, [user])

	const UploadCoverImage = () => {
		const CoverImage = document.createElement('input');
		CoverImage.setAttribute('type', 'file');
		CoverImage.setAttribute('accept', 'image/*');
		CoverImage.click();

		CoverImage.onchange = async () => {
			const file = CoverImage.files[0];
			const imageURL = await UploadPostImage(file)
			console.log(imageURL.data.link)
			setCoverImage(imageURL.data.link)
		}
	}

	const onEditorStateChange = (editorState) => {
		console.log(convertToRaw(editorState.getCurrentContent()))
		setEditorState(editorState);

	};

	const RemoveCoverImage = () => {
		setCoverImage('')
	}


	const PostArticle = async () => {
		if (coverImage === '' || title ==="") {
			toast.error('Please select a cover Image or title')
		} else {
			const rawContentState = convertToRaw(editorState.getCurrentContent());
			const  hashConfig = {
				trigger: '#',
				separator: ' ',
			}
			const config ={
				blockTypesMapping : {/* mappings */},
				emptyLineBeforeBlock : true
			}
			const markup = draftToHtml(rawContentState, hashConfig, true);
			const reqbody = {
				title,
				body: markup,
				createdAt: moment().format('LT'),
				createdOn: moment().format('L'),
				author: user.username,
				email: user.email,
				imageUrl: coverImage,

			}
			try {

				const response = await fetch(`${BaseURL}/post/add`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(reqbody)
				})
				const res = await response.json()
				if (res.success) {
					toast.success(res.msg)
					await router.push('/')
				} else {
					toast.error(res.msg)
				}
			} catch (e) {
				console.log(e)
				toast.error('Server error')
			}
		}
	}

	return (
		<Layout post={{title: 'Add New Post', description: "Blogify Create Post Page"}}>
			<div className='flex flex-grow justify-center w-full h-full'>
				<ToastContainer autoClose={1500}/>
				<div className='max-w-screen-xl w-full h-full'>
					<div className='w-full  flex justify-center items-center p-3 sm:flex-col'>
						<div className={` bg-gray-100 p-1 border-2 border-solid border-gray-600 rounded-md w-1/2 mx-2 flex sm:w-full `}>
							<input
								onChange={(e) => setTitle(e.target.value)}
								type='text'
								placeholder='Post Title'
								className='p-1 bg-gray-100 ml-6 h-8 w-4/5 flex-1 outline-none text-black '
							/>
						</div>
						{coverImage !== '' && (
							<div className='flex p-2'>
								<Image width={192} height={192} src={coverImage} alt='Cover Image'
									  className='border-2 border-solid border-gray-600 w-48 h-48 sm:w-36 sm:h-36'/>
								<button
									onClick={UploadCoverImage}
									className=" h-12 my-2 whitespace-nowrap relative mx-1 flex justify-center p-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:underline"
								>
									Change
								</button>
								<button
									onClick={RemoveCoverImage}
									className=" h-12 my-2 whitespace-nowrap relative mx-1 flex justify-center p-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:underline"
								>
									Remove
								</button>
							</div>

						)}
						{
							coverImage === '' && (
								<button
									onClick={UploadCoverImage}
									className="my-2 whitespace-nowrap relative mx-1 flex justify-center p-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:underline"
								>
									Upload Cover Image
								</button>
							)
						}

					</div>
					<div className='w-full h-full flex flex-col sm:px-2 sm:h-96'>
						<ReactEditor
							toolbar={{
								image: {
									className: undefined,
									component: undefined,
									popupClassName: undefined,
									urlEnabled: false,
									uploadEnabled: true,
									alignmentEnabled: true,
									uploadCallback:UploadPostImage,
									previewImage: true,
									inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
									alt: { present: false, mandatory: false },
									defaultSize: {
										height: 'auto',
										width: 'auto',
									},
								},
								link:{
									className: "text-xl text-indigo-blue"
								}
							}}
							editorState={editorState}
							onEditorStateChange={onEditorStateChange}
							toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto"
							editorClassName="mt-6 p-10 bg-white shadow-lg  mx-auto mb-12 border min-h-96"
						/>
						<div className='w-full flex justify-end pr-3 mt-12'>
							{
								(editorState !=="") && (
									<button
										onClick={PostArticle}
										className="my-2 whitespace-nowrap relative mx-1 flex justify-center p-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:underline"
									>
										Publish Post
									</button>
								)
							}

						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export async function getServerSideProps() {
	return {
		props: {}
	}
}

export default NewPostPage;
