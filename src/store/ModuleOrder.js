import Socket from "@/services/Socket";
import AppDataServ from "@/services/AppDataServ";
import { prepareCustomer } from "@/helpers/data_conversion";

export const ModuleOrder = () => {
	return {
		namespaced: true,

		state: () => ({
			order: {},

			files: {
				act: [],
				blanc: [],
				doc: []
			}
		}),

		mutations: {
			SET_ORDER_DETAILS(state, data) {
				state.order.details = data[0];
				state.order.readyState = true;
			},

			SET_CUSTOMER_INFO(state, data) {
				state.order.customerInfo = prepareCustomer(data);
				state.order.customerInfo.UBN = state.order.details.CustomerUBN;
				state.order.customerInfo.readyState = true;
			},

			SET_HYDRA_TYPES_SERVICES(state, data) {
				console.log(data);
				const t = state.order.servicesHydra.find(({typeOfService}) => +typeOfService === +data.typeOfService);

				t.tariffList = data.avaliableServices;
				t.baseContractHydraId = data.baseContractHydraId;

				console.log(t);
			},

			SET_HYDRA_SERVICES(state, data) {
				state.order.servicesHydra = [];
				data.forEach(i => {
					state.order.servicesHydra.push({
						name: i.name,
						typeOfService: i.typeOfService,
						type: "Выбрать тип услуги",
						tariff: "Выбрать тарифный план",
						billingStart: false,
						isConnected: false,
						isOpened: false,
						showUploader: false,
						tariffList: [],
						monthly: [
							{
								name: 'Какая-то услуга 1',
								price: '200'
							},
							{
								name: 'Какая-то услуга 2',
								price: '150'
							},
							{
								name: 'Какая-то услуга 3',
								price: '150'
							},
							{
								name: 'Какая-то услуга 4',
								price: '200'
							}
						],
					})
				});
			},

			SET_SD_SERVICES(state, data) {
				state.order.servicesSD = data;
			},

/*			SET_INTERNET_CONNECTION(state, data) {
				console.log(state.works.find(({ScoreWorkID}) => +ScoreWorkID === +data.work.ScoreWorkID));
				console.log(data);
			},*/

			UPDATE_CUSTOMER_INFO(state, data) {
				console.log(data);
				console.log(state);
			},

			UPDATE_FILES(state, data) {
				const item = {
					name: data.file.name,
					size: data.file.size,
					date: new Date(),
					loading: true,
					loaded: false
				}
				setInterval(() => item.loaded = true, 1000);
				state.files[data.type].push(item);
			},

			UPDATE_ORDER_MEETING(state, status) {
				state.order.details.meetingStatusId = status;
			}
		},

		actions: {
			fetchCustomerInfo({ commit }, {customerId, dealId}) {
				return AppDataServ.getCustomerInfo(customerId, dealId)
					.then(response => {
						commit('SET_CUSTOMER_INFO', response.data);
					})
					.catch(error => {
						throw(error);
					});
			},

			fetchHydraServices({ commit }, dealId) {
				return AppDataServ.getHydraServices(dealId)
					.then(response => {
						commit('SET_HYDRA_SERVICES', response.data);

					})
					.catch(error => {
						throw(error);
					});
			},

			fetchSDServices({ commit }, dealId) {
				return AppDataServ.getSDServices(dealId)
					.then(response => {
						commit('SET_SD_SERVICES', response.data);
					})
					.catch(error => {
						throw(error);
					});
			},

			fetchOrderDetails({ commit }, orderId) {
				return AppDataServ.getOrderDetails(orderId)
					.then(response => {
						commit('SET_ORDER_DETAILS', response.data);
					})
					.catch(error => {
						throw(error);
					});
			},

			setTariffication(state, params) {
				return AppDataServ.setTariffication(params)
					.then(response => {
						console.log(response);
						/*commit('SET_INTERNET_CONNECTION', response.data);*/
					})
					.catch(error => {
						throw(error);
					});
			},

			setHydraConnection(state, params) {
				return AppDataServ.createSubscriber(params)
					.then(response => {
						console.log(response);
					})
					.catch(error => {
						throw(error);
					});
			},

			socketRegisterOrder(state, orderId) {
				return Socket.setOrder(orderId);
			},

			updateCustomerInfo({ commit }, customerData) {
				return AppDataServ.updateCustomerInfo(customerData)
					.then(response => {
						commit('UPDATE_CUSTOMER_INFO', response.data);
					})
					.catch(error => {
						throw(error);
					});
			},

			updateMeetingDateTime({commit}, params) {
				return AppDataServ.updateMeetingDateTime(params)
					.then(response => {
						if (!response.data === 1) {
							commit('UPDATE_ORDER_MEETING', params.status - 1);
						}
					})
					.catch(error => {
						throw(error);
					});
			},

			updateTypeServices({commit}, params) {
				return AppDataServ.updateTypeServices(params)
					.then(response => {
						console.log(response.data);
						commit('SET_HYDRA_TYPES_SERVICES', response.data);
					})
					.catch(error => {
						throw(error);
					});
			}
		}
	}
}
