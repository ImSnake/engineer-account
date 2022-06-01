import AppDataServ from "@/services/AppDataServ";
import { prepareWorkItem } from "@/helpers/data_conversion";
import Socket from "@/services/Socket";

export const ModuleWorks = () => {
	return {
		namespaced: true,

		state: () => ({
			works: [],
		}),

		mutations: {
			DELETE_ORDER_WORK(state, scoreWorkId) {
				console.log(scoreWorkId);
				console.log(scoreWorkId);
				state.works.find(w => w.ScoreWorkID === scoreWorkId).ScoreWorkStatusID = 4;
			},

			SET_ORDER_WORKS(state, data) {
				state.works = data;
				state.readyState = true;
			},

			SET_NEW_ORDER_WORK(state, data) {
				const item = data.work;
				state.works.unshift(prepareWorkItem(data, item, true));
			},

			SET_ORDER_WORK_DETAILS(state, data) {
				const item = state.works.find(({ScoreWorkID}) => +ScoreWorkID === +data.work.ScoreWorkID);
				prepareWorkItem(data, item);
			},

			UPDATE_NEW_ORDER_WORK(state, data) {
				console.log('NEW_UPDATE_ORDER_WORK');
				const item = data.work;
				state.works.unshift(prepareWorkItem(data, item, false));
			},

			UPDATE_ORDER_WORK(state, data) {
				console.log('UPDATE_ORDER_WORK');
				const item = data.work;
				item.isOpened = state.works.find(({ScoreWorkID}) => +ScoreWorkID === +data.work.ScoreWorkID).isOpened;

				const work = prepareWorkItem(data, item);

				Object.keys(state.works).forEach(k => {
					if (+state.works[k].ScoreWorkID === +work.ScoreWorkID) {
						state.works[k] = work;
					}
				});
			}
		},

		actions: {
			deleteOrderWork({ commit }, workId) {
				return AppDataServ.deleteOrderWork(workId)
					.then(() => {
						commit('DELETE_ORDER_WORK', workId);
					})
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

			socketRegisterScoreWorks(state, callback) {
				return Socket.setScoreWorksListener(callback);
			},

			socketOffScoreWorks() {
				return Socket.offScoreWorksListener();
			},

			updateOrderWork({ commit }, { action, scoreWorkId }) {
				switch (action) {
					case 'created':
						AppDataServ.getOrderWorkDetails(scoreWorkId)
							.then(response => {
								commit('UPDATE_NEW_ORDER_WORK', response.data);
							});
						break;
					case 'deleted':
						commit('DELETE_ORDER_WORK', scoreWorkId);
						break;
					case 'updated':
						AppDataServ.getOrderWorkDetails(scoreWorkId)
							.then(response => {
								commit('UPDATE_ORDER_WORK', response.data);
							});
				}
			},

			updateOrderWorkFinished(state, data) {
				return AppDataServ.updateOrderWorkFinished(data.workId, data.params)
					.catch(error => {
						throw(error);
					});
			},

			updateOrderWorkParticipant(state, data) {
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
