import React from 'react';
import Layout from "../../components/Layout";
import BaseURL from "../../util/BaseURL";
import LeftPostPage from "../../components/Post/LeftPostPage";
import CenterPostPage from "../../components/Post/CenterPostPage";
import RightPostPage from "../../components/Post/RightPostPage";

const PostScreen = ({ post,user,posts }) => {
    return (
        <Layout title={post.title}>
            <div className='flex justify-center w-full h-full '>
                <div className='max-w-screen-xl w-full h-full flex md:flex-col md:items-center'>
                    <LeftPostPage likes={post.likes} post={post} views={post.views} />
                    <CenterPostPage post={post} user={user}/>
                    <RightPostPage post={post} user={user} posts={posts}/>
                </div>
            </div>
        </Layout>
    );
};
export async function getStaticProps({ params:{ id } }){
    const res = await fetch(`${BaseURL}/post/${id}`)
    const { post } = await res.json()
    const UserEmail = post.email
    const UserRes = await fetch(`${BaseURL}/user/findByEmail?email=${UserEmail}`)
    const { user } = await UserRes.json()
    const Response2 = await fetch(`${BaseURL}/post/single?email=${UserEmail}`)
    const { posts,msg } = await Response2.json()


    return {
        props:{
            post,
            user,
            posts
        },
        revalidate:10
    }
}
export async function getStaticPaths(){
    const res = await fetch(`${BaseURL}/post/all`)
    const { posts }= await res.json()

    const paths = posts.map((post) => ({ params :{ id:post._id }}))

    return{
        paths,
        fallback:false
    }
}
export default PostScreen;
