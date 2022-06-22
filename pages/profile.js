import React, {useEffect} from 'react';
import Layout from "../components/Layout";

import {useSelector} from "react-redux";
import {SelectUser} from "../ReduxStore/UserReducer";
import {useRouter} from "next/router";

const ProfilePage = () => {
	const user = useSelector(SelectUser)
	const router = useRouter()
	useEffect(() => {
		router.push("/")
	}, [user]);

	return (
		<Layout>
			<div className="w-full h-full flex items-center justify-center">
				<h1>Profile Page : {user?.name}</h1>
			</div>

		</Layout>
	);
};

export default ProfilePage;
