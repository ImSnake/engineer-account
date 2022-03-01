import axios from 'axios';

const appDataClient = axios.create({
	baseURL: 'http://localhost:3003',
	withCredentials: false,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}
});

export default {

	getFilterData() {
		return appDataClient.get('/filterData');
	},

	/**
	 * @param params { userID }
	 * @returns {Promise<AxiosResponse<any>>}
	 */
	getOrders(userId) {
		console.log('GET ORDERS BY PARAMS');
		console.log(userId);
		//TODO (при настройке API добавить в выборку параметр userId)
		return appDataClient.get('/ordersData');
	},

	getResponsibleDetails(responsibleId) {
		return appDataClient.get(`/responsibleData?responsibleId=${responsibleId}`);
	},

	getCustomerData(customerId) {
		console.log('get Customer Data');
		console.log(customerId);
		//TODO (снять комментарий)
		// return appDataClient.get(`/customerData?customerId=${customerId}`);
		return appDataClient.get(`/customerData?customerId=1234567`);
	},

	updateMeetingDateTime(orderId, dateTime) {
		console.log('update Meeting Date Time');
		return appDataClient.put(`/ordersData?OrderID=${orderId}/`, dateTime);
	}

}
