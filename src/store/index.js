import AppDataServ    from "@/services/AppDataServ";
import { createStore } from 'vuex';
import {dateCalculateDifference, dateFormatDdMmYyyy} from "@/helpers/formating";

export default createStore({
  modules: {

    static: {
      namespaced: true,

      state: () => ({
        user: {},
        filters: {},
        responsibleList: [],
        visitStatuses: [],
        hydraInternetTypes: []
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
/*          const visitStatuses = [
            {
              OrderVisitStatusID: '1',
              StatusOrder: '1',
              StatusTitle: 'Согласование времени',
            },
            {
              OrderVisitStatusID: '2',
              StatusOrder: '2',
              StatusTitle: 'Ожидание выезда',
            },
            {
              OrderVisitStatusID: '3',
              StatusOrder: '3',
              StatusTitle: 'Сотрудник в пути',
            },
            {
              OrderVisitStatusID: '4',
              StatusOrder: '4',
              StatusTitle: 'Сотрудник прибыл',
            }
          ];
          commit('SET_VISIT_STATUSES', visitStatuses);*/
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
              byType: true
            };
          });
          state.headerIcons.case  = state.orders.filter(el => +el.TroubleStatusID === 2).length;
          state.headerIcons.clock = state.orders.filter(el => el.overdueSummary < 0,24).length;
          state.readyState = true;

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
              console.log (orderId);
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
        order: {
          onPlaceDateTime: '',
          onWayDateTime: ''
        },

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
          //=============================================

          state.works =  [
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

          state.order.readyState = true;
        },

        SET_CUSTOMER_INFO(state, data) {
          if (data.birthdayDate) {
            data.birthdayDate = dateFormatDdMmYyyy(data.birthdayDate);
          }
          if (data.issueDate) {
            data.issueDate = dateFormatDdMmYyyy(data.issueDate);
          }
          if (data.passportDetails) {
            const pass = data.passportDetails.split(' ');
            data.passportSeries = pass[0];
            data.passportNumber = pass[1];
          } else {
            data.passportSeries = '';
            data.passportNumber = '';
          }
          state.order.customerInfo = data;
          state.order.customerInfo.readyState = true;
        },

        SET_HYDRA_INTERNET_SERVICES(state, data) {
          console.log(state.order.servicesHydra.find(el => el.name === "Интернет"));
          console.log(data);
          //state.order.servicesHydra.find(el => el.name === "Интернет")
          state.order.servicesHydra.find(el => el.name === "Интернет").tariffList = data;
        },

        SET_HYDRA_SERVICES(state, data) {
          state.order.servicesHydra = data;
        },

        SET_SD_SERVICES(state, data) {
          state.order.servicesSD = data;
        },

        UPDATE_CUSTOMER_INFO(state, data) {
          console.log(data);
          console.log(state);
        },

        UPDATE_FILES(state, data) {
          console.log(data);

          const item = {
            name: data.file.name,
            size: data.file.size,
            date: new Date(),
            loading: true,
            loaded: false
          }

          setInterval(() => item.loaded = true, 1000);

          state.files[data.type].push(item);
          console.log(state.files);
        },

        UPDATE_ORDER_MEETING(state, status) {
          state.order.details.meetingStatusId = status;
        },
      },

      actions: {
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
