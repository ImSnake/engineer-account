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

    FILTERS_SET(state, data){
      state.filters = data;
    },

    ORDERS_SET(state, data) {
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
    },

    RESPONSIBLE_PUSH(state, data) {
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
          commit('FILTERS_SET', response.data);
        })
        .catch(error => {
          throw(error);
        });
    },

    fetchOrders({ commit }, params) {
      return AppDataService.getOrdersByParams(params)
        .then(response => {
          commit('ORDERS_SET', response.data);
        })
        .catch(error => {
          throw(error);
        });
    },

    fetchResponsible({ commit }, responsibleId) {
      return AppDataService.getResponsibleDetails(responsibleId)
        .then(response => {
          commit('RESPONSIBLE_PUSH', response.data);
        })
        .catch(error => {
          throw(error);
        });
    }
  },

  modules: {
  }
});
