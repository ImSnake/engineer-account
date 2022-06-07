import AppDataServ from "@/services/AppDataServ";
import { prepareOrder } from "@/helpers/data_conversion";

export const ModuleHome = () => {
	return {
		namespaced: true,

		state: () => ({
			orders: [],
			headerIcons: {
				case: 0,
				clock: 0
			}
		}),

		mutations: {
			SET_ORDERS(state, data) {
				const orders = [];
				data.forEach(order => orders.push(prepareOrder(order)));
				//state.headerIcons.case = orders.filter(el => +el.TroubleStatusID === 2).length;
				//state.headerIcons.clock = orders.filter(el => el.overdueSummary < 0,24).length;
				state.orders = orders;
				state.readyState = true;
			},

			UPDATE_ORDERS_LIST(state, data) {
				const order = data[0];
				if (!state.orders.find(({OrderID}) => +OrderID === +order.OrderID)) {
					state.orders.unshift(prepareOrder(order));
				}
			},
		},

		actions: {
			fetchOrders({ commit }, token) {
				return AppDataServ.getOrders(token)
					.then(response => {
						commit('SET_ORDERS', response.data);
					})
					.catch(error => {
						throw(error);
					});
			},

			fetchOrderSingleSearch({ commit }, orderId) {
				return AppDataServ.getOrderSingleSearch(orderId)
					.then(response => {
						commit('UPDATE_ORDERS_LIST', response.data);
					})
					.catch(error => {
						throw(error);
					});
			},
		}
	}
}
