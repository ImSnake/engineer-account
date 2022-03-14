import axios from 'axios';

let token = '';

const apiConnection = axios.create({
	baseURL: 'http://172.16.220.252:24237',
	withCredentials: false,
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	}
});

export default {
	async authUser(params) {
		const request = await apiConnection.post('/authorization', params);
		token = request.data.token;
		console.log(token);
		apiConnection.defaults.headers.common['token'] = token;
		return request;
	},

	getOrders() {
		console.log('get Order Data');
		console.log(apiConnection.defaults.headers);
		return apiConnection.get(`/orders/getOrderList`);
	},

	getResponsibleDetails(responsibleId) {
		return apiConnection.get(`/responsibleDetails/${responsibleId}`);
	}
}
