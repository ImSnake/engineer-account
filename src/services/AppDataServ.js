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

	getHydraServices(dealId) {
		console.log(`API get Deal HYDRA Services: deal #${dealId}`);
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

	getWorksList() {
		console.log('API get Works List');
		return {
			data: [
				{
					group: "Типовые работы по заявкам",
					list: [
						{
							name: "Выполнение проработки",
							value: "1",
							unit: "за 1 заявку",
							rating: "0.5"
						},
						{
							name: "Выполнение подключения (Физические лица или юридические лица на объектах с развитой инфраструктурой)",
							value: "2",
							unit: "за 1 заявку",
							rating: "1"
						},
						{
							name:	"Выполнение подключения без проработки  (Физические лица или юридические лица на объектах с развитой инфраструктурой)",
							value: "3",
							unit: "за 1 заявку",
							rating: "1.5"
						},
						{
							name: "Монтаж\\демонтаж оборудования по отдельной заявке",
							value: "4",
							unit: "за 1 ед.",
							rating: "1"
						},
						{
							name: "Мелокие работы по отдельным заявкам (установка розетки, удлинение кабеля, настройка роутера или ПК у клиента, настройка регистратора СВН и т.п.)",
							value: "5",
							unit: "за 1 заявку",
							rating: "0.5"
						},
						{
							name:	"Не типовые задачи по заявке (оценивается на усмотрение)",
							value: "6",
							unit: "за 1 заявку",
							rating: "1"
						}
					]
				},
				{
					group: "Монтажные работы с кабелем",
					list: [
						{
							name: "Монтаж кабеля внутри помещения, по лоткам либо подвязка к существующей трассе (UTP, ВОК, ЭП)",
							value: "7",
							unit: "за 100 метров",
							rating: "1"
						},
						{
							name: "Укладка кабеля в гофру или кабель-канал",
							value: "8",
							unit: "за 100 метров",
							rating: "1.2"
						},
						{
							name: "Монтаж кабеля в кабельной канализации, подвес кабеля к тросу (UTP, ВОК, ЭП), подвес кабеля на опоры с монтажем крюков на опоры",
							value: "9",
							unit: "за 100 метров",
							rating: "1.5"
						},
						{
							name: "Монтаж кабель каналов до 100 мм",
							value: "10",
							unit: "за 20 метров",
							rating: "1"
						},
						{
							name: "Монтаж лотков со шпильками",
							value: "11",
							unit: "за 20 метров",
							rating: "2"
						}
					]
				},
				{
					group: "Работы по разделке кабелей",
					list: [
						{
							name: "Разделка муфты или кросса",
							value: "12",
							unit: "за 1 заведенный кабель",
							rating: "0.5"
						},
						{
							name: "Разварка волокон",
							value: "13",
							unit: "за 1 волокно",
							rating: "0.1"
						},
						{
							name: "Расшивка патчпанели, каждый 1 порта",
							value: "14",
							unit: "за 1 порт",
							rating: "0.05"
						}
					]
				},
				{
					group: "Монтажные работы с оборудованием",
					list: [
						{
							name: "Монтаж LTE комплекта под ключ",
							value: "15",
							unit: "за 1 комплект",
							rating: "1.5"
						},
						{
							name: "Демонтаж LTE комплекта под ключ",
							value: "16",
							unit: "за 1 комплект",
							rating: "1"
						},
						{
							name: "Монтаж радиомоста",
							value: "17",
							unit: "за 1 точку",
							rating: "1.5"
						},
						{
							name: "Демонтаж радиомоста",
							value: "18",
							unit: "за 1 точку",
							rating: "1"
						},
						{
							name: "Монтаж/демонтаж камеры СВН",
							value: "19",
							unit: "за 1 камеру",
							rating: "0.5"
						},
						{
							name: "Юстировка камеры",
							value: "20",
							unit: "за 1 камеру",
							rating: "0.3"
						},
						{
							name: "Настройка камеры",
							value: "21",
							unit: "за 1 камеру",
							rating: "0.2"
						},
						{
							name: "Устранение проблем в картинке камеры (кронировать деревья, убрать провода)",
							value: "22",
							unit: "за 1 камеру",
							rating: "0.3"
						},
						{
							name: "Обслуживание камеры СВН",
							value: "23",
							unit: "за 1 камеру",
							rating: "0.2"
						},
						{
							name: "Фотографирование обьекта (кабель на доме, камера место размещения, эталонное фото)",
							value: "24",
							unit: "за 1 обьект",
							rating: "0.05"
						},
						{
							name: "Установка ТКШ",
							value: "25",
							unit: "за 1 ТКШ",
							rating: "0.5"
						},
						{
							name: "Монтаж и подключение ЭП в ТКШ",
							value: "26",
							unit: "за 1 ТКШ",
							rating: "0.5"
						}
					]
				},
				{
					group: "Дополнительные виды работ",
					list: [
						{
							name: "Доставка оборудования (как отдельный элемент работ, не входит при работе по основным задачам)",
							value: "27",
							unit: "за 1 заявку",
							rating: "0.5"
						},
						{
							name: "Дежурство в выходной день без выезда на инцидент",
							value: "28",
							unit: "за 1 день",
							rating: "0.75"
						},
						{
							name: "Решение инцидента (базовая оценка без кабельных работ)",
							value: "29",
							unit: "за 1 инцидент",
							rating: "1"
						}
					]
				}
			]
		};
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
