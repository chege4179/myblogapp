import React from 'react';
import FeedArticle from "../FeedArticle";
import BaseURL from "../../util/BaseURL";

const CenterHomePage = ({posts}) => {
	return (
		<div className='w-1/2 sm:w-full md:w-full'>
			<div className='w-full p-3'>
				<h1 className='font-bold text-4xl md:text-5xl'>Top Posts</h1>
				{
					posts.map((post, index) => {
						return (<FeedArticle key={index} post={post}/>)
					})
				}
			</div>

		</div>
	);
};


export default CenterHomePage;
