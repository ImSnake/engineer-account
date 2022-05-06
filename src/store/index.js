import AppDataServ from "@/services/AppDataServ";
import { createStore } from 'vuex';
import {
  prepareCustomer,
  prepareFilterDepartments,
  prepareOrder,
  prepareScoreServices,
  prepareWorkItem
} from "@/helpers/data_conversion";

export default createStore({
  modules: {

    static: {
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

/*        fetchHeaderIcons({ commit }) {
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
        }
     }
    },

    homePage: {
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
          state.headerIcons.case = orders.filter(el => +el.TroubleStatusID === 2).length;
          state.headerIcons.clock = orders.filter(el => el.overdueSummary < 0,24).length;
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
    },

    orderPage: {
      namespaced: true,

      state: () => ({
        order: {},

        works: [],

        files: {
          act: [],
          blanc: [],
          doc: []
        }
      }),

      mutations: {
        SET_ORDER_DETAILS(state, data) {
          state.order.details = data[0];
          state.order.readyState = true;
        },

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

        SET_CUSTOMER_INFO(state, data) {
          state.order.customerInfo = prepareCustomer(data);
          state.order.customerInfo.UBN = state.order.details.CustomerUBN;
          state.order.customerInfo.readyState = true;
        },

        SET_HYDRA_INTERNET_SERVICES(state, data) {
          state.order.servicesHydra.find(el => el.name === "Интернет").tariffList = data.avaliableServices;
          state.order.servicesHydra.find(el => el.name === "Интернет").baseContractHydraId = data.baseContractHydraId;
        },

        SET_HYDRA_SERVICES(state, data) {
          state.order.servicesHydra = data;
        },

        SET_SD_SERVICES(state, data) {
          state.order.servicesSD = data;
        },

        SET_INTERNET_CONNECTION(state, data) {
          console.log(state.works.find(({ScoreWorkID}) => +ScoreWorkID === +data.work.ScoreWorkID));
          console.log(data);
        },

        UPDATE_CUSTOMER_INFO(state, data) {
          console.log(data);
          console.log(state);
        },

        UPDATE_FILES(state, data) {
          const item = {
            name: data.file.name,
            size: data.file.size,
            date: new Date(),
            loading: true,
            loaded: false
          }
          setInterval(() => item.loaded = true, 1000);
          state.files[data.type].push(item);
        },

        UPDATE_ORDER_MEETING(state, status) {
          state.order.details.meetingStatusId = status;
        }
      },

      actions: {
        deleteOrderWork(state, workId) {
          return AppDataServ.deleteOrderWork(workId)
/*            .then(response => {
              commit('DELETE_ORDER_WORK', response.data);
            })*/
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

        fetchCustomerInfo({ commit }, customerId) {
          return AppDataServ.getCustomerInfo(customerId)
            .then(response => {
              commit('SET_CUSTOMER_INFO', response.data);
            })
            .catch(error => {
              throw(error);
            });
        },

        fetchHydraServices({ commit }, /*dealId*/) {
          const data = [
            {
              name: "Интернет",
              type: "Выбрать тип услуги",
              tariff: "Выбрать тарифный план",
              agreement: false,
              tariffList: [
/*                {
                  name: 'Выбрать тарифный план',
                  value: ''
                },
                {
                  name: 'ТП.ИНТ.Безлимитный 40',
                  price: '700'
                },
                {
                  name: 'ТП.ИНТ.Безлимитный 60',
                  price: '1000'
                },
                {
                  name: 'ТП.ИНТ.Безлимитный 100',
                  price: '1500'
                },
                {
                  name: 'ТП.Радиолинк 20',
                  price: '2200'
                }*/
              ],
              monthly: [
                {
                  name: 'IP-адрес',
                  price: '200'
                },
                {
                  name: 'Keenetic Lite',
                  price: '150'
                },
                {
                  name: 'Keenetic Start',
                  price: '150'
                },
                {
                  name: 'Keenetic Air',
                  price: '200'
                }
              ],
/*              oneTime: [
                {
                  name: 'Keenetic Lite',
                  price: '2500'
                },
                {
                  name: 'Keenetic Start',
                  price: '2000'
                },
                {
                  name: 'Keenetic Air',
                  price: '4000'
                }
              ]*/
            },
            {
              name: "Телевидение",
              tariff: "ТП.ТВ.Комбо Люкс + AMEDIATEKA",
              agreement: false,
              tariffList: [{
                name: 'ТП.ТВ.Комбо Люкс + AMEDIATEKA',
                price: '700'
              }],
              monthly: [],
              oneTime: []
            }
          ];
          commit('SET_HYDRA_SERVICES', data);
          /* return AppDataServ.getHydraServices(dealId)
            .then(response => {
              console.log(response);
              commit('SET_HYDRA_SERVICES', response.data);

            })
            .catch(error => {
              throw(error);
            });*/
        },

        fetchSDServices({ commit }, dealId) {
          return AppDataServ.getSDServices(dealId)
            .then(response => {
              commit('SET_SD_SERVICES', response.data);
            })
            .catch(error => {
              throw(error);
            });
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

        setInternetConnection({ commit }, params) {
          return AppDataServ.setInternetConnection(params)
            .then(response => {
              console.log(response);
              commit('SET_INTERNET_CONNECTION', response.data);
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

        updateCustomerInfo({ commit }, customerData) {
          return AppDataServ.updateCustomerInfo(customerData)
            .then(response => {
              commit('UPDATE_CUSTOMER_INFO', response.data);
            })
            .catch(error => {
              throw(error);
            });
        },

        updateMeetingDateTime({commit}, params) {
          return AppDataServ.updateMeetingDateTime(params)
            .then(response => {
              if (!response.data === 1) {
                commit('UPDATE_ORDER_MEETING', params.status - 1);
              }
            })
            .catch(error => {
              throw(error);
            });
        },

        updateOrderWorkFinished(state, data) {
          return AppDataServ.updateOrderWorkFinished(data.workId, data.params)
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

        updateTypeServices({commit}, params) {
          return AppDataServ.updateTypeServices(params)
            .then(response => {
              commit('SET_HYDRA_INTERNET_SERVICES', response.data);
            })
            .catch(error => {
              throw(error);
            });
        }
      }
    }
  }
});
