import Layout from "../components/Layout";
import LeftHomePage from "../components/HomePage/LeftHomePage";
import CenterHomePage from "../components/HomePage/CenterHomePage";
import RightHomePage from "../components/HomePage/RightHomePage";
import BaseURL from "../util/BaseURL";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {UserActions} from "../ReduxStore/UserConstants";

export default function Home({posts}) {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch({
			type: UserActions.FETCH_FEED_POSTS,
			payload: posts
		})
	}, []);


	return (
		<Layout post={posts[0]} title="Blogify Home Page">
			<div className='flex  justify-center w-screen  py-1 sm:w-full sm:h-full '>
				<div className='max-w-screen-xl w-full h-full flex justify-center '>
					<div className='flex justify-evenly w-full h-full sm:flex-col sm:items-center md:flex-col md:items-center'>
						<LeftHomePage/>
						<CenterHomePage posts={posts}/>
						<RightHomePage posts={posts}/>
					</div>
				</div>
				<div className='h-12'>

				</div>
			</div>
		</Layout>
	)
}

export async function getServerSideProps() {
	const response = await fetch(`${BaseURL}/post/all`)
	const {posts} = await response.json()
	return {
		props: {
			posts: posts.reverse()
		}
	}
}
