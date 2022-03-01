<template>

  <div @input="defineSendButtonState" class="elz d-block">
    <div class="elz d-block mT48">
      <div class="elz cnnInfoCaption d-block bold pV8 mB16 fn18 borB1 br br-primary brL-10 brLInvD">Паспортные данные</div>
      <div class="elz cnnInfoGrid d-block mL-24">

        <div class="elz infoLine d-block mB32">
          <div class="elz infoTitle d-flex a-H hmn40 borB2 mL24 noShrink">
            <div class="elz d-block">Фамилия:</div>
          </div>
          <div class="elz d-block mL24">
            <label :class="{evNone: finalState}" class="elz d-grid grPos fn fnLInvD fn-primary-t fnL20 fnHovL10 fnFow-focus fnFowL0">
              <input v-model="user.surname" v-maska="_validation.word" type="text" placeholder="Иванов" class="elz d-block grPin grY2 w100p borB2 h40 ellipsis trns2 invPssSib br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0 fn fn-primary-t"/>
              <span class="elz d-flex grPin grY2 a-X borB2 evNone">
                <span class="elz p-rel growZ d-flex a-PR">
                  <span ref="surname" class="elz p-rel d-flex a-X s24 r2" :class="user.surname ? validationText(user.surname, 'classList') : ''">
                    <span :class="user.surname ? ' bgBef-CC' : ''" :style="user.surname ? validationText(user.surname, 'icon'): ''" class="elz p-rel d-block mskBef s16 cFillBef"></span>
                  </span>
                </span>
              </span>
              <span class="elz infoLabel d-block fn-8 trns2 invPssLing">Фамилия</span>
            </label>
          </div>
        </div>

        <div class="elz infoLine d-block mB32">
          <div class="elz infoTitle d-flex a-H hmn40 borB2 mL24 noShrink">
            <div class="elz d-block">Имя:</div>
          </div>
          <div class="elz d-block mL24">
            <label :class="{evNone: finalState}" class="elz d-grid grPos fn fnLInvD fn-primary-t fnL20 fnHovL10 fnFow-focus fnFowL0">
              <input v-model="user.name" v-maska="_validation.word" type="text" placeholder="Иван" class="elz d-block grPin grY2 w100p borB2 h40 pR32 ellipsis trns2 invPssSib br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0 fn fn-primary-t"/>
              <span class="elz d-flex grPin grY2 a-X borB2 evNone">
                <span class="elz p-rel growZ d-flex a-PR">
                  <span ref="name" :class="user.name ? validationText(user.name, 'classList') : ''" class="elz p-rel d-flex a-X s24 r2">
                    <span :class="user.name ? ' bgBef-CC' : ''" :style="user.name ? validationText(user.name, 'icon') : ''" class="elz p-rel d-block mskBef s16 cFillBef"></span>
                  </span>
                </span>
              </span>
              <span class="elz infoLabel d-block fn-8 trns2 invPssLing">Имя</span>
            </label>
          </div>
        </div>

        <div class="elz infoLine d-block mB32">
          <div class="elz infoTitle d-flex a-H hmn40 borB2 mL24 noShrink">
            <div class="elz d-block">Отчество:</div>
          </div>
          <div class="elz d-block mL24">
            <label :class="{evNone: finalState}" class="elz d-grid grPos fn fnLInvD fn-primary-t fnL20 fnHovL10 fnFow-focus fnFowL0">
              <input v-model="user.patronymic" type="text" placeholder="Иванович" class="elz d-block grPin grY2 w100p borB2 h40 pR32 ellipsis trns2 invPssSib br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0 fn fn-primary-t"/>
              <span class="elz d-flex grPin grY2 a-X borB2 evNone">
                <span class="elz p-rel growZ d-flex a-PR">
                  <span :class="user.patronymic ? _props.success.classList : ''" class="elz p-rel d-flex a-X s24 r2">
                    <span :class="user.patronymic ? ' bgBef-CC' : ''" :style="user.patronymic ? _props.success.icon : ''" class="elz p-rel d-block mskBef s16 cFillBef"></span>
                  </span>
                </span>
              </span>
              <span class="elz infoLabel d-block fn-8 trns2 invPssLing">Отчество</span>
            </label>
          </div>
        </div>

        <div class="elz infoLine d-block mB32">
          <div class="elz infoTitle d-flex a-H hmn40 borB2 mL24 noShrink">
            <div class="elz d-block">Дата рождения:</div>
          </div>
          <div class="elz d-block mL24">
            <label :class="{evNone: finalState}" class="elz d-grid grPos fn fnLInvD fn-primary-t fnL20 fnHovL10 fnFow-focus fnFowL0">
              <input v-model="user.birthdayDate" v-maska="'##.##.####'" type="text" placeholder="ДД.ММ.ГГГГ" class="elz d-block grPin grY2 w100p borB2 h40 pR32 ellipsis trns2 invPssSib br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0 fn fn-primary-t"/>
              <span class="elz d-flex grPin grY2 a-X borB2 evNone">
                <span class="elz p-rel growZ d-flex a-PR">
                  <span ref="birthdayDate" :class="user.birthdayDate ? validationDate(user.birthdayDate, 'classList') : ''" class="elz p-rel d-flex a-X s24 r2">
                    <span :class="user.birthdayDate ? ' bgBef-CC' : ''" :style="user.birthdayDate ? validationDate(user.birthdayDate, 'icon'): ''" class="elz p-rel d-block mskBef s16 cFillBef"></span>
                  </span>
                </span>
              </span>
              <span class="elz infoLabel d-block fn-8 trns2 invPssLing">Дата рождения</span>
            </label>
          </div>
        </div>

        <div class="elz infoLine d-block mB32">
          <div class="elz infoTitle d-flex a-H hmn40 borB2 mL24 noShrink">
            <div class="elz d-block">Место рождения:</div>
          </div>
          <div class="elz d-block mL24">
            <label :class="{evNone: finalState}" class="elz d-grid grPos fn fnLInvD fn-primary-t fnL20 fnHovL10 fnFow-focus fnFowL0">
              <input v-model="user.birthdayPlace" v-maska="_validation.text" placeholder="г. Москва" class="elz d-block grPin grY2 w100p borB2 h40 pR32 ellipsis trns2 invPssSib br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0 fn fn-primary-t"/>
              <span class="elz d-flex grPin grY2 a-X borB2 evNone">
                <span class="elz p-rel growZ d-flex a-PR">
                  <span ref="birthdayPlace" :class="user.birthdayPlace ? validationText(user.birthdayPlace, 'classList', 4) : ''" class="elz p-rel d-flex a-X s24 r2">
                    <span :class="user.birthdayPlace ? ' bgBef-CC' : ''" :style="user.birthdayPlace ? validationText(user.birthdayPlace, 'icon', 4) : ''" class="elz p-rel d-block mskBef s16 cFillBef"></span>
                  </span>
                </span>
              </span>
              <span class="elz infoLabel d-block fn-8 trns2 invPssLing">Место рождения</span>
            </label>
          </div>
        </div>

        <div class="elz infoLine d-block mB32">
          <div class="elz infoTitle d-flex a-H hmn40 borB2 mL24 noShrink">
            <div class="elz d-block">Серия:</div>
          </div>
          <div class="elz d-block">
            <div class="elz d-flex a-B">
              <div class="elz d-block grow mL24">
                <label :class="{evNone: finalState}" class="elz d-grid grPos fn fnLInvD fn-primary-t fnL20 fnHovL10 fnFow-focus fnFowL0">
                  <input v-model="passport.series" v-maska="'## ##'" type="text" placeholder="1234" class="elz d-block grPin grY2 w100p borB2 h40 pR32 ellipsis trns2 invPssSib br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0 fn fn-primary-t"/>
                  <span class="elz d-flex grPin grY2 a-X borB2 evNone">
                    <span class="elz p-rel growZ d-flex a-PR">
                      <span ref="series" :class="passport.series ? validationText(passport.series, 'classList', 5) : ''" class="elz p-rel d-flex a-X s24 r2">
                        <span :class="passport.series ? ' bgBef-CC' : ''" :style="passport.series ? validationText(passport.series, 'icon', 5) : ''" class="elz p-rel d-block mskBef s16 cFillBef"></span>
                      </span>
                    </span>
                  </span>
                  <span class="elz infoLabel d-block fn-8 trns2 invPssLing">Серия</span>
                </label>
              </div>
              <div class="elz infoTitle d-flex a-H hmn40 borB2 mL24 noShrink">
                <div class="elz d-block">Номер:</div>
              </div>
              <div class="elz d-block grow mL24">
                <label :class="{evNone: finalState}" class="elz d-grid grPos fn fnLInvD fn-primary-t fnL20 fnHovL10 fnFow-focus fnFowL0">
                  <input v-model="passport.number" v-maska="'### ###'" type="text" placeholder="567890" class="elz d-block grPin grY2 w100p borB2 h40 pR32 ellipsis trns2 invPssSib br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0 fn fn-primary-t"/>
                  <span class="elz d-flex grPin grY2 a-X borB2 evNone">
                    <span class="elz p-rel growZ d-flex a-PR">
                      <span ref="number" :class="passport.number ? validationText(passport.number, 'classList', 7): ''" class="elz p-rel d-flex a-X s24 r2">
                        <span :class="passport.number ? ' bgBef-CC' : ''" :style="passport.number ? validationText(passport.number, 'icon', 7): ''" class="elz p-rel d-block mskBef s16 cFillBef"></span>
                      </span>
                    </span>
                  </span>
                  <span class="elz infoLabel d-block fn-8 trns2 invPssLing">Номер:</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="elz infoLine d-block mB32">
          <div class="elz infoTitle d-flex a-H hmn40 borB2 mL24 noShrink">
            <div class="elz d-block">Дата выдачи</div>
          </div>
          <div class="elz d-block mL24">
            <label :class="{evNone: finalState}" class="elz d-grid grPos fn fnLInvD fn-primary-t fnL20 fnHovL10 fnFow-focus fnFowL0">
              <input v-model="passport.issueDate" v-maska="'##.##.####'" type="text" placeholder="ДД.ММ.ГГГГ" class="elz d-block grPin grY2 w100p borB2 h40 pR32 ellipsis trns2 invPssSib br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0 fn fn-primary-t"/>
              <span class="elz d-flex grPin grY2 a-X borB2 evNone">
                <span class="elz p-rel growZ d-flex a-PR">
                  <span ref="issueDate" :class="passport.issueDate ? validationDate(passport.issueDate, 'classList') : ''" class="elz p-rel d-flex a-X s24 r2">
                    <span :class="passport.issueDate ? ' bgBef-CC' : ''" :style="passport.issueDate ? validationDate(passport.issueDate, 'icon') : ''" class="elz p-rel d-block mskBef s16 cFillBef"></span>
                  </span>
                </span>
              </span>
              <span class="elz infoLabel d-block fn-8 trns2 invPssLing">Дата выдачи</span>
            </label>
          </div>
        </div>

        <div class="elz infoLine d-block mB32">
          <div class="elz infoTitle d-flex a-H hmn40 borB2 mL24 noShrink">
            <div class="elz d-block">Код подразделения:</div>
          </div>
          <div class="elz d-block mL24">
            <label :class="{evNone: finalState}" class="elz d-grid grPos fn fnLInvD fn-primary-t fnL20 fnHovL10 fnFow-focus fnFowL0">
              <input v-model="passport.ufmsCode" @input="validationUfmsCode" v-maska="'###-###'" type="text" placeholder="123-456" class="elz d-block grPin grY2 w100p borB2 h40 pR32 ellipsis trns2 invPssSib br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0 fn fn-primary-t"/>
              <span class="elz d-flex grPin grY2 a-X borB2 evNone">
                <span class="elz p-rel growZ d-flex a-PR">
                  <span ref="ufmsCode" :class="passport.ufmsCode ? validationText(passport.ufmsCode, 'classList', 7) : ''" class="elz p-rel d-flex a-X s24 r2">
                    <span :class="passport.ufmsCode ? ' bgBef-CC' : ''" :style="passport.ufmsCode ? validationText(passport.ufmsCode, 'icon', 7) : ''" class="elz p-rel d-block mskBef s16 cFillBef"></span>
                  </span>
                </span>
              </span>
              <span class="elz infoLabel d-block fn-8 trns2 invPssLing">Код подразделения</span>
            </label>
          </div>
        </div>

        <div class="elz infoLine d-block mB32">
          <div class="elz infoTitle d-flex a-H hmn40 borB2 mL24 noShrink">
            <div class="elz d-block">Кем выдан:</div>
          </div>
          <div class="elz p-rel d-block mL24">
            <label :class="{evNone: finalState}" class="elz d-grid grPos fn fnLInvD fn-primary-t fnL20 fnHovL10 fnFow-focus fnFowL0">
              <input v-model="passport.issueDepartment" v-maska="_validation.text" type="text" placeholder="Московским РОВД Южного округа" class="elz d-block grPin grY2 w100p borB2 h40 pR32 ellipsis trns2 invPssSib br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0 fn fn-primary-t"/>
              <span class="elz d-flex grPin grY2 a-X borB2 evNone">
                <span class="elz p-rel growZ d-flex a-PR">
                  <span ref="issueDepartment" :class="passport.issueDepartment ? validationText(passport.issueDepartment, 'classList') : ''" class="elz p-rel d-flex a-X s24 r2">
                    <span :class="passport.issueDepartment ? ' bgBef-CC' : ''" :style="passport.issueDepartment ? validationText(passport.issueDepartment, 'icon') : ''" class="elz p-rel d-block mskBef s16 cFillBef"></span>
                  </span>
                </span>
              </span>
              <span class="elz infoLabel d-block fn-8 trns2 invPssLing">Кем выдан</span>
            </label>
            <div v-if="ufmsList.length" class="elz p-abs pi-T p-H d-block oAuto r3 mT2 hmx320 bgp bor1 z10 bsh-default4 br br-black brA10 bg bg-primary bgL10">
              <div class="elz d-block pV8 lh12">
                <div v-for="(item, index) in ufmsList" :key="index" @click="updateIssueDepartment(index)" class="elz p-rel d-flex pV8 pH16 a-H cur-pointer opAct07 bgHov bgHov-ok fnHov fnHov-ok-t">
                  <div class="elz d-block growX">{{ item.value }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="elz infoLine d-block mB32">
          <div class="elz infoTitle d-flex a-H hmn40 borB2 mL24 noShrink">
            <div class="elz d-block">Адрес прописки:</div>
          </div>
          <div class="elz d-block mL24">
            <label :class="{evNone: finalState}" class="elz d-grid grPos fn fnLInvD fn-primary-t fnL20 fnHovL10 fnFow-focus fnFowL0">
              <input v-model="passport.registrationAddress" v-maska="_validation.text" placeholder="Москва, ул. 2я Хуторская д. 38А стр. 9" type="text" class="elz d-block grPin grY2 w100p borB2 h40 pR32 ellipsis trns2 invPssSib br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0 fn fn-primary-t"/>
              <span class="elz d-flex grPin grY2 a-X borB2 evNone">
                <span class="elz p-rel growZ d-flex a-PR">
                  <span ref="registrationAddress" :class="passport.registrationAddress ? validationText(passport.registrationAddress, 'classList', 5) : ''" class="elz p-rel d-flex a-X s24 r2">
                    <span :class="passport.registrationAddress ? ' bgBef-CC' : ''" :style="passport.registrationAddress ? validationText(passport.registrationAddress, 'icon', 5) : ''" class="elz p-rel d-block mskBef s16 cFillBef"></span>
                  </span>
                </span>
              </span>
              <span class="elz infoLabel d-block fn-8 trns2 invPssLing">Адрес прописки</span>
            </label>
          </div>
        </div>

      </div>
    </div>

    <div class="elz d-block mT48">
      <div class="elz cnnInfoCaption d-block bold pV8 mB16 fn18 borB1 br br-primary brL-10 brLInvD">Контактные данные</div>
      <div class="elz cnnInfoGrid d-block mL-24">

        <div class="elz infoLine d-block mB32">
          <div class="elz infoTitle d-flex a-H hmn40 borB2 mL24 noShrink">
            <div class="elz d-block">Мобильный телефон:</div>
          </div>
          <div class="elz d-block mL24">
            <label :class="{evNone: finalState}" class="elz d-grid grPos fn fnLInvD fn-primary-t fnL20 fnHovL10 fnFow-focus fnFowL0">
              <input ref="mobile" v-model="user.mobile" @keyup="validationMobile" :class="user.mobile ? mobileProps.classApproval : ''" v-maska="'+7 (###) ###-##-##'" placeholder="+7 (901) 12-34-567"  type="text"  class="elz d-block grPin grY2 w100p borB2 h40 pR32 ellipsis trns2 invPssSib br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0 fn fn-primary-t"/>
              <span class="elz d-flex grPin grY2 a-X borB2 evNone">
                <span class="elz p-rel growZ d-flex a-PR">
                  <span :class="user.mobile ? mobileProps.tooltip : ''" class="elz p-rel d-flex a-X r2 trns2 cur-help opHovOut">
                    <span class="elz fn-8 bold al-right pH8 op0 opHovIn10 trns2 trnsVis oH ellipsis">{{ user.mobile ? mobileProps.mobile : '' }}</span>
                    <span class="elz p-rel d-flex a-X s24 r2 evAuto">
                      <span :class="user.mobile ? ' bgBef-CC' : ''" :style="user.mobile ? mobileProps.icon : ''" class="elz p-rel d-block mskBef s16 cFillBef"></span>
                    </span>
                  </span>
                </span>
              </span>
              <span class="elz infoLabel d-block fn-8 trns2 invPssLing">Мобильный телефон</span>
            </label>
          </div>
        </div>

        <div class="elz infoLine d-block mB32">
          <div class="elz infoTitle d-flex a-H hmn40 borB2 mL24 noShrink">
            <div class="elz d-block">E-Mail:</div>
          </div>
          <div class="elz d-block mL24">
            <label :class="{evNone: finalState}" class="elz d-grid grPos fn fnLInvD fn-primary-t fnL20 fnHovL10 fnFow-focus fnFowL0">
              <input ref="email" v-model="user.email" @keyup="validationEmail" :class="user.email ? emailProps.classApproval : ''" v-maska="_validation.email" type="text" placeholder="example@yandex.ru" class="elz d-block grPin grY2 w100p pR32 borB2 h40 pR32 ellipsis trns2 invPssSib br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0 fn fn-primary-t"/>
              <span class="elz d-flex grPin grY2 a-X borB2 evNone">
                <span class="elz p-rel growZ d-flex a-PR">
                  <span :class="user.email ? emailProps.tooltip : ''" class="elz p-rel d-flex a-X r2 trns2 cur-help opHovOut">
                    <span class="elz fn-8 bold al-right pH8 op0 opHovIn10 trns2 trnsVis oH ellipsis">{{ user.email ? emailProps.email : '' }}</span>
                    <span class="elz p-rel d-flex a-X s24 r2 evAuto">
                      <span :class="user.email ? ' bgBef-CC' : ''" :style="user.email ? emailProps.icon : ''" class="elz p-rel d-block mskBef s16 cFillBef"></span>
                    </span>
                  </span>
                </span>
              </span>
              <span class="elz infoLabel d-block fn-8 trns2 invPssLing">E-Mail</span>
            </label>
          </div>
        </div>

      </div>
    </div>
  </div>

  <div class="elz d-flex a-X mT48">
    <input :class="formIsValid ? '' : 'uDisabled'" class="elz d-block al-center r3 h48 pH32 w240 cur-pointer opAct07 bg bg-ok fn fn-ok-t" type="submit" value="Сохранить данные"/>
  </div>

</template>

<script>
import { useStore } from 'vuex';
import DaDataService from "@/services/DaDataService";

export default {
  name: 'ClientForm',

  props: {
    orderId: {required: true, type: [String, Number]}
  },

  async setup(props) {
    const store = useStore();
    console.log(store.state);

    const customerId = store.state.orders.find(order => +order.OrderID === +props.orderId).CustomerID;
    console.log(customerId);

    await store.dispatch('fetchCustomerData', { customerId });

    console.log(store.state.customerData);

    return {
      props: {
        error: {
          classApproval: '',
          classList: 'fn fn-error',
          icon: "--elzMsk: url('/style/icons/info.svg');",
          tooltip: 'fn fn-error bgHov bgHov-error fnHov-error-t',
          mobile: 'Телефон не подтвержден',
          email: 'Электронный адрес не подтвержден'
        },
        success: {
          classApproval: 'isValidValue',
          classList: 'isValidValue fn fn-success',
          icon: "--elzMsk: url('/style/icons/checkmark.svg')",
          tooltip: 'fn fn-success bgHov bgHov-success fnHov-success-t',
          mobile: 'Телефон подтвержден',
          email: 'Электронный адрес подтвержден'
        },
        waiting: {
          classApproval: 'isValidValue',
          classList: 'isValidValue fn fn-primary-t',
          icon: "--elzMsk: url('/style/icons/clock.svg')",
          tooltip: 'fn fn-primary-t bgHov bgHov-primary-t fnHov-primary',
          mobile: 'Телефон в процессе подтверждения',
          email: 'Электронный адрес в процессе подтверждения'
        }
      },

      validation: {
        email: {
          mask: 'E*',
          tokens: {
            'E': {
              pattern: /^[!#$%&'*+/=?^_`{|}~@\-.a-zA-Z0-9\s]+/
            }
          }
        },
        text: {
          mask: 'T*',
          tokens: {
            'T': {
              pattern: /^[-_,.:а-яА-ЯёЁ0-9\s]+/u
            }
          }
        },
        word: {
          mask: 'RR*',
          tokens: {
            'R': {
              pattern: /[а-яёА-ЯЁ]+/u
            }
          }
        }
      }
    }
  },

  data() {
    return {
      formIsValid: false,
      emailProps: {},
      mobileProps: {},
      ufmsList: []
    }
  },

  beforeMount() {
    console.log('before mount');
    console.log(this.user);
    this.defineProps('mobile', 'mobileApproved');
    this.defineProps('email', 'emailApproved');
  },

  /*mounted() {
    DaDataService.getCleanAddress('мск сухонска 11/-89');
  },*/

  computed: {
    passport() {
      return this.user.passport;
    },
    user() {
      return this.$store.state.customerData;
    },
  },

  methods: {
    defineSendButtonState() {
      console.log('define Send Button State');
      this.formIsValid = (this.$refs.surname.classList.contains('isValidValue') && this.$refs.name.classList.contains('isValidValue')
                       && this.$refs.birthdayDate.classList.contains('isValidValue') && this.$refs.birthdayPlace.classList.contains('isValidValue')
                       && this.$refs.series.classList.contains('isValidValue') && this.$refs.number.classList.contains('isValidValue')
                       && this.$refs.issueDate.classList.contains('isValidValue') && this.$refs.ufmsCode.classList.contains('isValidValue')
                       && this.$refs.issueDepartment.classList.contains('isValidValue') && this.$refs.registrationAddress.classList.contains('isValidValue')
                       && this.$refs.mobile.classList.contains('isValidValue') && this.$refs.email.classList.contains('isValidValue')
      );
      console.log(this.formIsValid);
      console.log(this.$refs.email.classList.contains('isValidValue'));
    },

    defineProps(propKey, approvalStatus) {
      this[`${propKey}Props`] = (this.user[approvalStatus] === 2) ? this.props.success
                    : (this.user[approvalStatus] === 1) ? this.props.waiting
                    : this.props.error;
    },

    updateIssueDepartment(index) {
      this.passport.issueDepartment = this.ufmsList[index].value;
      this.ufmsList = [];
      setTimeout(()=> {
        this.defineSendButtonState();
      }, 500);
    },

    validationDate(data, option) {
      const dateArr = data.split('.');
      const [mm, dd, yyyy] = dateArr;
      const date = new Date(`${dd}-${mm}-${yyyy}`);
      return (data.length === 10 && date instanceof Date && !isNaN(date)) ? this.props.success[option] : this.props.error[option];
    },

    validationEmail() {
      console.log('email validation');
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      let data = this.user.email.replace(/ +/g, '').trim();
      this.emailProps = (data.match(pattern)) ? {
        classApproval: 'isValidValue',
        icon: this.props.success.icon,
        tooltip: this.props.waiting.tooltip,
        email: this.props.error.email
      } : {
        classApproval: '',
        icon: this.props.error.icon,
        tooltip: this.props.error.tooltip,
        email: "Электронный адрес указан не корректно"
      }
      console.log(this.emailProps);
      setTimeout(()=> {
        this.defineSendButtonState();
      }, 500);
    },

    validationMobile() {
      this.user.mobileApproved = 0;
      this.mobileProps = (this.$refs.mobile.attributes['data-mask-raw-value'].value.length === 10) ? {
        classList: 'isValidValue',
        icon: this.props.success.icon,
        tooltip: this.props.waiting.tooltip,
        mobile: this.props.error.mobile
      } : {
        classList: '',
        icon: this.props.error.icon,
        tooltip: this.props.error.tooltip,
        mobile: "Телефон указан не корректно"
      }
      setTimeout(()=> {
        this.defineSendButtonState();
      }, 500);
    },

    validationText(data, option, size = 2) {
      return data.length >= size ? this.props.success[option] : this.props.error[option];
    },

    async validationUfmsCode() {
      if (this.passport.ufmsCode.length === 7) {
        this.ufmsList = (await DaDataService.getFmsUnits(this.passport.ufmsCode)).suggestions;  //  '660-042' , '772-050'
        this.passport.issueDepartment = "";
        this.formIsValid = false;
      }
    },

  }
}

</script>


<style scoped>

</style>
