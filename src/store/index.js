import AppDataServ from "@/services/AppDataServ";
import { createStore } from 'vuex';
import { prepareOrder } from "@/helpers/data_conversion";
import { dateFormatDdMmYyyy } from "@/helpers/formating";

export default createStore({
  modules: {

    static: {
      namespaced: true,

      state: () => ({
        user: {},
        filters: {},
        hydraInternetTypes: [],
        responsibleList: [],
        visitStatuses: [],
        scoreServices: []
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

        SET_FILTERS(state, data){
          const departments = data.department.list;
          let levels = [];
          let spaces = '';

          for (let a = 0; a <= +data.department.levelCount; a++) {
            levels.push({level: a, spaces: spaces});
            spaces += '&nbsp;&nbsp;&nbsp;&nbsp;';
          }

          departments.forEach(i => {
            i.name = levels[+i.level].spaces + i.name;
            i.value = (+i.level === 0) ? 0 : i.departmentId;
          });

          data.department = departments;
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
          const servicesDict = data.services;
          const serviceCategories = data.serviceCategories;
          const servicesMap = {};
          let services = [];

          servicesDict.forEach(({ScoreServiceCategoryID, ScoreServiceID, ServiceTitle, ServiceScore}) => {
            (servicesMap[ScoreServiceCategoryID] = (servicesMap[ScoreServiceCategoryID] || [])).push({
              id: ScoreServiceID,
              name: ServiceTitle,
              value: ServiceScore
            });
          });

          serviceCategories.forEach(({ScoreServiceCategoryID, CategoryTitle}) => {
            services.push({
              categoryId: ScoreServiceCategoryID,
              name: CategoryTitle,
              list: servicesMap[ScoreServiceCategoryID] || []
            });
          });

          state.scoreServices = services;

          state.workStatuses = data.map(({ScoreWorkStatusID, StatusTitle}) => ({id: ScoreWorkStatusID, name: StatusTitle}));
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
            state.orders.push(prepareOrder(order));
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
          console.log(state, data);
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

        fetchOrderWorks({ commit }, params) {

          const works = [
              {
                workId: "123",
                startDate: "2022-03-15 12:00:00.000",
                finishDate: "",
                workStatus: 2,
                participants: [
                  {
                    participantId: "3337",
                    participationStart: "2022-03-15 12:20:00.000"
                  }
                ],
                workList: [
                  {
                    id: "12",
                    count: 1
                  },
                  {
                    id: "40",
                    count: 10
                  }
                ]
              },
              {
                workId: "124",
                startDate: "",
                finishDate: "",
                workStatus: 1,
                participants: [
                  {
                    participantId: "3337",
                    participationStart: "2022-03-15 12:20:00.000"
                  },
                  {
                    participantId: "3310",
                    participationStart: "2022-04-21 12:20:00.000"
                  }
                ],
                workList: [
                  {
                    id: "13",
                    count: 2
                  },
                  {
                    id: "37",
                    count: 10
                  },
                  {
                    id: "41",
                    count: 2
                  },
                  {
                    id: "45",
                    count: 1
                  }
                ]
              }
            ];


          return AppDataServ.getOrderWorks(params)
            .then(response => {
              console.log(response.data);
              commit('SET_ORDER_WORKS', works);
              //commit('SET_ORDER_DETAILS', response.data);
            })
            .catch(error => {
              throw(error);
            });
        },

        setInternetConnection({ commit }, params) {
          console.log(params);
          return AppDataServ.setInternetConnection(params)
            .then(response => {
              commit('SET_INTERNET_CONNECTION', response.data);
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
