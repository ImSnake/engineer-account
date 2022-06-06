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

			SET_HYDRA_INTERNET_SERVICES(state, data) {
				state.order.servicesHydra.find(el => el.name === "Интернет").tariffList = data.avaliableServices;
				state.order.servicesHydra.find(el => el.name === "Интернет").baseContractHydraId = data.baseContractHydraId;
			},

			SET_HYDRA_SERVICES(state, data) {
				state.order.servicesHydra = data;
			},

			SET_SD_SERVICES(state, data) {
				state.order.servicesSD = data;
			},

			SET_INTERNET_CONNECTION(state, data) {
				console.log(state.works.find(({ScoreWorkID}) => +ScoreWorkID === +data.work.ScoreWorkID));
				console.log(data);
			},

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
				const data = [
					{
						name: "Интернет",
						type: "Выбрать тип услуги",
						tariff: "Выбрать тарифный план",
						agreement: false,
						tariffList: [
							/*                {
																name: 'Выбрать тарифный план',
																value: ''
															},
															{
																name: 'ТП.ИНТ.Безлимитный 40',
																price: '700'
															},
															{
																name: 'ТП.ИНТ.Безлимитный 60',
																price: '1000'
															},
															{
																name: 'ТП.ИНТ.Безлимитный 100',
																price: '1500'
															},
															{
																name: 'ТП.Радиолинк 20',
																price: '2200'
															}*/
						],
						monthly: [
							{
								name: 'IP-адрес',
								price: '200'
							},
							{
								name: 'Keenetic Lite',
								price: '150'
							},
							{
								name: 'Keenetic Start',
								price: '150'
							},
							{
								name: 'Keenetic Air',
								price: '200'
							}
						],
						/*              oneTime: [
														{
															name: 'Keenetic Lite',
															price: '2500'
														},
														{
															name: 'Keenetic Start',
															price: '2000'
														},
														{
															name: 'Keenetic Air',
															price: '4000'
														}
													]*/
					},
					{
						name: "Телевидение",
						tariff: "ТП.ТВ.Комбо Люкс + AMEDIATEKA",
						agreement: false,
						tariffList: [{
							name: 'ТП.ТВ.Комбо Люкс + AMEDIATEKA',
							price: '700'
						}],
						monthly: [],
						oneTime: []
					}
				];
				commit('SET_HYDRA_SERVICES', data);
				return AppDataServ.getHydraServices(dealId)
					.then(response => {
						console.log(response);
						commit('SET_HYDRA_SERVICES', data);

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

			setInternetConnection({ commit }, params) {
				return AppDataServ.setInternetConnection(params)
					.then(response => {
						console.log(response);
						commit('SET_INTERNET_CONNECTION', response.data);
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
						commit('SET_HYDRA_INTERNET_SERVICES', response.data);
					})
					.catch(error => {
						throw(error);
					});
			}
		}
	}
}
