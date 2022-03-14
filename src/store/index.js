import AppDataServ    from "@/services/AppDataServ";

import AuthService    from "@/services/AuthService";
import AppDataService from "@/services/AppDataService";

import { createStore } from 'vuex';
import { dateCalculateDifference } from "@/helpers/formating";


export default createStore({
  state: {

    user: {
      isAuthorized: false
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

    orderData: {}
  },

  mutations: {
    AUTH_USER_TRUE(state, data) {
      state.user = data.userData;
			state.user.isAuthorized = true;
    },

    AUTH_USER_FALSE(state) {
      state.user = {};
    },

    SET_FILTERS(state, data){
      state.filters = data;
      state.filters.readyState = true;
    },

    SET_ORDER_DATA(state, data) {
      state.orderData = data[0];
      state.orderData.readyState = true;
    },

    SET_ORDERS(state, data) {
      console.log('SAVE ORDERS LIST');
      console.log(data);
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
      state.orders.readyState = true;

      //TODO Если нет заявок - передавать что-то, чтобы массив не был нулевым
    },

    UPDATE_ORDER_MEETING(state, data) {
      state.orderData.orderDetails.MeetingDateTime = data;
    },

    UPDATE_ORDERS_MEETING(state, data) {
      state.orders.find(order => +order.OrderID === +data.OrderID).MeetingDateTime = data.date;
    },

    UPDATE_RESPONSIBLE(state, data) {
      state.responsibleList.push(data[0]);
    }
  },

  actions: {
    fetchAuthUser({ commit }, params) {
      if (params.login && params.password) {
        return AppDataServ.authUser(params)
          .then(response => {
            commit('AUTH_USER_TRUE', response.data);
            console.log('AUTH SUCCESSFUL');
						console.log(this.state);
          })
          .catch(error => {
            throw(error);
          });
      } else {
        commit('AUTH_USER_FALSE');
				console.log('AUTH ERROR');
      }
    },

    fetchFilters({ commit }) {
      return AppDataService.getFilterData()
        .then(response => {
          commit('SET_FILTERS', response.data);
        })
        .catch(error => {
          throw(error);
        });
    },

    fetchOrders({ commit }, token) {
      return AppDataServ.getOrders(token)
        .then(response => {
          commit('SET_ORDERS', response.data);
        })
        .catch(error => {
          throw(error);
        });
    },

    fetchOrderData({ commit }, orderId) {
      return AppDataService.getOrderData(orderId)
        .then(response => {
          commit('SET_ORDER_DATA', response.data);
        })
        .catch(error => {
          throw(error);
        });
    },

    fetchResponsible({ commit }, responsibleId) {
      return AppDataServ.getResponsibleDetails(responsibleId)
        .then(response => {
          commit('UPDATE_RESPONSIBLE', response.data);
        })
        .catch(error => {
          throw(error);
        });
      /*return AppDataService.getResponsibleDetails(responsibleId)
        .then(response => {
          commit('UPDATE_RESPONSIBLE', response.data);
        })
        .catch(error => {
          throw(error);
        });*/
    },

    updateOrderMeetingDateTime({commit}, date) {
      commit('UPDATE_ORDER_MEETING', date);
      //TODO сначала передача данных по API в tts, после апрува - обновление данных в state
      /*return AppDataService.updateMeetingDateTime(date)
        .then(response => {
          console.log(response);
          commit('UPDATE_ORDER_MEETING', date);
        })
        .catch(error => {
          throw(error);
        });*/
    },

    updateOrdersMeetingDateTime({commit}, params) {
      commit('UPDATE_ORDERS_MEETING', params);
      //TODO сначала передача данных по API в tts, после апрува - обновление данных в state
      /*return AppDataService.updateMeetingDateTime(params)
        .then(response => {
          console.log(response);
          commit('UPDATE_ORDERS_MEETING', params);
        })
        .catch(error => {
          throw(error);
        });*/
    },


//=========================================================

    TESTFetchAuthUser({ commit }, params) {
      if (params.login && params.password) {
        return AuthService.authUser()
          .then(response => {
            commit('AUTH_USER_TRUE', response.data);
          });
      }
    },

    TESTFetchOrders({ commit }, userId) {
      return AppDataService.getOrders(userId)
        .then(response => {
          commit('SET_ORDERS', response.data);
        })
        .catch(error => {
          throw(error);
        });
    },
  },

  modules: {}

});
