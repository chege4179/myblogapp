let BaseURL;
let LocalURL = 'http://localhost:9001'
let RemoteURL = 'https://peterblogapp.herokuapp.com'
if (process.env.NODE_ENV === 'development') {
	BaseURL = LocalURL
} else {
	BaseURL = RemoteURL
}


export default BaseURL
