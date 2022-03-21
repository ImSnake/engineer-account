<template>

  <template v-if="isActive">

    <div class="elz d-block">
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

        <InputItem @updateModelValue="(val) => passport.issueDate = val"
                   :modelValue="passport.issueDate"
                   :inputType="'text'"
                   :inputMask="'##.##.####'"
                   :placeholder="'ДД.ММ.ГГГГ'"
                   :refName="'issueDate'"
                   :titleMain="'Дата выдачи:'"
                   :validClass="validationDate(passport.issueDate, 'classList')"
                   :validIcon="validationDate(passport.issueDate, 'icon')"  />

        <InputItem @updateModelValue="(val) => {passport.ufmsCode = val; validationUfmsCode();}"
                   :modelValue="passport.ufmsCode"
                   :inputType="'text'"
                   :inputMask="'###-###'"
                   :placeholder="'123-456'"
                   :refName="'ufmsCode'"
                   :titleMain="'Код подразделения:'"
                   :validClass="validationText(passport.ufmsCode, 'classList', 7)"
                   :validIcon="validationText(passport.ufmsCode, 'icon', 7)"  />

        <InputItem @updateModelValue="(val) => passport.issueDepartment = val" @autocompleteSelected="updateIssueDepartment"
                   :autocomplete="ufmsList.length ? ufmsList : false"
                   :modelValue="passport.issueDepartment"
                   :inputType="'text'"
                   :inputMask="validation.text"
                   :placeholder="'Московским РОВД Южного округа'"
                   :refName="'issueDepartment'"
                   :titleMain="'Кем выдан:'"
                   :validClass="validationText(passport.issueDepartment, 'classList', 4)"
                   :validIcon="validationText(passport.issueDepartment, 'icon')"  />

        <InputItem @updateModelValue="(val) => passport.registrationAddress = val"
                   :modelValue="passport.registrationAddress"
                   :inputType="'text'"
                   :inputMask="validation.text"
                   :placeholder="'Москва, ул. 2я Хуторская д. 38А стр. 9'"
                   :refName="'registrationAddress'"
                   :titleMain="'Адрес прописки:'"
                   :validClass="validationText(passport.registrationAddress, 'classList', 5)"
                   :validIcon="validationText(passport.registrationAddress, 'icon', 5)"  />

      </div>
    </div>

    <div class="elz d-block mT48">
      <div class="elz cnnInfoCaption d-block bold pV8 mB16 fn18 borB1 br br-primary brL-10 brLInvD">Контактные данные</div>
      <div class="elz cnnInfoGrid d-block mL-24">

        <InputItem @updateModelValue="(val) => user.mobile = val"
                   :modelValue="user.mobile"
                   :inputType="'text'"
                   :inputMask="'+7 (###) ###-##-##'"
                   :placeholder="'+7 (901) 12-34-567'"
                   :refName="'mobile'"
                   :titleMain="'Мобильный телефон:'"
                   :validClass="validationText(user.mobile, 'classList', 18)"
                   :validIcon="validationText(user.mobile, 'icon', 18)"  />

        <InputItem @updateModelValue="(val) => user.email = val"
                   :modelValue="user.email"
                   :inputType="'text'"
                   :inputMask="validation.email"
                   :placeholder="'example@yandex.ru'"
                   :refName="'email'"
                   :titleMain="'E-Mail:'"
                   :validClass="validationEmail('classList')"
                   :validIcon="validationEmail('icon')"  />

      </div>
    </div>

    <div class="elz d-flex a-X mT48">
      <BaseButton @onButtonClick="submitCustomerData"
                  :classList="'hmn48 bg-ok bgHovL10 fn-ok-t'"
                  :title="'Подтвердить данные'"   />
    </div>

  </template>

</template>

<script>
import InputItem  from "@/components/elements/InputItem";
import BaseButton from "@/components/elements/BaseButton";

import DaDataService from "@/services/DaDataService";
//import { useStore } from 'vuex';


export default {
  name: 'OrderCustomer',

  components: {
    InputItem,
    BaseButton
  },

  setup(){
    return {
      elemProps: {
        error: {
          classApproval: '',
          classList: 'fn fn-error',
          icon: "--elzMsk: url('/style/icons/info.svg');",
          tooltip: 'fn fn-error bgHov bgHov-error fnHov-error-t',
        },
        success: {
          classApproval: 'isValidValue',
          classList: 'isValidValue fn fn-success',
          icon: "--elzMsk: url('/style/icons/checkmark.svg')",
          tooltip: 'fn fn-success bgHov bgHov-success fnHov-success-t',
        },
        waiting: {
          classApproval: 'isValidValue',
          classList: 'isValidValue fn fn-primary-t',
          icon: "--elzMsk: url('/style/icons/clock.svg')",
          tooltip: 'fn fn-primary-t bgHov bgHov-primary-t fnHov-primary',
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
      ufmsList: []
    }
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
    submitCustomerData(){
      console.log('submit Customer Data');
    },

    updateIssueDepartment(val) {
      this.passport.issueDepartment = this.ufmsList[val].value;
      this.ufmsList = [];
    },

    validationDate(data, option) {
      const dateArr = data.split('.');
      const [mm, dd, yyyy] = dateArr;
      const date = new Date(`${dd}-${mm}-${yyyy}`);
      return (data.length === 10 && date instanceof Date && !isNaN(date)) ? this.elemProps.success[option] : this.elemProps.error[option];
    },

    validationEmail(option) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      let data = this.user.email.replace(/ +/g, '').trim();
      return (data.match(pattern)) ? this.elemProps.success[option] : this.elemProps.error[option];
    },

    validationText(data, option, size = 2) {
      return data.length >= size ? this.elemProps.success[option] : this.elemProps.error[option];
    },

    async validationUfmsCode() {
      if (this.passport.ufmsCode.length === 7) {
        this.ufmsList = (await DaDataService.getFmsUnits(this.passport.ufmsCode)).suggestions;  //  '660-042' , '772-050'
        this.passport.issueDepartment = "";
        console.log(this.ufmsList);
        //this.formIsValid = false;
      }
    },

  }

}

</script>


<style scoped>

</style>
