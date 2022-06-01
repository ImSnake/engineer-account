import AppDataServ from "@/services/AppDataServ";
import { prepareWorkItem } from "@/helpers/data_conversion";

export const ModuleWorks = () => {
	return {
		namespaced: true,

		state: () => ({
			works: []
		}),

		mutations: {
			SET_ORDER_WORKS(state, data) {
				state.works = data;
			},

			SET_NEW_ORDER_WORK(state, data) {
				const item = data.work;
				state.works.unshift(prepareWorkItem(data, item, true));
			},

			SET_ORDER_WORK_DETAILS(state, data) {
				const item = state.works.find(({ScoreWorkID}) => +ScoreWorkID === +data.work.ScoreWorkID);
				prepareWorkItem(data, item);
			},
		},

		actions: {
			deleteOrderWork(state, workId) {
				return AppDataServ.deleteOrderWork(workId)
					.catch(error => {
						throw(error);
					});
			},

			deleteOrderWorkParticipant(state, data) {
				return AppDataServ.deleteOrderWorkParticipant(data.workId, data.participantUserId)
					.catch(error => {
						throw(error);
					});
			},

			deleteOrderWorkService(state, data) {
				return AppDataServ.deleteOrderWorkService(data.scoreWorkId, data.service.scoreServiceId)
					.catch(error => {
						throw(error);
					});
			},

			fetchOrderWork({ commit }, workId) {
				return AppDataServ.getOrderWorkDetails(workId)
					.then(response => {
						commit('SET_NEW_ORDER_WORK', response.data);
					})
					.catch(error => {
						throw(error);
					});
			},

			fetchOrderWorks({ commit }, params) {
				return AppDataServ.getOrderWorks(params)
					.then(response => {
						commit('SET_ORDER_WORKS', response.data);
					})
					.catch(error => {
						throw(error);
					});
			},

			fetchOrderWorkDetails({ commit }, workId) {
				return AppDataServ.getOrderWorkDetails(workId)
					.then(response => {
						commit('SET_ORDER_WORK_DETAILS', response.data);
					})
					.catch(error => {
						throw(error);
					});
			},

			setOrderWork(state, params) {
				return AppDataServ.setOrderWork(params)
					.then(response => {
						return +response.data.scoreWorkId;
					})
					.catch(error => {
						throw(error);
					});
			},

			setOrderWorkParticipant(state, data) {
				return AppDataServ.setOrderWorkParticipant(data.workId, data.params)
					.catch(error => {
						throw(error);
					});
			},

			setOrderWorkService(state, data) {
				return AppDataServ.setOrderWorkService(data.scoreWorkId, data.service)
					.catch(error => {
						throw(error);
					});
			},

			updateOrderWork(state, data) {
				console.log('work was updated');
				console.log(state);
				console.log(data.scoreWorkId);
				console.log(data.action);
			},

			updateOrderWorkFinished(state, data) {
				return AppDataServ.updateOrderWorkFinished(data.workId, data.params)
					.catch(error => {
						throw(error);
					});
			},

			updateOrderWorkParticipant(state, data) {
				console.log('update Order Work Participant');
				return AppDataServ.updateOrderWorkParticipant(data.workId, data.participantId)
					.catch(error => {
						throw(error);
					});
			},

			updateOrderWorkStarted(state, data) {
				return AppDataServ.updateOrderWorkStarted(data.workId, data.params)
					.catch(error => {
						throw(error);
					});
			},

			updateOrderWorkService(state, data) {
				return AppDataServ.updateOrderWorkService(
					data.scoreWorkId,
					data.service.scoreServiceId,
					{ serviceAmount: +data.service.serviceAmount }
				)
					.catch(error => {
						throw(error);
					});
			},
		}
	}
}
