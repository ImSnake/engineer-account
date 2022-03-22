import AppDataServ    from "@/services/AppDataServ";

import AuthService    from "@/services/AuthService";
import AppDataService from "@/services/AppDataService";

import { createStore } from 'vuex';
import { dateCalculateDifference } from "@/helpers/formating";


export default createStore({

  state: {

    order: {},

    orders: [],

    headerIcons: {
      case: 0,
      clock: 0
    }
  },

  mutations: {

    SET_ORDER_DETAILS(state, data) {
      state.order.details = data[0];
      state.order.readyState = true;
      console.log(state.order);

      //=============================================

      state.order.customerInfo = {
        customerId: "1234567",
          name: "Дмитрий",
          patronymic: "Вячеславович",
          surname: "Пустовит",
          birthdayDate: "01.01.1985",
          birthdayPlace: "гор. Волгоград",
          email: "pulikova.j@gmail.com",
          emailApproved: 2,
          mobile: "+7(963)99-96-440",
          mobileApproved: 1,
          passport: {
          series: "6509",
            number: "818214",
            issueDate: "08.09.2001",
            issueDepartment: "ОВД Свердловской области в городе Заречном",
            ufmsCode: "668-009",
            registrationAddress: "г. Заречный, ул. Курчатова, дом. 27, корпус 3, кв. 42"
        }
      };

      state.order.works =  [
        {
          workId: "123",
          startDate: "2022-03-15 12:00:00.000",
          finishDate: "2022-03-16 19:00:00.000",
          points: "420",
          participants: [
            {
              participantId: "123456",
              participantFIO: "Иванов Петр Федорович",
              participationStart: ""
            },
            {
              participantId: "123456",
              participantFIO: "Джигарханян Ильман Ахметович",
              participationStart: "2022-03-15 12:20:00.000"
            }
          ],
          workList: [
            {
              test: "test"
            },
            {
              test: "test"
            }
          ]
        }
      ];
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
      state.orders.readyState = true;

      //TODO Если нет заявок - передавать что-то, чтобы массив не был нулевым
    },

    UPDATE_ORDERS_LIST(state, data) {
      const order = data[0];
      order.MeetingDateTime = ""; //TODO Удалить строку на финальном этапе
      const diff = order.Deadline ? dateCalculateDifference(new Date(), new Date(order.Deadline)) : dateCalculateDifference();
      order.overdueTitle = diff.title;
      order.overdueSummary = diff.summary;
      order.showInList = {
        byNumber: true,
        byPriority: true,
        byRole: true,
        byStatus: true,
        byDepartment: true,
      }
      state.orders.push(data[0]);
      //console.log(data[0]);
      //console.log(state.orders);
    },

    UPDATE_ORDER_MEETING(state, data) {
      state.order.details.MeetingDateTime = data;
    },

    UPDATE_ORDERS_MEETING(state, data) {
      state.orders.find(order => +order.OrderID === +data.OrderID).MeetingDateTime = data.date;
    },

//=============================================

    /*TEST_ORDER_DATA(state, data) {
      state.order.customerInfo = data[0].customerInfo;
      state.order.works = data[0].works;
      state.order.readyState = true;
      console.log(state.order);
    },*/

  },

  actions: {
    fetchCustomerInfo(customerId) {
      console.log(customerId);
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
          console.log (orderId);
          commit('UPDATE_ORDERS_LIST', response.data);
        })
        .catch(error => {
          throw(error);
        });
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

    TESTFetchOrders({ commit }) {
      return AppDataService.getOrders()
        .then(response => {
          commit('SET_ORDERS', response.data);
        })
        .catch(error => {
          throw(error);
        });
    },

    /*TESTFetchOrderDetails({ commit }, orderId) {
      return AppDataService.getOrderData(orderId)
        .then(response => {
          commit('TEST_ORDER_DATA', response.data);
        })
        .catch(error => {
          throw(error);
        });
    },*/

  },

  modules: {

   static: {
     namespaced: true,

     state: () => ({

       user: {},

       filters: {
         department: [],
         priorities: [],
         roles: [],
         statuses: []
       },

       responsibleList: [],
     }),

     mutations: {
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

       AUTH_USER_FALSE(state) {
         state.user = {};
       },

       SET_FILTERS(state, data){
         let levels = [];
         let spaces = '';
         for (let a = 0; a <= +data.department.levelCount; a++) {
           levels.push({level: a, spaces: spaces});
           spaces += '&nbsp;&nbsp;&nbsp;&nbsp;';
         }
         data.department.list.forEach(el => {
           el.name = levels[+el.level].spaces + el.name;
           el.value = (+el.level === 0) ? 0 : el.departmentId;
         });
         data.department = data.department.list;
         state.filters = data;
         state.filters.readyState = true;

         localStorage.setItem('engineerAccountAppFilters',  JSON.stringify(state.filters));
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
             })
             .catch(error => {
               throw(error);
             });
         } else {
           commit('AUTH_USER_FALSE');
           console.log('AUTH ERROR');
         }
       },

       async fetchAuthUserToken({ commit }) {
         await AppDataServ.updateToken();
         await commit('APP_STATIC_UPDATE');
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

       fetchResponsible({ commit }, responsibleId) {
         return AppDataServ.getResponsibleDetails(responsibleId)
           .then(response => {
             commit('UPDATE_RESPONSIBLE', response.data);
           })
           .catch(error => {
             throw(error);
           });
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

       TESTFetchFilters({ commit }) {
         return AppDataService.getFilterData()
           .then(response => {
             commit('SET_FILTERS', response.data);
           })
           .catch(error => {
             throw(error);
           });
       },

       TESTFetchResponsible({ commit }, responsibleId) {
         return AppDataService.getResponsibleDetails(responsibleId)
           .then(response => {
             commit('UPDATE_RESPONSIBLE', response.data);
           })
           .catch(error => {
             throw(error);
           });
         },
    }
   },
  }
});
