<template>

  <div v-if="isActive" class="elz d-block p24 wmx1200 mAuto">
    <div @input="defineSendButtonState" class="elz d-block">
      <div class="elz cnnInfoCaption d-block bold pV8 mB16 fn18 borB1 br br-primary brL-10 brLInvD">Паспортные данные</div>
          <div class="elz cnnInfoGrid d-block mL-24">

            <InputItem @updateModelValue="(val) => user.surname = val"
              :modelValue="user.surname"
              :inputType="'text'"
              :inputMask="validation.word"
              :placeholder="'Иванов'"
              :refName="'surname'"
              :titleMain="'Фамилия:'"
              :validClass="validationText(user.surname, 'classList')"
              :validIcon="validationText(user.surname, 'icon')"  />

            <InputItem @updateModelValue="(val) => user.name = val"
                :modelValue="user.name"
                :inputType="'text'"
                :inputMask="validation.word"
                :placeholder="'Иван'"
                :refName="'name'"
                :titleMain="'Имя:'"
                :validClass="validationText(user.name, 'classList')"
                :validIcon="validationText(user.name, 'icon')"  />

            <InputItem @updateModelValue="(val) => user.patronymic = val"
                :modelValue="user.patronymic"
                :inputType="'text'"
                :placeholder="'Иванович'"
                :titleMain="'Отчество:'"
                :validClass="user.patronymic ? elemProps.success.classList: ''"
                :validIcon="user.patronymic ? elemProps.success.icon : ''"  />

            <InputItem @updateModelValue="(val) => user.birthdayDate = val"
                :modelValue="user.birthdayDate"
                :inputType="'text'"
                :inputMask="'##.##.####'"
                :placeholder="'ДД.ММ.ГГГГ'"
                :refName="'birthdayDate'"
                :titleMain="'Дата рождения:'"
                :validClass="validationDate(user.birthdayDate, 'classList')"
                :validIcon="validationDate(user.birthdayDate, 'icon')"  />

            <InputItem @updateModelValue="(val) => user.birthdayPlace = val"
                :modelValue="user.birthdayPlace"
                :inputType="'text'"
                :inputMask="validation.text"
                :placeholder="'г. Москва'"
                :refName="'birthdayDate'"
                :titleMain="'Место рождения:'"
                :validClass="validationText(user.birthdayPlace, 'classList', 4)"
                :validIcon="validationText(user.birthdayPlace, 'icon', 4)"  />

            <InputItem @updateModelValue="(val) => passport.series = val"
                :modelValue="passport.series"
                :inputType="'text'"
                :inputMask="'## ##'"
                :placeholder="'1234'"
                :refName="'series'"
                :titleMain="'Серия:'"
                :validClass="validationText(passport.series, 'classList', 5)"
                :validIcon="validationText(passport.series, 'icon', 5)"  />

            <InputItem @updateModelValue="(val) => passport.number = val"
                :modelValue="passport.number"
                :inputType="'text'"
                :inputMask="'### ###'"
                :placeholder="'567890'"
                :refName="'number'"
                :titleMain="'Номер:'"
                :validClass="validationText(passport.number, 'classList', 7)"
                :validIcon="validationText(passport.number, 'icon', 7)"  />

            <InputItem
                @updateModelValue="(val) => passport.issueDate = val"
                :modelValue="passport.issueDate"
                :inputType="'text'"
                :inputMask="'##.##.####'"
                :placeholder="'ДД.ММ.ГГГГ'"
                :refName="'issueDate'"
                :titleMain="'Дата выдачи:'"
                :validClass="validationDate(passport.issueDate, 'classList')"
                :validIcon="validationDate(passport.issueDate, 'icon')"  />

<!--            <div class="elz infoLine d-block mB32">
              <div class="elz infoTitle d-flex a-H hmn40 borB2 mL24 noShrink">
                <div class="elz d-block">Фамилия:</div>
              </div>
              <div class="elz d-block mL24">
                <label class="elz d-grid grPos fn fnLInvD fn-primary-t fnL20 fnHovL10 fnFow-focus fnFowL0">
                  <input type="text" value="" placeholder="Иванов" class="elz d-block grPin grY2 w100p borB2 h40 ellipsis trns2 invPssSib
                                                                                          br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                          fn fn-primary-t" />
                  <span class="elz infoLabel d-block fn-8 trns2 invPssLing">Фамилия</span>
                </label>
              </div>
            </div>
            <div class="elz infoLine d-block mB32">
              <div class="elz infoTitle d-flex a-H hmn40 borB2 mL24 noShrink">
                <div class="elz d-block">Имя:</div>
              </div>
              <div class="elz d-block mL24">
                <label class="elz d-grid grPos fn fnLInvD fn-primary-t fnL20 fnHovL10 fnFow-focus fnFowL0">
                  <input type="text" value="" placeholder="Иван" class="elz d-block grPin grY2 w100p borB2 h40 ellipsis trns2 invPssSib
                                                                                          br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                          fn fn-primary-t" />
                  <span class="elz infoLabel d-block fn-8 trns2 invPssLing">Имя</span>
                </label>
              </div>
            </div>
            <div class="elz infoLine d-block mB32">
              <div class="elz infoTitle d-flex a-H hmn40 borB2 mL24 noShrink">
                <div class="elz d-block">Отчество:</div>
              </div>
              <div class="elz d-block mL24">
                <label class="elz d-grid grPos fn fnLInvD fn-primary-t fnL20 fnHovL10 fnFow-focus fnFowL0">
                  <input type="text" value="" placeholder="Иванович" class="elz d-block grPin grY2 w100p borB2 h40 ellipsis trns2 invPssSib
                                                                                          br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                          fn fn-primary-t" />
                  <span class="elz infoLabel d-block fn-8 trns2 invPssLing">Отчество</span>
                </label>
              </div>
            </div>
            <div class="elz infoLine d-block mB32">
              <div class="elz infoTitle d-flex a-H hmn40 borB2 mL24 noShrink">
                <div class="elz d-block">Дата рождения:</div>
              </div>
              <div class="elz d-block mL24">
                <label class="elz d-grid grPos fn fnLInvD fn-primary-t fnL20 fnHovL10 fnFow-focus fnFowL0">
                  <input type="text" value="" placeholder="ДД.ММ.ГГГГ" data-format="**.**.****" data-mask="" class="elz d-block grPin grY2 w100p borB2 h40 ellipsis trns2 invPssSib
                                                                                          br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                          fn fn-primary-t" />
                  <span class="elz infoLabel d-block fn-8 trns2 invPssLing">Дата рождения</span>
                </label>
              </div>
            </div>
            <div class="elz infoLine d-block mB32">
              <div class="elz infoTitle d-flex a-H hmn40 borB2 mL24 noShrink">
                <div class="elz d-block">Место рождения:</div>
              </div>
              <div class="elz d-block mL24">
                <label class="elz d-grid grPos fn fnLInvD fn-primary-t fnL20 fnHovL10 fnFow-focus fnFowL0">
                  <input type="text" value="" placeholder="г. Москва" class="elz d-block grPin grY2 w100p borB2 h40 ellipsis trns2 invPssSib
                                                                                          br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                          fn fn-primary-t" />
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
                    <label class="elz d-grid grPos fn fnLInvD fn-primary-t fnL20 fnHovL10 fnFow-focus fnFowL0">
                      <input type="text" value="" placeholder="1234" data-format="****" data-mask="" class="elz d-block grPin grY2 w100p borB2 h40 ellipsis trns2 invPssSib
                                                                                          br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                          fn fn-primary-t" />
                      <span class="elz infoLabel d-block fn-8 trns2 invPssLing">Серия</span>
                    </label>
                  </div>

                  <div class="elz infoTitle d-flex a-H hmn40 borB2 mL24 noShrink">
                    <div class="elz d-block">Номер:</div>
                  </div>
                  <div class="elz d-block grow mL24">
                    <label class="elz d-grid grPos fn fnLInvD fn-primary-t fnL20 fnHovL10 fnFow-focus fnFowL0">
                      <input type="text" value="" placeholder="567890" data-format="******" data-mask="" class="elz d-block grPin grY2 w100p borB2 h40 ellipsis trns2 invPssSib
                                                                                          br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                          fn fn-primary-t" />
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
                <label class="elz d-grid grPos fn fnLInvD fn-primary-t fnL20 fnHovL10 fnFow-focus fnFowL0">
                  <input type="text" value="" placeholder="ДД.ММ.ГГГГ" data-format="**.**.****" data-mask="" class="elz d-block grPin grY2 w100p borB2 h40 ellipsis trns2 invPssSib
                                                                                          br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                          fn fn-primary-t" />
                  <span class="elz infoLabel d-block fn-8 trns2 invPssLing">Дата выдачи</span>
                </label>
              </div>
            </div>
            <div class="elz infoLine d-block mB32">
              <div class="elz infoTitle d-flex a-H hmn40 borB2 mL24 noShrink">
                <div class="elz d-block">Кем выдан:</div>
              </div>
              <div class="elz d-block mL24">
                <label class="elz d-grid grPos fn fnLInvD fn-primary-t fnL20 fnHovL10 fnFow-focus fnFowL0">
                  <input type="text" value="" placeholder="Московским РОВД Южного округа" class="elz d-block grPin grY2 w100p borB2 h40 ellipsis trns2 invPssSib
                                                                                          br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                          fn fn-primary-t" />
                  <span class="elz infoLabel d-block fn-8 trns2 invPssLing">Кем выдан</span>
                </label>
              </div>
            </div>
            <div class="elz infoLine d-block mB32">
              <div class="elz infoTitle d-flex a-H hmn40 borB2 mL24 noShrink">
                <div class="elz d-block">Код подразделения:</div>
              </div>
              <div class="elz d-block mL24">
                <label class="elz d-grid grPos fn fnLInvD fn-primary-t fnL20 fnHovL10 fnFow-focus fnFowL0">
                  <input type="text" value="" placeholder="123-456" data-format="***-***" data-mask="" class="elz d-block grPin grY2 w100p borB2 h40 ellipsis trns2 invPssSib
                                                                                          br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                          fn fn-primary-t" />
                  <span class="elz infoLabel d-block fn-8 trns2 invPssLing">Код подразделения</span>
                </label>
              </div>
            </div>
            <div class="elz infoLine d-block mB32">
              <div class="elz infoTitle d-flex a-H hmn40 borB2 mL24 noShrink">
                <div class="elz d-block">Адрес прописки:</div>
              </div>
              <div class="elz d-block mL24">
                <label class="elz d-grid grPos fn fnLInvD fn-primary-t fnL20 fnHovL10 fnFow-focus fnFowL0">
                  <input type="text" value="" placeholder="Москва, ул. 2я Хуторская д. 38А стр. 9" class="elz d-block grPin grY2 w100p borB2 h40 ellipsis trns2 invPssSib
                                                                                          br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                          fn fn-primary-t" />
                  <span class="elz infoLabel d-block fn-8 trns2 invPssLing">Адрес прописки</span>
                </label>
              </div>
            </div>-->
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
                <label class="elz d-grid grPos fn fnLInvD fn-primary-t fnL20 fnHovL10 fnFow-focus fnFowL0">
                  <input type="text" value="" placeholder="(916) 1234567" data-format="(***) ***-****" data-mask="" class="elz d-block grPin grY2 w100p borB2 h40 ellipsis trns2 invPssSib
                                                                                          br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                          fn fn-primary-t" />
                  <span class="elz d-flex grPin grY2 a-X borB2 evNone">
                                      <span class="elz p-rel d-flex a-X s24 trns2 hide">
                                          <span class="elz p-rel d-block mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('https://lelouch.ru/uploads/icons/phone.svg');"></span>
                                      </span>

                                      <span class="elz p-rel growZ d-flex a-PR">
                                          <span class="elz p-rel d-flex a-X r2 trns2 cur-help opHovOut bgHov bgHov-success fn fn-success fnHov-success-t">
                                              <span class="elz fn-8 bold al-right pH8 op0 opHovIn10 trns2 trnsVis oH ellipsis">Телефон подтвержден</span>
                                              <span class="elz p-rel d-flex a-X s24 r2 evAuto">
                                                  <span class="elz p-rel d-block mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('https://lelouch.ru/uploads/icons/checkmark.svg');"></span>
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
                <label class="elz d-grid grPos fn fnLInvD fn-primary-t fnL20 fnHovL10 fnFow-focus fnFowL0">
                  <input type="text" value="" placeholder="example@yandex.ru" class="elz d-block grPin grY2 w100p pR32 borB2 h40 ellipsis trns2 invPssSib
                                                                                          br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                          fn fn-primary-t" />
                  <span class="elz d-flex grPin grY2 a-X borB2 evNone">
                                      <span class="elz p-rel d-flex a-X s24 trns2 hide">
                                          <span class="elz p-rel d-block mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('https://lelouch.ru/uploads/icons/mail.svg');"></span>
                                      </span>

                                      <span class="elz p-rel growZ d-flex a-PR">
                                          <span class="elz p-rel d-flex a-X r2 trns2 cur-help opHovOut bgHov bgHov-secondary fn fn-primary-t fnHov-secondary-t">
                                              <span class="elz fn-8 bold al-right pH8 op0 opHovIn10 trns2 trnsVis oH ellipsis">Письмо с подтверждение было отправлено</span>
                                              <span class="elz p-rel d-flex a-X s24 r2 evAuto">
                                                  <span class="elz p-rel d-block mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('https://lelouch.ru/uploads/icons/send.svg');"></span>
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

        <div class="elz d-flex a-X mT48">
          <input class="elz d-block al-center r3 h48 pH32 w240 cur-pointer opAct07 bg bg-ok fn fn-ok-t" type="submit" value="Сохранить данные"/>
        </div>
      </div>

</template>

<script>
import InputItem from "@/components/elements/InputItem";

//import { useStore } from 'vuex';
//import DaDataService from "@/services/DaDataService";


export default {
  name: 'OrderCustomer',

  components: {
    InputItem
  },

  setup(){
    return {
      elemProps: {
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
      isActive: false,
      formIsValid: false,
    }
  },

  beforeMount() {
    //console.log('before mount');
    //console.log(this.user);
    //this.defineProps('mobile', 'mobileApproved');
    //this.defineProps('email', 'emailApproved');
  },

  computed: {
    passport() {
      return this.user.passport;
    },
    user() {
      return this.$store.state.order.customerInfo;
    },
  },

  methods: {
    setUserName(value) {
      console.log(value);
      this.user.surname = value;
      //this.validationText(this.user.surname, 'classList');
    },



    defineSendButtonState() {
      console.log('define Send Button State');
      /*this.formIsValid = (this.$refs.surname.classList.contains('isValidValue') && this.$refs.name.classList.contains('isValidValue')
          && this.$refs.birthdayDate.classList.contains('isValidValue') && this.$refs.birthdayPlace.classList.contains('isValidValue')
          && this.$refs.series.classList.contains('isValidValue') && this.$refs.number.classList.contains('isValidValue')
          && this.$refs.issueDate.classList.contains('isValidValue') && this.$refs.ufmsCode.classList.contains('isValidValue')
          && this.$refs.issueDepartment.classList.contains('isValidValue') && this.$refs.registrationAddress.classList.contains('isValidValue')
          && this.$refs.mobile.classList.contains('isValidValue') && this.$refs.email.classList.contains('isValidValue')
      );*/
      //console.log(this.formIsValid);
      //console.log(this.$refs.email.classList.contains('isValidValue'));
    },

    defineProps(propKey, approvalStatus) {
      this[`${propKey}Props`] = (this.user[approvalStatus] === 2) ? this.elemProps.success
          : (this.user[approvalStatus] === 1) ? this.elemProps.waiting
              : this.elemProps.error;
    },

    validationDate(data, option) {
      const dateArr = data.split('.');
      const [mm, dd, yyyy] = dateArr;
      const date = new Date(`${dd}-${mm}-${yyyy}`);
      return (data.length === 10 && date instanceof Date && !isNaN(date)) ? this.elemProps.success[option] : this.elemProps.error[option];
    },

    validationText(data, option, size = 2) {
      console.log('text validation!!!');
      return data.length >= size ? this.elemProps.success[option] : this.elemProps.error[option];
    },
  }

}

</script>


<style scoped>

</style>
