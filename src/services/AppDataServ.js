import axios from 'axios';

const apiConnection = axios.create({
	baseURL: 'https://172.16.220.252:24137',
	// baseURL: 'https://amp.naukanet.ru',
	withCredentials: false,
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	},
	proxy: {
		protocol: 'https',
		host: 'amp.naukanet.ru',
		port: 80
	}
});

export default {
	async authUser(params) {
		try {
			const request = await apiConnection.post('/authorization', params);
			apiConnection.defaults.headers.common['token'] = request.data.token;
			return request.data;
		} catch (error) {
			return error.response ? error.response : {status: 404};
		}
	},

	deleteOrderWork(workId) {
		console.log('API Delete Work Item');
		return apiConnection.delete(`/scoreWorks/${workId}`);
	},

	deleteOrderWorkParticipant(workId, participantId) {
		return apiConnection.delete(`/scoreWorks/${workId}/participants/${participantId}`);
	},

	deleteOrderWorkService(workId, serviceId) {
		return apiConnection.delete(`/scoreWorks/${workId}/services/${serviceId}`);
	},

	getCustomerInfo(customerId) {
		return apiConnection.get(`/customer/getInfo/${customerId}`);
	},

	getHydraInternetTypes() {
		return apiConnection.get(`/hydraWorker/serviceConfig/serviceType/getList`);
	},

	getSDServices(dealId) {
		return apiConnection.get(`/deal/getServiceList/${dealId}`);
	},

	getFilterData() {
		return apiConnection.get('/filter');
	},

/*	getHeaderIcons() {
		console.log('API get Header Icons');
		return apiConnection.get('/order/getInfoForHeader');
	},*/

	getOrderDetails(orderId) {
		return apiConnection.get(`/order/getInfo/${orderId}`);
	},

	getOrders() {
		return apiConnection.get(`/order/getList/`);
	},

	getOrderSingleSearch(orderId) {
		return apiConnection.get(`/order/getPreview/${orderId}`);
	},

	getOrderWorks(params) {
		return apiConnection.get('/scoreWorks', {params: params});
	},

	getOrderWorkDetails(workId) {
		return apiConnection.get(`/scoreWorks/${workId}`);
	},

	getResponsibleDetails(responsibleId) {
		return apiConnection.get(`/responsibleDetails/${responsibleId}`);
	},

	getScoreServices() {
		return apiConnection.get('/scoreWorks/dictionaries');
	},

	getVisitStatuses() {
		return apiConnection.get(`/deal/getStatusList`);
	},

	setInternetConnection(params){
		return apiConnection.post(`/hydraWorker/createSubscription`, params);
	},

	setOrderWork(params) {
		return apiConnection.post('/scoreWorks', params);
	},

	setOrderWorkParticipant(workId, params) {
		return apiConnection.post(`/scoreWorks/${workId}/participants`, params);
	},

	setOrderWorkService(workId, params) {
		return apiConnection.post(`/scoreWorks/${workId}/services`, params);
	},

	updateCustomerInfo(customerData) {
		return apiConnection.post(`/customer/updateInfo`, customerData);
	},

	updateMeetingDateTime(params) {
		return apiConnection.post(`/deal/updateDealInfo`, params);
	},

	updateOrderWorkFinished(workId, params) {
		return apiConnection.patch(`/scoreWorks/${workId}/finish`, params);
	},

	updateOrderWorkStarted(workId, params) {
		return apiConnection.patch(`/scoreWorks/${workId}/start`, params);
	},

	updateOrderWorkService(workId, serviceId, params) {
		return apiConnection.patch(`scoreWorks/${workId}/services/${serviceId}`, params);
	},

	updateToken() {
		console.log('API Update token');
		apiConnection.defaults.headers.common['token'] = localStorage.engineerAccountAppToken;
	},

	updateTypeServices(params) {
		return apiConnection.post(`/hydraWorker/serviceConfig/postConnectionType`, params);
	},
}


