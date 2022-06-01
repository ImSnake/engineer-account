import AppDataServ from "@/services/AppDataServ";
import { prepareFilterDepartments, prepareScoreServices } from "@/helpers/data_conversion";

export const ModuleStatic = () => {
	return {
		namespaced: true,

		state: () => ({
			currentPage: '',
			theme: 'elzTheme-dark',

			user: {},
			filters: {},
			hydraInternetTypes: [],
			responsibleList: [],
			visitStatuses: [],
			scoreServices: [],
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

				const filters = localStorage.getItem('engineerAccountAppFilters');
				state.filters = JSON.parse(filters);
			},

			SET_CURRENT_PAGE(state, path) {
				state.currentPage = path;
			},

			SET_FILTERS(state, data){
				data.department = prepareFilterDepartments(data.department);
				state.filters = data;
				state.filters.readyState = true;

				localStorage.setItem('engineerAccountAppFilters',  JSON.stringify(state.filters));
			},

			/*        SET_HEADER_ICONS(state, data) {
								console.log(state);
								console.log(data);
							},*/

			SET_HYDRA_INTERNET_TYPES(state, data) {
				state.hydraInternetTypes = data.map(({VALUE, NAME}) => ({value: VALUE, name: NAME}));
				state.hydraInternetTypes.unshift({
					value: '',
					name: 'Выбрать тип услуги'
				})
			},

			SET_VISIT_STATUSES(state, data) {
				state.visitStatuses = data;
			},

			SET_SCORE_SERVICES(state, data) {
				state.scoreServicesRaw = data.services;
				state.scoreServices = prepareScoreServices(data);
				state.workStatuses = data.workStatuses;
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
				commit('APP_STATIC_UPDATE');
				AppDataServ.updateToken();
				console.log('USER TOKEN WAS UPDATED');
			},

			fetchFilters({ commit }) {
				return AppDataServ.getFilterData()
					.then(response => {
						commit('SET_FILTERS', response.data);
					})
					.catch(error => {
						throw(error);
					});
			},

			fetchHydraInternetTypes({ commit }) {
				return AppDataServ.getHydraInternetTypes()
					.then(response => {
						commit('SET_HYDRA_INTERNET_TYPES', response.data);
					})
					.catch(error => {
						throw(error);
					});
			},

			/*fetchHeaderIcons({ commit }) {
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

			fetchVisitStatuses({commit}) {
				return AppDataServ.getVisitStatuses()
					.then(response => {
						commit('SET_VISIT_STATUSES', response.data);
					})
					.catch(error => {
						throw(error);
					});
			},

			fetchScoreServices({commit}) {
				return AppDataServ.getScoreServices()
					.then(response => {
						commit('SET_SCORE_SERVICES', response.data);
					})
					.catch(error => {
						throw(error);
					});
			},
		}
	}
}
