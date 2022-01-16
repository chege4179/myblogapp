import React from 'react';
import Layout from "../../components/Layout";
import {useRouter} from "next/router";
import BaseURL from "../../util/BaseURL";
import FeedArticle from "../../components/FeedArticle";

const SearchPage = ({ results,posts }) => {
    const router = useRouter()
    return (
        <Layout>
            <div className='justify-center w-full flex h-full '>
                <div className='max-w-screen-lg w-full flex justify-center '>
                    <div className='w-full h-full flex flex-col justify-center  p-3'>
                        <div className='border-solid border-black border-2  h-20 flex items-center px-3'>
                            <h1 className='font-bold text-4xl'>Search results for {router.query.query}</h1>
                        </div>
                        <div className='flex w-full border-solid border-black border-2 h-full'>
                            <div className='border-solid border-black border-2 w-1/4'>

                            </div>
                            <div className='w-3/4 flex border-solid border-black border-2 px-1'>
                                <div>
                                    {
                                        posts.map((post,index) => {
                                            return (<FeedArticle post={post} key={index}/>)
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
export async function getServerSideProps({ query:{ query } }){
    console.log(query)
    const SearchRes = await fetch(`${BaseURL}/post/search?query=${query}`)
    const AllPosts = await fetch(`${BaseURL}/post/all`)
    const { posts } = await AllPosts.json()
    const { results } = await SearchRes.json()

    return {
        props:{
            results,
            posts
        }
    }

}
export default SearchPage;
