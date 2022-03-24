<template>

  <template v-if="isActive">

    <div @input="defineSendButtonState" class="elz d-block">
      <div class="elz cnnInfoCaption d-block bold pV8 mB16 fn18 borB1 br br-primary brL-10 brLInvD">Паспортные данные</div>
      <div class="elz cnnInfoGrid d-block mL-24">

        <InputItem ref="surname" @updateModelValue="(val) => user.surname = val"
                   :modelValue="user.surname"
                   :inputType="'text'"
                   :inputMask="validation.word"
                   :placeholder="'Иванов'"
                   :titleMain="'Фамилия:'"
                   :inputProps="validationText(user.surname)"   />

        <InputItem ref="name" @updateModelValue="(val) => user.name = val"
                   :modelValue="user.name"
                   :inputType="'text'"
                   :inputMask="validation.word"
                   :placeholder="'Иван'"
                   :titleMain="'Имя:'"
                   :inputProps="validationText(user.name)"   />

        <InputItem @updateModelValue="(val) => user.patronymic = val"
                   :modelValue="user.patronymic"
                   :inputType="'text'"
                   :placeholder="'Иванович'"
                   :titleMain="'Отчество:'"
                   :inputProps="user.patronymic ? elemProps.success : ''"   />

        <InputItem ref="birthdayDate" @updateModelValue="(val) => user.birthdayDate = val"
                   :modelValue="user.birthdayDate"
                   :inputType="'text'"
                   :inputMask="'##.##.####'"
                   :placeholder="'ДД.ММ.ГГГГ'"
                   :titleMain="'Дата рождения:'"
                   :inputProps="validationDate(user.birthdayDate)"   />

        <InputItem ref="birthdayPlace" @updateModelValue="(val) => user.birthdayPlace = val"
                   :modelValue="user.birthdayPlace"
                   :inputType="'text'"
                   :inputMask="validation.text"
                   :placeholder="'г. Москва'"
                   :titleMain="'Место рождения:'"
                   :inputProps="validationText(user.birthdayPlace, 4)"   />

        <InputItem ref="series" @updateModelValue="(val) => passport.series = val"
                   :modelValue="passport.series"
                   :inputType="'text'"
                   :inputMask="'## ##'"
                   :placeholder="'1234'"
                   :titleMain="'Серия:'"
                   :inputProps="validationText(passport.series, 5)"   />

        <InputItem ref="number" @updateModelValue="(val) => passport.number = val"
                   :modelValue="passport.number"
                   :inputType="'text'"
                   :inputMask="'### ###'"
                   :placeholder="'567890'"
                   :titleMain="'Номер:'"
                   :inputProps="validationText(passport.number, 7)"   />

        <InputItem ref="issueDate" @updateModelValue="(val) => passport.issueDate = val"
                   :modelValue="passport.issueDate"
                   :inputType="'text'"
                   :inputMask="'##.##.####'"
                   :placeholder="'ДД.ММ.ГГГГ'"
                   :titleMain="'Дата выдачи:'"
                   :inputProps="validationDate(passport.issueDate)"   />

        <InputItem ref="ufmsCode" @updateModelValue="(val) => {passport.ufmsCode = val; validationUfmsCode();}"
                   :modelValue="passport.ufmsCode"
                   :inputType="'text'"
                   :inputMask="'###-###'"
                   :placeholder="'123-456'"
                   :titleMain="'Код подразделения:'"
                   :inputProps="validationText(passport.ufmsCode, 7)"   />

        <InputItem ref="issueDepartment" @updateModelValue="(val) => passport.issueDepartment = val" @autocompleteSelected="updateIssueDepartment"
                   :autocomplete="ufmsList.length ? ufmsList : false"
                   :modelValue="passport.issueDepartment"
                   :inputType="'text'"
                   :inputMask="validation.text"
                   :placeholder="'Московским РОВД Южного округа'"
                   :titleMain="'Кем выдан:'"
                   :inputProps="validationText(passport.issueDepartment, 4)"   />

        <InputItem ref="registrationAddress" @updateModelValue="(val) => passport.registrationAddress = val"
                   :modelValue="passport.registrationAddress"
                   :inputType="'text'"
                   :inputMask="validation.text"
                   :placeholder="'Москва, ул. 2я Хуторская д. 38А стр. 9'"
                   :titleMain="'Адрес прописки:'"
                   :inputProps="validationText(passport.registrationAddress, 5)"   />

      </div>
    </div>

    <div @input="defineSendButtonState" class="elz d-block mT48">
      <div class="elz cnnInfoCaption d-block bold pV8 mB16 fn18 borB1 br br-primary brL-10 brLInvD">Контактные данные</div>
      <div class="elz cnnInfoGrid d-block mL-24">

        <InputItem ref="mobile" @updateModelValue="(val) => user.mobile = val"
                   :modelValue="user.mobile"
                   :inputType="'text'"
                   :inputMask="'+7 (###) ###-##-##'"
                   :placeholder="'+7 (901) 12-34-567'"
                   :titleMain="'Мобильный телефон:'"
                   :inputProps="validationText(user.mobile, 18)"   />

        <InputItem ref="email" @updateModelValue="(val) => user.email = val"
                   :modelValue="user.email.trim()"
                   :inputType="'text'"
                   :inputMask="validation.email"
                   :placeholder="'example@yandex.ru'"
                   :titleMain="'E-Mail:'"
                   :inputProps="validationEmail()"   />

      </div>
    </div>

    <div class="elz d-flex a-X mT48">
      <BaseButton @onButtonClick="updateCustomerData"
                  :classList="buttonClass"
                  :title="'Подтвердить данные'"   />
    </div>

  </template>

</template>

<script>
import InputItem  from "@/components/elements/InputItem";
import BaseButton from "@/components/elements/BaseButton";
import DaDataService from "@/services/DaDataService";
import { useStore } from "vuex";


export default {
  name: 'OrderCustomer',

  components: {
    InputItem,
    BaseButton
  },

  setup(){
    const store = useStore();

    if (!store.state.orderPage.order.customerInfo) {
      store.dispatch('orderPage/fetchCustomerInfo', store.state.orderPage.order.details.CustomerIDTTS);
    }

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
      formIsValid: false,
      isActive: false,
      ufmsList: []
    }
  },

  computed: {
    passport() {
      return this.user.passport;
    },

    user() {
      return this.$store.state.orderPage.order.customerInfo;
    },

    buttonClass() {
      return `hmn48 bg-ok bgHovL10 fn-ok-t ${this.formIsValid ? '' : 'uDisabled'}`;
    }
  },

  methods: {
    defineSendButtonState() {
      this.formIsValid = (this.$refs.surname.$el.classList.contains('isValidValue')
          && this.$refs.name.$el.classList.contains('isValidValue')
          && this.$refs.birthdayDate.$el.classList.contains('isValidValue')
          && this.$refs.birthdayPlace.$el.classList.contains('isValidValue')
          && this.$refs.series.$el.classList.contains('isValidValue')
          && this.$refs.number.$el.classList.contains('isValidValue')
          && this.$refs.issueDate.$el.classList.contains('isValidValue')
          && this.$refs.ufmsCode.$el.classList.contains('isValidValue')
          && this.$refs.issueDepartment.$el.classList.contains('isValidValue')
          && this.$refs.registrationAddress.$el.classList.contains('isValidValue')
          && this.$refs.mobile.$el.classList.contains('isValidValue')
          && this.$refs.email.$el.classList.contains('isValidValue'));
    },

    updateCustomerData(){
      console.log('submit Customer Data');
      this.$store.dispatch('orderPage/updateCustomerInfo', this.user);
    },

    updateIssueDepartment(val) {
      this.passport.issueDepartment = this.ufmsList[val].value;
      this.ufmsList = [];
    },

    validationDate(data) {
      const dateArr = data.split('.');
      const [mm, dd, yyyy] = dateArr;
      const date = new Date(`${dd}-${mm}-${yyyy}`);
      return (data.length === 10 && date instanceof Date && !isNaN(date)) ? this.elemProps.success : this.elemProps.error;
    },

    validationEmail() {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      let data = this.user.email.replace(/ +/g, '').trim();
      return (data.match(pattern)) ? this.elemProps.success : this.elemProps.error;
    },

    validationText(data, size = 2) {
      return data.length >= size ? this.elemProps.success : this.elemProps.error;
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
