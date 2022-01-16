import React, {useEffect} from 'react';
import {useRouter} from "next/router";
import Image from "next/image";



const TrendingArticle = ({ post }) => {
    const router = useRouter()
    useEffect(() => {
        const postbody = document.getElementById(`sidepost-${post.id}`)
        postbody.innerHTML = `${post.body.slice(0,50)} ........`
    },[post.body,post.id])
    const GoPostScreen =() => {
        router.push(`/post/${post._id}`)
    }
    return (
        <div className="max-w-sm rounded-xl overflow-hidden shadow-lg my-4 bg-white border-2 border-gray-300 border-solid ">
            <Image width={740} height={300}  className="w-full h-64" src={post.imageUrl} alt="Sunset in the mountains"/>
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{post.title}</div>
                    <div className="text-gray-700 text-base" id={`sidepost-${post.id}`}>

                    </div>
                </div>
                <div className="px-6 pt-4 pb-2 flex justify-between ">
                    <div>
                        <h1>By : <span>{post.author}</span></h1>
                    </div>
                    <button
                        onClick={GoPostScreen}
                        className="whitespace-nowrap group relative mx-1 flex justify-center p-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:underline">
                        View
                    </button>
                </div>
        </div>
    );
};

export default TrendingArticle;
