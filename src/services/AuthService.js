import axios from 'axios';

const authClient = axios.create({
	baseURL: 'http://localhost:3003',
	withCredentials: false,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}
});

export default {
	authUser() {
		return authClient.get('/userData');
	},
}
