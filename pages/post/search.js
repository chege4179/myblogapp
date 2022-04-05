import React, {useState} from 'react';
import Layout from "../../components/Layout";
import {useRouter} from "next/router";
import BaseURL from "../../util/BaseURL";
import FeedArticle from "../../components/FeedArticle";
import SearchArticle from "../../components/SearchArticle";
import {BsNewspaper} from "react-icons/bs";
import {AiOutlineUser} from "react-icons/ai";
import {useSelector} from "react-redux";
import {SelectUser} from "../../ReduxStore/UserReducer";
import UserSearchCard from "../../components/UserSearchCard";

const SearchPage = ({posts, users}) => {
	const user = useSelector(SelectUser)
	const router = useRouter()
	const [searchparams, setSearchParams] = useState('posts')
	const [myposts, setMyPosts] = useState(posts.filter((post) => post.author === user?.name))
	const ChangePost = (param) => {

		setSearchParams(param)
	}
	return (
		<Layout post={{title: `Blogify Search Page || ${searchparams}`}}>
			<div className='justify-center w-full flex h-full overflow-y-hidden'>
				<div className='max-w-screen-lg w-full flex justify-center '>
					<div className='w-full h-full  justify-center p-3 mb-4'>
						<div className='h-20 flex justify-between items-center px-3'>
							<h1 className='w-3/5 font-bold text-4xl'>Search results for
								"{router.query.query}"</h1>
							<div className='flex w-2/5 justify-end'>
								<div className='h-10 w-24 flex justify-center items-center rounded  hover:bg-white hover:bg-indigo-100 hover:cursor-pointer'>
									<h1 className=''>Newest</h1>
								</div>
								<div className='h-10 w-24 text-center flex justify-center  items-center rounded  hover:bg-white hover:bg-indigo-100 hover:cursor-pointer'>
									<h1 className=''>Oldest</h1>
								</div>
							</div>
						</div>
						<div className='flex w-full h-full'>
							<div className=' w-1/4 '>
								<div className='w-full h-10  flex justify-start pl-2 items-center rounded mr-4 hover:bg-white hover:bg-indigo-100'
									onClick={() => setSearchParams('posts')}>
									<BsNewspaper className='mr-2'/>
									<h1 className='font-bold text-lg'>Posts</h1>
								</div>
								<div className='w-full h-10  flex justify-start pl-2 items-center rounded mr-4 hover:bg-white hover:bg-indigo-100'
									onClick={() => setSearchParams('users')}>
									<AiOutlineUser className='mr-2'/>
									<h1 className='font-bold text-lg'>Users</h1>
								</div>
								<div className='w-full h-10  flex justify-start pl-2 items-center rounded mr-4 hover:bg-white hover:bg-indigo-100'
									onClick={() => setSearchParams('myposts')}>
									<BsNewspaper className='mr-2'/>
									<h1 className='font-bold text-lg'>My Posts</h1>
								</div>
							</div>
							<div className='w-3/4 h-full flex flex-col px-1 overflow-y-scroll scrollbar-hide '>
								{
									searchparams === 'posts' ? (
										<div className='w-full h-full'>
											{
												posts.map((post, index) => {
													return (<SearchArticle post={post} key={index}/>)
												})
											}
										</div>
									) : searchparams === 'users' ? (
										<div className='w-full h-full'>
											{
												users.map((user, index) => {
													return (<UserSearchCard key={index} user={user}/>)
												})
											}
										</div>
									) : searchparams === 'myposts' ? (
										<div className='w-full h-full'>
											{
												myposts.map((post, index) => {
													return (<SearchArticle post={post} key={index}/>)
												})
											}
										</div>
									) : null
								}

							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export async function getServerSideProps({query: {query}}) {

	const SearchRes = await fetch(`${BaseURL}/post/search?query=${query}`)

	const searchres = await SearchRes.json()


	return {
		props: {
			users: searchres.users,
			posts: searchres.posts,
		}
	}

}

export default SearchPage;
