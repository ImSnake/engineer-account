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

	getOrderData(customerId) {
		console.log('get Order Data');
		console.log(customerId);
		//TODO (снять комментарий)
		// return appDataClient.get(`/orderData?CustomerID=${customerId}`);
		return appDataClient.get(`/orderData`);
	},

	getFilterData() {
		return appDataClient.get('/filterData');
	},

	/**
	 * @param params { userID }
	 * @returns {Promise<AxiosResponse<any>>}
	 */
	getOrders(userId) {
		console.log('GET ORDERS');
		console.log(userId);
		//TODO (при настройке API добавить в выборку параметр userId)
		return appDataClient.get('/ordersData');
	},

	getResponsibleDetails(responsibleId) {
		return appDataClient.get(`/responsibleData?responsibleId=${responsibleId}`);
	},

	updateMeetingDateTime({OrderID, date}) {
		console.log('update Meeting Date Time');
		console.log(OrderID);
		console.log(date);
		//return appDataClient.put(`/ordersData?OrderID=${OrderID}`, { MeetingDateTime: date });
	}

}
