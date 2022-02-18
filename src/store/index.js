import { createStore } from 'vuex';
import AuthService from "@/services/AuthService";
import AppDataService from "@/services/AppDataService";
import {dateCalculateDifference} from "@/helpers/formating";

export default createStore({
  state: {
    filters: {
      departments: [],
      priorities: [],
      roles: [],
      statuses: []
    },
    headerIcons: {
      case: 0,
      clock: 0
    },
    orders: [],
    responsibleList: [],
    user: {
      isAuthorized: false
    }
  },

  mutations: {
    AUTH_USER_TRUE(state, data) {
      state.user = data;
			state.user.isAuthorized = true;
    },

    AUTH_USER_FALSE(state) {
      state.user = {};
    },

    SET_FILTERS(state, data){
      state.filters = data;
    },

    SET_ORDERS(state, data) {
      state.orders = data;
      state.orders.forEach(order => {
        const diff = order.Deadline ? dateCalculateDifference(new Date(), new Date(order.Deadline)) : dateCalculateDifference();
        order.overdueTitle = diff.title;
        order.overdueSummary = diff.summary;
        order.showInList = {
          byNumber: true,
          byPriority: true,
          byRole: true,
          byStatus: true,
          byDepartment: true,
        };
      });
      state.headerIcons.case  = state.orders.filter(el => +el.TroubleStatusID === 2).length;
      state.headerIcons.clock = state.orders.filter(el => el.overdueSummary < 0,24).length;

      //TODO Если нет заявок - передавать что-то, чтобы массив не был нулевым

    },

    UPDATE_MEETING_DATE_TIME(state, data) {
      //state.orders.find(el => el.OrderID = data.OrderID)
      console.log(state.orders.find(el => el.OrderID === data.OrderID));
      console.log(data.date);
    },

    UPDATE_RESPONSIBLE(state, data) {
      state.responsibleList.push(data[0]);
    }
  },

  actions: {
    fetchAuthUser({ commit }, params) {
      if (params.login && params.password) {

        //TODO добавить проверку авторизации

        return AuthService.authUser()
          .then(response => {
            commit('AUTH_USER_TRUE', response.data);
            console.log('AUTH SUCCESSFUL');
						console.log(this.state.user);
          })
          .catch(error => {
            throw(error);
          });
      } else {
        commit('AUTH_USER_FALSE');
				console.log('AUTH ERROR');
      }
    },

    fetchAppFilters({ commit }) {
      return AppDataService.getFilterData()
        .then(response => {
          commit('SET_FILTERS', response.data);
        })
        .catch(error => {
          throw(error);
        });
    },

    fetchOrders({ commit }, userId) {
      return AppDataService.getOrdersByParams(userId)
        .then(response => {
          commit('SET_ORDERS', response.data);
        })
        .catch(error => {
          throw(error);
        });
    },

    fetchResponsible({ commit }, responsibleId) {
      return AppDataService.getResponsibleDetails(responsibleId)
        .then(response => {
          commit('UPDATE_RESPONSIBLE', response.data);
        })
        .catch(error => {
          throw(error);
        });
    },

    updateMeetingDateTime({commit}, params) {
      //TODO передача данных по API в tts
      console.log(params);
      commit('UPDATE_MEETING_DATE_TIME', params);
    }
  },

  modules: {
  }
});
