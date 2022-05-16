import React, {useEffect} from 'react';
import Header from "./Header";
import Head from "next/head";
import {useDispatch} from "react-redux";
import {UserActions} from "../ReduxStore/UserConstants";
import {ArticleJsonLd, DefaultSeo, NextSeo} from "next-seo";
import {splitString} from "../util/HelperFunctions";
import {useRouter} from "next/router";
import Footer from "./Footer";

const Layout = ({children, post,title}) => {
	const dispatch = useDispatch()
	const router = useRouter()
	useEffect(() => {
		if (sessionStorage.getItem('user') !== null) {
			dispatch({
				type: UserActions.LOGIN_SUCCESS,
				payload: JSON.parse(sessionStorage.getItem('user'))
			})
		}
	}, [dispatch])
	return (
		<div className='overflow-x-hidden flex flex-col flex-grow'>
			<Head>
				<title>{title}</title>
			</Head>
			<Header/>
			<div className='mt-16 w-full min-h-screen bg-slate-100 flex flex-grow overflow-y-scroll scrollbar-hide'>
				{children}
			</div>
			<Footer/>
		</div>
	);
};

export default Layout;
