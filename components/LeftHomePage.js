import React from 'react';
import Link from 'next/link';
import {useSelector} from "react-redux";
import {SelectUser} from "../ReduxStore/UserReducer";

const LeftHomePage = () => {
    const user = useSelector(SelectUser)
    const UserLoggedInMenu = [
        {
            name:'My Posts',
            route:'/profile',
        },
        {
            name:'Saved Posts',
            route:'/saved',
        },
        {
            name:'Trending Topics',
            route:'/trending',
        },
    ]
    const UserLoggedOutMenu = [
        {
            name:'Trending Topics',
            route:'/trending',
        },
    ]
    return (
        <div className='mt-4 w-1/5 flex sm:w-full md:w-full ' >
            {
                user === null ?(
                    <ul className='flex w-full flex-col sm:flex-row md:flex-row'>
                        {
                            UserLoggedOutMenu.map((menuItem,index) => {
                                return(<ListItem key={index} menuItem={menuItem}/>)
                            })
                        }
                    </ul>
                ):(
                    <ul className='flex w-full flex-col sm:flex-row md:flex-row'>
                        {
                            UserLoggedInMenu.map((menuItem,index) => {
                                return(<ListItem key={index} menuItem={menuItem}/>)
                            })
                        }
                    </ul>
                )
            }

        </div>
    );
};

const ListItem = ({ menuItem }) => {
    return(
        <div className=' w-full flex items-center  px-4 hover:cursor-pointer hover:bg-indigo-100 hover:rounded hover:underline h-10'>
            <Link href={menuItem.route} passHref={true}>
                <li className='sm:whitespace-nowrap md:text-xl'>{menuItem.name}</li>
            </Link>
        </div>
    )
}
export default LeftHomePage;
