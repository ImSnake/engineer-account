import AppDataServ from "@/services/AppDataServ";
import { prepareFilterDepartments, prepareScoreServices } from "@/helpers/data_conversion";

export const ModuleStatic = () => {
	return {
		namespaced: true,

		state: () => ({
			theme: 'elzTheme-dark',

			headerIcons: {
				case: 0,
				clock: 0
			},

			user: {},

			filters: {},

			responsibleList: [],

			visitStatuses: [],

			scoreServices: [],

			hydraServicesTypes: [],
		}),

		mutations: {
			AUTH_USER_FALSE(state, comment) {
				state.user = {};
				state.user.error = comment
			},

			AUTH_USER_TRUE(state, data) {
				state.user = data.userData;
				localStorage.setItem('engineerAccountAppToken', data.token);
				localStorage.setItem('engineerAccountAppUserData',  JSON.stringify(data.userData));
			},

			APP_STATIC_UPDATE(state) {
				const userData = localStorage.getItem('engineerAccountAppUserData');
				state.user = JSON.parse(userData);
			},

			STATE_CLEAR(state) {
				state.user = {};
				state.filters = {};
				state.responsibleList = [];
				state.visitStatuses = [];
				state.scoreServices = [];
				state.hydraServiceTypes = [];

				/*
				localStorage.removeItem('engineerAccountAppWorkStatuses');
				localStorage.removeItem('engineerAccountAppScoreServices');
				localStorage.removeItem('engineerAccountAppScoreServicesRaw');
				localStorage.removeItem('engineerAccountAppVisitStatuses');
				localStorage.removeItem('engineerAccountAppHydraServicesTypes');
				localStorage.removeItem('engineerAccountAppUserData');
				localStorage.removeItem('engineerAccountAppFilters');
				localStorage.removeItem('engineerAccountAppToken');
				*/
			},

			STATE_SET(state) {
				state.theme = localStorage.getItem('engineerAccountAppThemeSettings');

				if (!state.theme) {
					localStorage.setItem('engineerAccountAppThemeSettings', 'elzTheme-dark');
					state.theme = 'elzTheme-dark';
				}
			},

			SET_FILTERS(state, data){
				data.department = prepareFilterDepartments(data.department);

				// priority 4 (низкий) = 0 (по TTS)
				data.priorities[0].value = '0';
				data.priorities[1].value = '4';

				state.filters = data;
				state.filters.readyState = true;

				localStorage.setItem('engineerAccountAppFilters',  JSON.stringify(state.filters));
			},

      /*SET_HEADER_ICONS(state, data) {
				console.log(state);
				console.log(data);
			},*/

			SET_HYDRA_SERVICES_TYPES(state, data) {
				const list = [];

				data.forEach(el => {
					const t = {
						typeOfService: el.typeOfService
					}
					t.list = el.list.map(({VALUE, NAME}) => ({value: VALUE, name: NAME}));
					t.list.unshift({
						value: '',
						name: +el.typeOfService === 1 ? 'Выбрать тарифную зону' : 'Выбрать тип услуги'
					});
					list.push(t);
				});

				state.hydraServicesTypes = list;

				localStorage.setItem('engineerAccountAppHydraServicesTypes', JSON.stringify(list));
			},

			SET_THEME(state, theme) {
				state.theme = theme;
				localStorage.setItem('engineerAccountAppThemeSettings', theme.class);
			},

			SET_VISIT_STATUSES(state, data) {
				state.visitStatuses = data;
				localStorage.setItem('engineerAccountAppVisitStatuses',  JSON.stringify(state.visitStatuses));
			},

			SET_SCORE_SERVICES(state, data) {
				state.scoreServicesRaw = data.services;
				state.scoreServices = prepareScoreServices(data);
				state.workStatuses = data.workStatuses;

				localStorage.setItem('engineerAccountAppScoreServicesRaw', JSON.stringify(state.scoreServicesRaw));
				localStorage.setItem('engineerAccountAppScoreServices', JSON.stringify(state.scoreServices));
				localStorage.setItem('engineerAccountAppWorkStatuses', JSON.stringify(data.workStatuses));
			},

			UPDATE_RESPONSIBLE(state, data) {
				state.responsibleList.push(data[0]);
			},
		},

		actions: {
			fetchAuthUser({ commit }, params) {
				if (params.login && params.password) {
					return AppDataServ.authUser(params)
						.then(response => {
							if (response.userData) {
								commit('AUTH_USER_TRUE', response);
							} else if (+response.status === 401) {
								commit('AUTH_USER_FALSE', 'Неверный логин или пароль');
							} else {
								commit('AUTH_USER_FALSE', 'Ошибка подключения к удаленному серверу');
							}
						});
				} else {
					commit('AUTH_USER_FALSE', 'Данные для авторизации не заполнены');
				}
			},

			fetchAuthUserToken({ commit }) {
				if (localStorage.engineerAccountAppToken && localStorage.engineerAccountAppUserData) {
					console.log('USER HAS TOKEN!');

					commit('APP_STATIC_UPDATE');

					AppDataServ.updateToken(localStorage.engineerAccountAppToken);

					console.log('USER TOKEN WAS UPDATED');
				}
			},

			fetchFilters({ commit, state }) {
				const f = localStorage.getItem('engineerAccountAppFilters');
				state.filters = JSON.parse(f) || [];

				if(!state.filters.length) {
					return AppDataServ.getFilterData()
						.then(response => {
							commit('SET_FILTERS', response.data);
						})
						.catch(error => {
							throw(error);
						});
				}
			},

			fetchHydraServicesTypes({ commit, state }) {
				const hst = localStorage.getItem('engineerAccountAppHydraServicesTypes');
				state.hydraServicesTypes = JSON.parse(hst) || [];

				if (!state.hydraServicesTypes.length) {
					return AppDataServ.getHydraServicesTypes()
						.then(response => {
							commit('SET_HYDRA_SERVICES_TYPES', response.data);
						})
						.catch(error => {
							throw(error);
						});
				}
			},

/*			fetchHeaderIcons({ commit }) {
				return AppDataServ.getHeaderIcons()
					.then(response => {
						commit('SET_HEADER_ICONS', response.data);
					})
					.catch(error => {
						throw(error);
					});
			},*/

			fetchResponsible({ commit }, responsibleId) {
				return AppDataServ.getResponsibleDetails(responsibleId)
					.then(response => {
						commit('UPDATE_RESPONSIBLE', response.data);
					})
					.catch(error => {
						throw(error);
					});
			},

			fetchVisitStatuses({ commit, state }) {
				const vs = localStorage.getItem('engineerAccountAppVisitStatuses');
				state.visitStatuses = JSON.parse(vs) || [];

				if (!state.visitStatuses.length) {
					return AppDataServ.getVisitStatuses()
						.then(response => {
							commit('SET_VISIT_STATUSES', response.data);
						})
						.catch(error => {
							throw(error);
						});
				}
			},

			fetchScoreServices({ commit, state }) {
				if (localStorage.engineerAccountAppScoreServicesRaw && localStorage.engineerAccountAppScoreServices && localStorage.engineerAccountAppWorkStatuses) {
					const ssr = localStorage.getItem('engineerAccountAppScoreServicesRaw');
					const ss = localStorage.getItem('engineerAccountAppScoreServices');
					const ws = localStorage.getItem('engineerAccountAppWorkStatuses');

					state.scoreServicesRaw = JSON.parse(ssr) || [];
					state.scoreServices = JSON.parse(ss) || [];
					state.workStatuses = JSON.parse(ws) || [];
				} else {
					return AppDataServ.getScoreServices()
						.then(response => {
							commit('SET_SCORE_SERVICES', response.data);
						})
						.catch(error => {
							throw(error);
						});
				}
			},
		},

		getters: {}
	}
}
