import Socket from "@/services/Socket";
import AppDataServ from "@/services/AppDataServ";
import { prepareCustomer } from "@/helpers/data_conversion";

export const ModuleOrder = () => {
	return {
		namespaced: true,

		state: () => ({
			order: {
				readyState: false
			},

			customerInfo: {
				readyState: false
			},

			services: {
				readyState: false
			},

			files: {
				act: [],
				blanc: [],
				doc: []
			},

			SECTION_ID: null,

			ORDER_ID: null
		}),

		mutations: {
			CLEAR_STATE(state) {
				state.order =  {
					readyState: false
				};
				state.customerInfo =  {
						readyState: false
				};
				state.services = {
					readyState: false
				}
				state.SECTION_ID = null;
				state.ORDER_ID = null;
			},

			SET_ORDER_DETAILS(state, data) {
				state.order.details = data[0];
				state.order.readyState = true;
			},

			SET_CUSTOMER_INFO(state, data) {
				state.customerInfo = prepareCustomer(data);
				state.customerInfo.UBN = state.order.details.CustomerUBN;
				state.customerInfo.readyState = true;
			},

			SET_HYDRA_TYPES_SERVICES(state, data) {
				console.log(data);
				const t = state.services.fromHydra.find(({typeOfService}) => +typeOfService === +data.typeOfService);

				t.baseContractHydraId = data.baseContractHydraId;
				t.serviceTypeId = data.serviceTypeId;

				if (data.avaliableServices) {
					t.tariffList = data.avaliableServices || [];
				}

				if (data.avalibleContracts) {
					t.contractsList = data.avalibleContracts || [];

					t.contractsList.unshift({
						name: 'Выбрать контракт',
						value: ''
					});
				}

				console.log(t);
			},

			SET_HYDRA_SERVICES(state, data) {
				console.log(data);

				state.services.fromHydra = [];

				data.forEach(i => {

					if (Object.keys(i.accountData).length !== 0) {
						state.services.account = i.accountData;
					}

					const hasHydraConnection = Object.keys(i.connectionData).length !== 0;

					state.services.fromHydra.push({
						connectionData: hasHydraConnection ? i.connectionData : '',
						name: i.name,
						typeOfService: i.typeOfService,
						billingStart: hasHydraConnection,
						isConnected: false,
						isOpened: hasHydraConnection,
						showUploader: false,
						tariffList: [],
						contractsList: [],
					});

				});

				state.services.readyState = true;
			},

			SET_SD_SERVICES(state, data) {
				state.services.fromSD = data;
			},

			SET_HYDRA_TARIFFICATION(state, { params, serviceData, accountData }) {
				const t = state.services.fromHydra.find(({typeOfService}) => +typeOfService === +params.mainServiceSdId);

				console.log(serviceData);
				console.log(accountData);

				t.connectionData = {
					name: params.serviceName,
					amount: params.serviceAmount,
					type_name: params.serviceTypeName,
					login: serviceData.serviceLogin,
					pass: serviceData.servicePass
				};

				state.services.account = {
					login: accountData.accountLogin,
					pass: accountData.accountPass
				}
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
				return AppDataServ.getHydraServices(dealId)
					.then(response => {
						console.log(response);
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

			setTariffication({ commit }, params) {
				return AppDataServ.setTariffication(params)
					.then(res => {
						console.log(res);
						commit('SET_HYDRA_TARIFFICATION', {
							params: params,
							serviceData: res.data.serviceData,
							accountData: res.data.accountData
						});
					})
					.catch(error => {
						throw(error);
					});
			},

			setHydraConnection(state, params) {
				return AppDataServ.createSubscriber(params)
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
						response.data.serviceTypeId = params.typeOfMainService;
						commit('SET_HYDRA_TYPES_SERVICES', response.data);
					})
					.catch(error => {
						throw(error);
					});
			}
		}
	}
}
