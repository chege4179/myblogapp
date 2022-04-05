import React from 'react';
import Layout from "../components/Layout";
import {BiError} from "react-icons/bi";

const NotFoundPage = () => {
	return (
		<Layout post={{title: 'Page not found', description: "404 not found"}}>
			<div className='flex justify-center items-center w-full h-full'>
				<BiError size={80}/>
				<h1 className='font-bold text-6xl'>Page not Found</h1>
			</div>


		</Layout>
	);
};

export default NotFoundPage;
