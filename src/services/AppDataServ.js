import axios from 'axios';

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
		console.log('API authorization');
		const request = await apiConnection.post('/authorization', params);
		apiConnection.defaults.headers.common['token'] = request.data.token;
		//console.log(apiConnection.defaults.headers);
		return request;
	},

	async getFilterData() {
		console.log('API get Filters');
		return apiConnection.get('/filter');
	},

	getOrders() {
		console.log('API get Orders List');
		return apiConnection.get(`/orders/getOrderList`);
	},

	getResponsibleDetails(responsibleId) {
		console.log('API get Responsible');
		return apiConnection.get(`/responsibleDetails/${responsibleId}`);
	}
}
