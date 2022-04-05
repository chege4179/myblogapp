import Link from "next/link";
import React from "react";

const ListItem = ({menuItem}) => {
	return (
		<div className=' w-full flex items-center  px-4 hover:cursor-pointer hover:bg-indigo-100 hover:rounded hover:underline h-10'>
			<Link href={menuItem.route} passHref={true}>
				<li className='sm:whitespace-nowrap md:text-xl'>{menuItem.name}</li>
			</Link>
		</div>
	)
}
export default ListItem
