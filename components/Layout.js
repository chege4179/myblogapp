import React, {useEffect} from 'react';
import Header from "./Header";
import Head from "next/head";
import {useDispatch} from "react-redux";
import {UserActions} from "../ReduxStore/UserConstants";


const Layout = ({ children ,title, description,keywords }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        if (sessionStorage.getItem('user') !== null){
            dispatch({
                type:UserActions.LOGIN_SUCCESS,
                payload:JSON.parse(sessionStorage.getItem('user'))
            })
        }
    },[dispatch])
    return (
        <div className='overflow-x-hidden'>
            <Head>
                <title>{title}</title>
                <meta name='description' content={description}/>
                <meta name='keywords' content={keywords}/>
            </Head>
            <Header/>
            <div className='w-screen h-full bg-gray-300 '>
                { children }
            </div>
        </div>
    );
};

export default Layout;
