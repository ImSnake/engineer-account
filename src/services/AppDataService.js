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
	 *
	 * @param params { userID }
	 * @returns {Promise<AxiosResponse<any>>}
	 */
	getOrdersByParams(userId) {
		console.log('GET ORDERS BY PARAMS');
		console.log(userId);
		return appDataClient.get('/ordersData');
	},

	getResponsibleDetails(responsibleId) {
		return appDataClient.get(`/responsibleData?responsibleId=${responsibleId}`);
	}

}
