const withPWA = require('next-pwa')

module.exports = withPWA({
	reactStrictMode: true,
	images: {
		domains: ['res.cloudinary.com','ui-avatars.com'],
	},
	pwa:{
		dest:"public",
		register:true,
		skipWaiting:true,
		disable: process.env.NODE_ENV === 'development',
	}
})
