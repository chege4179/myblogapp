import BaseURL from "./BaseURL";
import {toast} from "react-toastify";

function splitString(str) {
	return str.split(' ').join()
}

const refreshData = (router) => {
	router.replace(router.asPath);
}
const Topics = [
	'Fashion',
	'Politics',
	'Entertainment',
	'Food',
	'Health and Fitness',
	'Lifestyle',
	'Movies',
	'Travel',
	'Music',
	''
]
function randomHexColor() {
	let hex = '';
	const hexValues = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F']
	for(let i = 0; i < 6; i++){
		const index = Math.floor(Math.random() * hexValues.length)
		hex += hexValues[index];
	}
	return hex;
}
function generateAvatarURL(name){
	const splitname = name.split(" ").join("+")
	const color = randomHexColor()
	return `https://ui-avatars.com/api/?background=${color}&color=fff&name=${splitname}&bold=true&fontsize=0.6&rounded=true`
}
async function UploadPostImage(image) {
	const formData = new FormData();
	formData.append('image', image);


	const url = `${BaseURL}/post/uploadimage`;
	const response = await fetch(url, {
		method: 'POST',
		body: formData,
	})
	const res = await response.json()
	if (res.success) {
		toast.success(res.msg)
	} else {
		toast.error(res.msg)
	}
	return new Promise((resolve, reject) => {
		resolve({ data: { link: res.imageUrl} })
	})


}
const isBrowser = typeof window !== "undefined"
export {refreshData, splitString,isBrowser,generateAvatarURL,UploadPostImage}
