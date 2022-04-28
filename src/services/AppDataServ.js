import axios from 'axios';


const apiConnection = axios.create({
	//baseURL: 'https://172.16.220.252:24237',
	baseURL: 'https://amp.naukanet.ru',
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
		console.log('API authorization');
		try {
			const request = await apiConnection.post('/authorization', params);
			apiConnection.defaults.headers.common['token'] = request.data.token;
			return request.data;
		} catch (error) {
			return error.response ? error.response : {status: 404};
		}
	},

	getCustomerInfo(customerId) {
		console.log('API get Customer Info');
		return apiConnection.get(`/customer/getInfo/${customerId}`);
	},

	getHydraInternetTypes() {
		console.log('API get Hydra Internet Types');
		return apiConnection.get(`/hydraWorker/serviceConfig/serviceType/getList`);
	},

	getSDServices(dealId) {
		console.log('API get Deal SD Services');
		return apiConnection.get(`/deal/getServiceList/${dealId}`);
	},

	async getFilterData() {
		console.log('API get Filters');
		return apiConnection.get('/filter');
	},

/*	getHeaderIcons() {
		console.log('API get Header Icons');
		return apiConnection.get('/order/getInfoForHeader');
	},*/

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

	getOrderWorks(params) {
		console.log('API GET ORDER WORKS');
		return apiConnection.get('/scoreWorks', {params: params});
	},

	getScoreServices() {
		console.log('API GET SCORE WORKS REFERENCE BOOK');
		return apiConnection.get('/scoreWorks/dictionaries');
	},

	getVisitStatuses() {
		console.log('API get Visit Statuses');
		return apiConnection.get(`/deal/getStatusList`);
	},

	setInternetConnection(params){
		console.log('API SET INTERNET CONNECTION');
		return apiConnection.post(`hydraWorker/createSubscription`, params);
	},

	updateCustomerInfo(customerData) {
		console.log('API UPDATE Customer Info');
		return apiConnection.post(`/customer/updateInfo`, customerData);
	},

	updateMeetingDateTime(params) {
		console.log('API UPDATE Meeting Date Time');
		return apiConnection.post(`/deal/updateDealInfo`, params);
	},

	updateToken() {
		console.log('API Update token');
		apiConnection.defaults.headers.common['token'] = localStorage.engineerAccountAppToken;
	},

	updateTypeServices(params) {
		console.log('API UPDATE Type Services');
		return apiConnection.post(`/hydraWorker/serviceConfig/postConnectionType`, params);
	},

}

/*const Zservices = [
	{
		categoryId: '2',
		name: 'Категория Подключения',
		list: [
			{
				id: "6",
				name: "Выполнение проработки",
				sum: 0.5
			},
			{
				id: "7",
				name: "Выполнение подключения (Физические лица или юридические лица на объектах с развитой инфраструктурой)",
				sum: 1
			},
			{
				id: "8",
				name: "Выполнение подключения без проработки  (Физические лица или юридические лица на объектах с развитой инфраструктурой)",
				sum: 1.5
			},
			{
				id: "9",
				name: "Монтаж\\демонтаж оборудования по отдельной заявке",
				sum: 1
			},
			{
				id: "10",
				name: "Мелокие работы по отдельным заявкам (установка розетки, удлинение кабеля, настройка роутера или ПК у клиента, настройка регистратора СВН и т.п.)",
				sum: 0.5
			},
			{
				id: "11",
				name: "Монтаж кабеля внутри помещения, по лоткам либо подвязка к существующей трассе (UTP, ВОК, ЭП) (100 метров)",
				sum: 1
			},
			{
				id: "12",
				name: "Укладка кабеля в гофру или кабель-канал (за 100 метров)",
				sum: 1.2
			},
			{
				id: "13",
				name: "Монтаж кабеля в кабельной канализации, подвес кабеля к тросу (UTP, ВОК, ЭП), подвес кабеля на опоры с монтажем крюков на опоры (за 100 метров)",
				sum: 1.5,
			},
			{
				id: "14",
				name: "Монтаж кабель каналов до 100 мм (за 20 метров)",
				sum: 1
			}
		]
	},
	{
		categoryId: '3',
		name: 'Категория Эксплуатация',
		list: [
			{
				id: "34",
				name: "Монтаж кабеля внутри помещения, по лоткам либо подвязка к существующей трассе (UTP, ВОК, ЭП) (за 100 метров)",
				sum: 1
			},
			{
				id: "35",
				name: "Укладка кабеля в гофру или кабель-канал (за 100 метров)",
				sum: 1.2
			},
			{
				id: "36",
				name: "Монтаж кабеля в кабельной канализации, подвес кабеля к тросу (UTP, ВОК, ЭП), подвес кабеля на опоры с монтажем крюков на опоры (за 100 метров)",
				sum: 1.5
			},
			{
				id: "37",
				name: "Монтаж кабель каналов до 100 мм (за 20 метров)",
				sum: 1
			},
			{
				id: "38",
				name: "Монтаж лотков ( со шпильками) (за 20 метров)",
				sum: 2
			},
			{
				id: "39",
				name: "Разделка муфты или кросса (за один кабельный ввод)",
				sum: 0.5
			},
			{
				id: "40",
				name: "Разварка волокон (за 1 волокно)",
				sum: 0.1
			},
			{
				id: "41",
				name: "Расшивка патч-панели, каждый 1 порта",
				sum: 0.05
			},
			{
				id: "42",
				name: "Монтаж LTE комплекта под ключ (1 комплект)",
				sum: 1.5
			}
		]
	},
	{
		id: '4',
		name: 'Категория Проекты',
		list: [
			{
				id: "2",
				name: "Тестовая услуга для проверки вывода данных",
				sum: 10.29
			}
		]
	}
];*/
