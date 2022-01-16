import React, {useEffect} from 'react';
import {useRouter} from "next/router";
import Image from "next/image";
const FeedArticle = ({ post }) => {
    const router = useRouter()
    const GoPostScreen = () => {
        router.push(`/post/${post._id}`)
    }
    useEffect(() => {
        const postbody = document.getElementById(`postbody-${post._id}`)
        postbody.innerHTML = `${post.body.slice(0,500)} ......`
    }, [post._id,post.body]);

    return (
        <div className="rounded overflow-hidden shadow-lg w-full my-4 bg-white hover:bg-gray-200" onClick={GoPostScreen}>
            <Image className="w-full h-64" width={600} height={300}  src={post.imageUrl} alt="Sunset in the mountains"/>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{post.title}</div>
                <div className="text-gray-700 text-base" id={`postbody-${post._id}`}>

                </div>
            </div>
            <div className="px-6 pt-4 pb-2 flex justify-between">
                <div>
                    <h1>By : <span className='text-lg font-bold'>{post.author}</span></h1>
                </div>
                <div className='flex '>
                    <button
                        className="whitespace-nowrap group relative mx-1 flex justify-center p-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:underline">
                        Save
                    </button>
                    <button
                        onClick={GoPostScreen}
                        className=" whitespace-nowrap group relative mx-1 flex justify-center p-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:underline">
                        View
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeedArticle;
