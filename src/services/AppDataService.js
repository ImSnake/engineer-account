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
		console.log('ЗАГЛУШКА get Single Order');
		console.log(customerId);
		//TODO (снять комментарий)
		// return appDataClient.get(`/orderData?CustomerID=${customerId}`);
		return appDataClient.get(`/orderData`);
	},

	getFilterData() {
		console.log('ЗАГЛУШКА get Filters');
		return appDataClient.get('/filterData');
	},

	/**
	 * @param params { userID }
	 * @returns {Promise<AxiosResponse<any>>}
	 */
	getOrders() {
		console.log('ЗАГЛУШКА get Orders List');
		return appDataClient.get('/ordersData');
	},

	getResponsibleDetails(responsibleId) {
		console.log('ЗАГЛУШКА get Responsible');
		return appDataClient.get(`/responsibleData?responsibleId=${responsibleId}`);
	},

	updateMeetingDateTime({OrderID, date}) {
		console.log('ЗАГЛУШКА update Meeting Date Time');
		console.log(OrderID);
		console.log(date);
		//return appDataClient.put(`/ordersData?OrderID=${OrderID}`, { MeetingDateTime: date });
	}

}
