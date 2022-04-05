import React from 'react';
import SearchArticle from "../SearchArticle";
import FeedArticle from "../FeedArticle";

const RightHomePage = ({posts}) => {

	return (
		<div className='w-4/12 sm:w-full p-3 md:w-full'>
			<h1 className='font-bold text-2xl'>Posts you might like</h1>
			{
				posts.slice(0, 3).map((post, index) => {
					return (<FeedArticle post={post} key={index} width={426}/>)
				})
			}
		</div>
	);
};

export default RightHomePage;
