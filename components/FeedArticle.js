import React, {useEffect} from 'react';
import {useRouter} from "next/router";
import Image from "next/image";
import Link from "next/link"


const FeedArticle = ({post, width}) => {
	const router = useRouter()
	const GoPostScreen = () => {
		router.push(`/post/${post._id}`)
	}

	return (
		<div className="rounded overflow-hidden  w-full my-4 bg-white  hover:bg-gray-200 hover:drop-shadow-2xl"
			onClick={GoPostScreen}>
			<Image className="w-full h-64" width={600} height={300} src={post.imageUrl}
				  alt={post.title}/>
			<div className="px-6 py-4">
				<div className="font-bold text-xl mb-2">{post.title}</div>
				{/*<div className="text-gray-700 text-base" id={`postbody-${post._id}`}>*/}

				{/*</div>*/}
			</div>
			<div className="px-6 pt-4 pb-2 flex justify-between">
				<div>
					By :
						<Link passHref={true} href={`/user/${post.author}`}
						className="hover:underline hover:cursor-pointer">
							{post.author}
						</Link>

				</div>
				<div className='flex '>
					<button
						className="whitespace-nowrap group relative mx-1 flex justify-center p-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700  hover:underline">
						Save
					</button>
					<button
						onClick={GoPostScreen}
						className=" whitespace-nowrap group relative mx-1 flex justify-center p-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700  hover:underline">
						View
					</button>
				</div>
			</div>
		</div>
	);
};

export default FeedArticle;
