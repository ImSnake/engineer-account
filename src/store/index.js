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
        hydraInternetTypes: [],
        responsibleList: [],
        visitStatuses: [],
        workServices: []
      }),

      mutations: {
        AUTH_USER_FALSE(state) {
          state.user = {};
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

        SET_WORK_SERVICES(state, data) {
          state.workServices = data;
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

        fetchWorkServices({commit}) {
          const workServices = [
            {
              categoryId: '2',
              name: 'Категория Подключения',
              list: [
                {
                  id: "6",
                  name: "Выполнение проработки",
                  sum: 0.5
                },
                {
                  id: "7",
                  name: "Выполнение подключения (Физические лица или юридические лица на объектах с развитой инфраструктурой)",
                  sum: 1
                },
                {
                  id: "8",
                  name: "Выполнение подключения без проработки  (Физические лица или юридические лица на объектах с развитой инфраструктурой)",
                  sum: 1.5
                },
                {
                  id: "9",
                  name: "Монтаж\\демонтаж оборудования по отдельной заявке",
                  sum: 1
                },
                {
                  id: "10",
                  name: "Мелокие работы по отдельным заявкам (установка розетки, удлинение кабеля, настройка роутера или ПК у клиента, настройка регистратора СВН и т.п.)",
                  sum: 0.5
                },
                {
                  id: "11",
                  name: "Монтаж кабеля внутри помещения, по лоткам либо подвязка к существующей трассе (UTP, ВОК, ЭП) (100 метров)",
                  sum: 1
                },
                {
                  id: "12",
                  name: "Укладка кабеля в гофру или кабель-канал (за 100 метров)",
                  sum: 1.2
                },
                {
                  id: "13",
                  name: "Монтаж кабеля в кабельной канализации, подвес кабеля к тросу (UTP, ВОК, ЭП), подвес кабеля на опоры с монтажем крюков на опоры (за 100 метров)",
                  sum: 1.5,
                },
                {
                  id: "14",
                  name: "Монтаж кабель каналов до 100 мм (за 20 метров)",
                  sum: 1
                }
              ]
            },
            {
              categoryId: '3',
              name: 'Категория Эксплуатация\n',
              list: [
                {
                  id: "34",
                  name: "Монтаж кабеля внутри помещения, по лоткам либо подвязка к существующей трассе (UTP, ВОК, ЭП) (за 100 метров)",
                  sum: 1
                },
                {
                  id: "35",
                  name: "Укладка кабеля в гофру или кабель-канал (за 100 метров)",
                  sum: 1.2
                },
                {
                  id: "36",
                  name: "Монтаж кабеля в кабельной канализации, подвес кабеля к тросу (UTP, ВОК, ЭП), подвес кабеля на опоры с монтажем крюков на опоры (за 100 метров)",
                  sum: 1.5
                },
                {
                  id: "37",
                  name: "Монтаж кабель каналов до 100 мм (за 20 метров)",
                  sum: 1
                },
                {
                  id: "38",
                  name: "Монтаж лотков ( со шпильками) (за 20 метров)",
                  sum: 2
                },
                {
                  id: "39",
                  name: "Разделка муфты или кросса (за один кабельный ввод)",
                  sum: 0.5
                },
                {
                  id: "40",
                  name: "Разварка волокон (за 1 волокно)",
                  sum: 0.1
                },
                {
                  id: "41",
                  name: "Расшивка патч-панели, каждый 1 порта",
                  sum: 0.05
                },
                {
                  id: "42",
                  name: "Монтаж LTE комплекта под ключ (1 комплект)",
                  sum: 1.5
                }
              ]
            },
            {
              id: '4',
              name: 'Категория Проекты',
              list: [
                {
                  serviceId: "2",
                  name: "Тестовая услуга для проверки вывода данных",
                  sum: 10.29
                }
              ]
            }
          ];
          commit('SET_WORK_SERVICES', workServices);
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

        fetchOrderWorks({ commit }/*, orderId*/) {
          const works = [
              {
                workId: "123",
                startDate: "2022-03-15 12:00:00.000",
                finishDate: "",
                points: 20.5,
                workStatus: 1,
                participants: [
                  {
                    participantId: "3337",
                    participationStart: "2022-03-15 12:20:00.000"
                  }
                ],
                workList: [
                  {
                    workId: "12",
                    count: 1
                  },
                  {
                    workId: "40",
                    count: 10
                  }
                ]
              }
            ];
          commit('SET_ORDER_WORKS', works);
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
