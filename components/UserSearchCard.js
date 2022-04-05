import React from 'react';
import Image from 'next/image'

const UserCard = ({user}) => {
	return (
		<div className='w-full h-48 rounded-lg border border-solid border-gray-300 bg-white p-4'>
			<div>
				<Image src={user.imageUrl} width={48} height={48} className='rounded-xl'/>
			</div>
			<h1>{user.name}</h1>
		</div>
	);
};

export default UserCard;
