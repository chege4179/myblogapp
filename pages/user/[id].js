import React from 'react';
import Layout from "../../components/Layout";

const UserProfilePage = ({ user }) => {
	return (
		<Layout title="User Profile Page">

		</Layout>
	);
};
export async function getServerSideProps({ query }){
	console.log(query.id)
	return {
		props:{

		}
	}
}
export default UserProfilePage;
