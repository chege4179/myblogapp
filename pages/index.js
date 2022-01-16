
import Layout from "../components/Layout";
import LeftHomePage from "../components/LeftHomePage";
import CenterHomePage from "../components/CenterHomePage";
import RightHomePage from "../components/RightHomePage";
import BaseURL from "../util/BaseURL";

export default function Home({ posts }) {
  return (
    <Layout title='Blogify | Feed'>
        <div className='flex justify-center w-screen h-full py-1 sm:w-full sm:h-full '>
            <div className='max-w-screen-xl w-full h-full flex justify-center '>
                <div className='flex justify-evenly w-full h-full sm:flex-col sm:items-center md:flex-col md:items-center' >
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
export async function getServerSideProps(){
    const response = await fetch(`${BaseURL}/post/all`)
    const { posts } = await response.json()
    return {
        props:{
            posts:posts.reverse()
        }
    }
}
