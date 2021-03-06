import axios from 'axios';

const apiConnection = axios.create({
	baseURL: 'https://172.16.220.252:24137',
	// baseURL: 'https://api-emp.naukanet.ru',
	withCredentials: false,
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	},
	proxy: {
		protocol: 'https',
		host: 'api-emp.naukanet.ru',
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

	createSubscriber(params) {
		return apiConnection.post('/hydraWorker/createSubscriber/', params);
	},

	deleteOrderWork(workId) {
		return apiConnection.delete(`/scoreWorks/${workId}`);
	},

	deleteOrderWorkParticipant(workId, participantId) {
		return apiConnection.delete(`/scoreWorks/${workId}/participants/${participantId}`);
	},

	deleteOrderWorkService(workId, serviceId) {
		return apiConnection.delete(`/scoreWorks/${workId}/services/${serviceId}`);
	},

	getCustomerInfo(customerId, dealId) {
		return apiConnection.get(`/customer/getInfo/${customerId}/${dealId}`);
	},

	getHydraServicesTypes() {
		return apiConnection.get('/hydraWorker/serviceConfig/serviceType/getList');
	},

	getHydraServices(dealId) {
		return apiConnection.get(`deal/getBusinessType/${dealId}`);
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
		return apiConnection.get('/order/getList/');
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
		return apiConnection.get('/deal/getStatusList');
	},

	setTariffication(params) {
		return apiConnection.post('/hydraWorker/createSubscription', params);
	},

	setTarifficationPhone(params) {
		return apiConnection.post('hydraWorker/createSubscription/phone', params);
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

	setWebSocketHeader(socketId) {
		apiConnection.defaults.headers.common['socket'] = socketId;
	},

	updateCustomerInfo(customerData) {
		return apiConnection.post('/customer/updateInfo', customerData);
	},

	updateMeetingDateTime(params) {
		return apiConnection.post('/deal/updateDealInfo', params);
	},

	updateOrderWorkFinished(workId, params) {
		return apiConnection.patch(`/scoreWorks/${workId}/finish`, params);
	},

	updateOrderWorkParticipant(workId, participantId) {
		return apiConnection.patch(`/scoreWorks/${workId}/participants/${participantId}/pause`);
	},

	updateOrderWorkStarted(workId, params) {
		return apiConnection.patch(`/scoreWorks/${workId}/start`, params);
	},

	updateOrderWorkService(workId, serviceId, params) {
		return apiConnection.patch(`scoreWorks/${workId}/services/${serviceId}`, params);
	},

	updateToken(token) {
		console.log('API Update token');
		apiConnection.defaults.headers.common['token'] = token;
	},

	updateTypeServices(params) {
		return apiConnection.post('/hydraWorker/serviceConfig/postConnectionType', params);
	},
}


