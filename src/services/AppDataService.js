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
	 * @param params { userID, departmentId, roleId }
	 * @returns {Promise<AxiosResponse<any>>}
	 */
	getOrdersByParams(params) {
		console.log('GET ORDERS BY PARAMS');
		console.log(params);
		return appDataClient.get('/ordersData');
	},

	getResponsibleDetails(responsibleId) {
		return appDataClient.get(`/responsibleData?responsibleId=${responsibleId}`);
	}

}
