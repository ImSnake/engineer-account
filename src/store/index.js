import { createStore } from 'vuex';
import AuthService from "@/services/AuthService";
import AppDataService from "@/services/AppDataService";
import {dateCalculateDifference} from "@/helpers/formating";

export default createStore({
  state: {
    user: {
      isAuthorized: false
    },

    readyState: {
      orders: false,
      filters: false,
    },

    filters: {
      departments: [],
      priorities: [],
      roles: [],
      statuses: []
    },

    orders: [],

    headerIcons: {
      case: 0,
      clock: 0
    },

    responsibleList: [],

    customerData: {},
  },

  mutations: {
    AUTH_USER_TRUE(state, data) {
      state.user = data;
			state.user.isAuthorized = true;
    },

    AUTH_USER_FALSE(state) {
      state.user = {};
    },

    SET_CUSTOMER_DATA(state, data) {
      state.customerData = data[0];
    },

    SET_FILTERS(state, data){
      state.filters = data;
      state.readyState.filters = true;
    },

    SET_ORDERS(state, data) {
      console.log('SET ORDERS');
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
      state.readyState.orders = true;

      //TODO Если нет заявок - передавать что-то, чтобы массив не был нулевым
    },

    UPDATE_MEETING_DATE_TIME(state, data) {
      console.log('UPDATE MEETING DATE TIME');
      state.orders.find(order => +order.OrderID === +data.OrderID).MeetingDateTime = data.date;
      console.log(state.orders.find(order => +order.OrderID === +data.OrderID));
    },

    UPDATE_RESPONSIBLE(state, data) {
      console.log('UPDATE RESPONSIBLE');
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

    fetchCustomerData({ commit }, customerId) {
      console.log('fetch Customer Data');
      return AppDataService.getCustomerData(customerId)
        .then(response => {
          commit('SET_CUSTOMER_DATA', response.data);
        })
        .catch(error => {
          throw(error);
        });
    },

    fetchFilters({ commit }) {
      console.log('fetch Filters');
      return AppDataService.getFilterData()
        .then(response => {
          commit('SET_FILTERS', response.data);
        })
        .catch(error => {
          throw(error);
        });
    },

    fetchOrders({ commit }, userId) {
      return AppDataService.getOrders(userId)
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
      //TODO сначала передача данных по API в tts, после апрува - обновление данных в state
      console.log('update Meeting Date Time');
      commit('UPDATE_MEETING_DATE_TIME', params);
    }
  },

  modules: {}

});
