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
		return request;
	},

	getCustomerInfo(customerId) {
		console.log('API get Customer Info');
		return apiConnection.get(`/customer/getInfo/${customerId}`);
	},

	getDealHydraServices(dealId) {
		console.log(`API get Deal HYDRA Services: deal #${dealId}`);
		return {}
	},

	getDealSDServices(dealId) {
		console.log('API get Deal SD Services');
		return apiConnection.get(`/deal/getServiceList/${dealId}`);
	},

	async getFilterData() {
		console.log('API get Filters');
		return apiConnection.get('/filter');
	},

	getOrderDetails(orderId) {
		console.log('API get Order Details');
		return apiConnection.get(`/order/getInfo/${orderId}`);
	},

	getOrders() {
		console.log('API get Orders List');
		return apiConnection.get(`/order/getList/`);
	},

	getOrderSingleSearch(orderId) {
		console.log('API get Order Single Search');
		return apiConnection.get(`/order/getPreview/${orderId}`);
	},

	getResponsibleDetails(responsibleId) {
		console.log('API get Responsible');
		return apiConnection.get(`/responsibleDetails/${responsibleId}`);
	},


	updateCustomerInfo(customerData) {
		console.log('API UPDATE Customer Info');
		console.log(customerData);
		return apiConnection.post(`/customer/updateInfo`, customerData);
	},

	updateToken() {
		console.log('API Update token');
		apiConnection.defaults.headers.common['token'] = localStorage.engineerAccountAppToken;
	},


	//customerInfo/:customerId

}
