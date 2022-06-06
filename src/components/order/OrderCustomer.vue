<template>

  <template v-if="isActive">

    <div @input="defineSendButtonState" class="elz d-block cnnClientWrap">
      <div class="elz cnnInfoCaption d-block bold pV8 mB16 fn18 borB1 br br-primary brL-10 brLInvD">Паспортные данные</div>
      <div class="elz cnnInfoGrid d-block mL-24">

        <InputItem ref="surname" @updateModelValue="(val) => customer.surname = val"
                   :modelValue="customer.surname"
                   :inputType="'text'"
                   :inputMask="validation.word"
                   :placeholder="'Иванов'"
                   :titleMain="'Фамилия:'"
                   :titleFocus="'Фамилия:'"
                   :inputProps="validationText(customer.surname)"   />

        <InputItem ref="name" @updateModelValue="(val) => customer.name = val"
                   :modelValue="customer.name"
                   :inputType="'text'"
                   :inputMask="validation.word"
                   :placeholder="'Иван'"
                   :titleMain="'Имя:'"
                   :titleFocus="'Имя:'"
                   :inputProps="validationText(customer.name)"   />

        <InputItem @updateModelValue="(val) => customer.patronymic = val"
                   :modelValue="customer.patronymic"
                   :inputType="'text'"
                   :placeholder="'Иванович'"
                   :titleMain="'Отчество:'"
                   :titleFocus="'Отчество:'"
                   :inputProps="customer.patronymic ? elemProps.success : ''"   />

        <InputItem ref="birthdayDate" @updateModelValue="(val) => customer.birthdayDate = val"
                   :modelValue="customer.birthdayDate"
                   :inputType="'text'"
                   :inputMask="'##.##.####'"
                   :placeholder="'ДД.ММ.ГГГГ'"
                   :titleMain="'Дата рождения:'"
                   :titleFocus="'Дата рождения:'"
                   :inputProps="validationDate(customer.birthdayDate)"   />

        <InputItem ref="birthdayPlace" @updateModelValue="(val) => customer.birthdayPlace = val"
                   :modelValue="customer.birthdayPlace"
                   :inputType="'text'"
                   :inputMask="validation.text"
                   :placeholder="'г. Москва'"
                   :titleMain="'Место рождения:'"
                   :titleFocus="'Место рождения:'"
                   :inputProps="validationText(customer.birthdayPlace, 4)"   />

        <div class="elz infoLine d-block mB32">
          <div class="elz infoTitle d-flex a-H hmn40 borB2 mL24 noShrink"><div class="elz d-block">Паспорт серия:</div></div>
          <div class="elz d-flex cnnFlexibleInputs">
            <InputItem ref="series" @updateModelValue="(val) => customer.passportSeries = val"
                       :modelValue="customer.passportSeries"
                       :inputType="'text'"
                       :inputMask="'## ##'"
                       :placeholder="'1234'"
                       :titleFocus="'Серия:'"
                       :inputProps="validationText(customer.passportSeries, 5)"   />

            <div class="elz infoTitle d-flex a-H hmn40 borB2 mL24 noShrink"><div class="elz d-block">Номер:</div></div>
            <InputItem ref="number" @updateModelValue="(val) => customer.passportNumber = val"
                       :modelValue="customer.passportNumber"
                       :inputType="'text'"
                       :inputMask="'### ###'"
                       :placeholder="'567890'"
                       :titleFocus="'Номер:'"
                       :inputProps="validationText(customer.passportNumber, 7)"   />
          </div>
        </div>

        <InputItem ref="issueDate" @updateModelValue="(val) => customer.issueDate = val"
                   :modelValue="customer.issueDate"
                   :inputType="'text'"
                   :inputMask="'##.##.####'"
                   :placeholder="'ДД.ММ.ГГГГ'"
                   :titleMain="'Дата выдачи:'"
                   :titleFocus="'Дата выдачи:'"
                   :inputProps="validationDate(customer.issueDate)"   />

        <InputItem ref="ufmsCode" @updateModelValue="(val) => {customer.ufmsCode = val; validationDaDataUfmsCode();}"
                   :modelValue="customer.ufmsCode"
                   :inputType="'text'"
                   :inputMask="'###-###'"
                   :placeholder="'123-456'"
                   :titleMain="'Код подразделения:'"
                   :titleFocus="'Код подразделения:'"
                   :inputProps="validationText(customer.ufmsCode, 7)"   />

        <InputItem ref="issueDepartment" @updateModelValue="(val) => customer.issueDepartment = val"
                   @autocompleteSelected="updateIssueDepartment"
                   :autocomplete="ufmsList.length ? ufmsList : false"
                   :modelValue="customer.issueDepartment"
                   :inputType="'text'"
                   :inputMask="validation.text"
                   :placeholder="'Московским РОВД Южного округа'"
                   :titleMain="'Кем выдан:'"
                   :titleFocus="'Кем выдан:'"
                   :inputProps="validationText(customer.issueDepartment, 4)"   />

        <InputItem ref="registrationAddress" @updateModelValue="(val) => {customer.registrationAddress = val; validationDaDataAddress('registrationAddress', 'addressFactList');}"
                   @autocompleteSelected="(idx) => updateAddress(idx, 'addressFactList', 'addressFactList')"
                   :autocomplete="addressFactList.length ? addressFactList : false"
                   :modelValue="customer.registrationAddress"
                   :inputType="'text'"
                   :inputMask="validation.text"
                   :placeholder="'Москва, ул. 2я Хуторская д. 38А стр. 9'"
                   :titleMain="'Адрес прописки:'"
                   :titleFocus="'Город, улица, дом'"
                   :inputProps="validationText(customer.registrationAddress, 5)"   />

        <div class="elz infoLine d-block mB32">
          <div class="elz infoTitle d-flex a-H hmn40 borB2 mL24 noShrink"></div>
          <div class="elz d-flex cnnFlexibleInputs">
            <InputItem @updateModelValue="(val) => customer.registrationAddressEntrance = val"
                       :modelValue="customer.registrationAddressEntrance"
                       :inputType="'text'"
                       :titleFocus="'Подъезд:'"
                       :inputProps="customer.registrationAddressEntrance ? elemProps.success : ''"   />

            <InputItem @updateModelValue="(val) => customer.registrationAddressLevel = val"
                       :modelValue="customer.registrationAddressLevel"
                       :inputType="'text'"
                       :titleFocus="'Этаж:'"
                       :inputProps="customer.registrationAddressLevel ? elemProps.success : ''"   />

            <InputItem @updateModelValue="(val) => customer.registrationAddressFlat = val"
                       :modelValue="customer.registrationAddressFlat"
                       :inputType="'text'"
                       :titleFocus="'Квартира'"
                       :inputProps="customer.registrationAddressFlat ? elemProps.success : ''"   />
          </div>
        </div>
      </div>
    </div>

    <div @input="defineSendButtonState" class="elz d-block mT48 cnnClientWrap">
      <div class="elz cnnInfoCaption d-block bold pV8 mB16 fn18 borB1 br br-primary brL-10 brLInvD">Контактные данные</div>
      <div class="elz cnnInfoGrid d-block mL-24">

        <InputItem ref="mobile" @updateModelValue="(val) => customer.mobile = val"
                   :modelValue="customer.mobile"
                   :inputType="'text'"
                   :inputMask="'+7 (###) ###-##-##'"
                   :placeholder="'+7 (901) 12-34-567'"
                   :titleMain="'Мобильный телефон:'"
                   :titleFocus="'Мобильный телефон:'"
                   :inputProps="validationText(customer.mobile, 18)"   />

        <InputItem ref="email" @updateModelValue="(val) => customer.email = val"
                   :modelValue="customer.email ? customer.email.trim() : customer.email"
                   :inputType="'text'"
                   :inputMask="validation.email"
                   :placeholder="'example@yandex.ru'"
                   :titleMain="'E-Mail:'"
                   :titleFocus="'E-Mail:'"
                   :inputProps="validationEmail()"   />

        <InputItem @updateModelValue="(val) => {customer.serviceAdr = val; validationDaDataAddress('serviceAdr', 'addressServiceList');}"
                   @autocompleteSelected="(idx) => updateAddress(idx, 'serviceAdr','addressServiceList')"
                   :autocomplete="addressServiceList.length ? addressServiceList : false"
                   :modelValue="customer.serviceAdr"
                   :inputType="'text'"
                   :inputMask="validation.text"
                   :placeholder="'Москва, ул. 2я Хуторская д. 38А стр. 9'"
                   :titleMain="'Адрес оказания услуги:'"
                   :titleFocus="'Город, улица, дом'"
                   :inputProps="validationText(customer.serviceAdr, 5)"   />

        <div class="elz infoLine d-block mB32">
          <div class="elz infoTitle d-flex a-H hmn40 borB2 mL24 noShrink"></div>
          <div class="elz d-flex cnnFlexibleInputs">
            <InputItem @updateModelValue="(val) => customer.serviceEntrance = val"
                       :modelValue="customer.serviceEntrance"
                       :inputType="'text'"
                       :titleFocus="'Подъезд:'"
                       :inputProps="customer.serviceEntrance ? elemProps.success : ''"   />

            <InputItem @updateModelValue="(val) => customer.serviceLevel = val"
                       :modelValue="customer.serviceLevel"
                       :inputType="'text'"
                       :titleFocus="'Этаж:'"
                       :inputProps="customer.serviceLevel ? elemProps.success : ''"   />

            <InputItem @updateModelValue="(val) => customer.serviceFlat = val"
                       :modelValue="customer.serviceFlat"
                       :inputType="'text'"
                       :titleFocus="'Квартира'"
                       :inputProps="customer.serviceFlat ? elemProps.success : ''"   />
          </div>
        </div>

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
      store.dispatch('orderPage/fetchCustomerInfo', {
        customerId: store.state.orderPage.order.details.CustomerIDTTS,
        dealId: store.state.orderPage.order.details.DealID
      });
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
      addressFactList: [],
      addressServiceList: [],
      ufmsList: []
    }
  },

  computed: {
    customer() {
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
      console.log(this.customer.registrationAddressFiass);
      if (this.customer.registrationAddressFiass === undefined) {
        this.customer.registrationAddressFiass = 'old value';
      }

      this.customer.passportDetails = `${this.customer.passportSeries.replace(/ +/g, '')} ${this.customer.passportNumber.replace(/ +/g, '')}`
      this.$store.dispatch('orderPage/updateCustomerInfo', this.customer);
    },

    updateAddress(index, paramName, listName) {
      const {house_type, house, block_type, block} = this[listName][index].data;
      let houseName = house_type + ' ' + house;
      if (block) {
        houseName += ' ' + block_type + ' ' + block;
      }
      this.customer[`${paramName}Fiass`] = this[listName][index].data;
      this.customer[`${paramName}Fiass`].houseName = houseName;
      this.customer[paramName] = this[listName][index].value;
      this[listName] = [];
      setTimeout(()=> this.defineSendButtonState(), 500);
    },

    updateIssueDepartment(val) {
      this.customer.issueDepartment = this.ufmsList[val].value;
      this.ufmsList = [];
      setTimeout(()=> this.defineSendButtonState(), 500);
    },

    async validationDaDataAddress(paramName, listName) {
      if (this.customer[paramName].length >= 4) {
        this[listName] = (await DaDataService.getSuggestionAddress(this.customer[paramName])).suggestions;
      }
      if (!this[listName].length) {
        this.customer[`${paramName}Fiass`] = 'is not exist';
      }
    },

    async validationDaDataUfmsCode() {
      if (this.customer.ufmsCode.length === 7) {
        this.ufmsList = (await DaDataService.getFmsUnits(this.customer.ufmsCode)).suggestions;  //  '660-042' , '772-050'
        this.customer.issueDepartment = "";
      }
    },

    validationDate(data) {
      if (data) {
        const dateArr = data.split('.');
        const [dd, mm, yyyy] = dateArr;
        const date = new Date(`${yyyy}-${mm}-${dd}T00:00:00`);
        return (!isNaN(date.getTime())) ? this.elemProps.success : this.elemProps.error;
      }
    },

    validationEmail() {
      if (this.customer.email) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        let data = this.customer.email.replace(/ +/g, '').trim();
        return (data.match(pattern)) ? this.elemProps.success : this.elemProps.error;
      }
    },

    validationText(data, size = 2) {
      if (data) {
        return data.length >= size ? this.elemProps.success : this.elemProps.error;
      }
    },

  }
}
</script>
