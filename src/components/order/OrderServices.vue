<template>

  <template v-if="isActive && dataIsReady">

    <div class="elz d-block r3 bor1 fn12 mB32 oAuto br br-ok bg bg-ok bgA10 showSelOut hideSelOut">
      <div @click="toggleTableView" class="elz d-flex gap8 a-H p16 fn16 opAct07 cur-pointer">
        <div class="elz d-block grow bold">Услуги по сделке: #{{ dealId }}</div>
        <div class="elz p-rel d-block noShrink p-rel mskBef s8 deg180 cFillBef bgBef-CC hideSelIn" style="--elzMsk: url('/style/icons/arrow1.svg');"></div>
        <div class="elz p-rel d-block noShrink p-rel mskBef s8 cFillBef bgBef-CC showSelIn" style="--elzMsk: url('/style/icons/arrow1.svg');"></div>
      </div>
      <table class="elz elzTable w100p showSelIn">
        <thead class="tbody bor borB1 br br-ok">
        <tr class="tr bold pad pV10 pH16 nowrap">
          <td class="td wmn200">Бизнес-услуга</td>
          <td class="td wmn200">Наименование в счете</td>
          <td class="td">Вид начисления</td>
          <td class="td">Сумма по сделке</td>
        </tr>
        </thead>
        <tbody class="tbody pad pV10 pH16 fn14 uStrip stripEven strip005 stripHover stripLD va-M lh15">
        <tr v-for="(service,index) in $store.state.orderPage.services.fromSD" :key="index" class="tr">
          <td class="td">{{service.businessName}}</td>
          <td class="td">{{ service.billName }}</td>
          <td class="td">{{ service.incomingType }}</td>
          <td class="td nowrap">{{ service.sum }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="elz d-flex dir-y gap16">

      <div v-if="accountData" class="elz d-block p-rel bor1 r3 mB16 bg bg-primary bgL5 br br-primary brL-10 brLInvD hideSelOut showSelOut">
        <div class="elz d-flex f-wrap gap8 a-H p16 hmn64">
          <div class="elz d-flex f-wrap a-H grow gap8">
            <div class="elz d-block grow fb320 lh12">
              <div class="elz d-block bold">Личный кабинет</div>
            </div>
          </div>
          <div class="empLogPassWrap elz d-flex a-H">
            <div class="elz p-rel d-block">
              <Tooltip ref='login' :type="'ok'" :hasTail="true" :duration="1500">Логин скопирован</Tooltip>
              <InputBase
                  @on:click="(e) => showTooltip('login', e.currentTarget.querySelector('input'))"
                  :modelValue="accountData.login"
                  :inputType="'text'"
                  :readonly="true"
                  :icon="'user'"
                  :classInput="'rL3 selNone cur-inh h32'"
                  :classLabel="'empLogPassInput grow mR-1 cur-pointer'"   />
            </div>
            <div class="elz p-rel d-block">
              <Tooltip ref="password" :type="'ok'" :hasTail="true" :duration="1500">Пароль скопирован</Tooltip>
              <InputBase
                  @on:click="(e) => showTooltip('password', e.currentTarget.querySelector('input'))"
                  :modelValue="accountData.pass"
                  :inputType="'password'"
                  :readonly="true"
                  :icon="'key'"
                  :classInput="'rR3 selNone cur-inh h32'"
                  :classLabel="'empLogPassInput grow cur-pointer'"   />
            </div>
          </div>
          <div class="elz d-flex a-X wmn120 hmn28 p8 r3 fn11 bold bg cur-help bg-success fn fn-success-t" title="Доступ к личному кабинету предоставлен">Подключен</div>
        </div>
      </div>

      <template v-for="(service, idx) in servicesHydra" :key="idx">

        <template v-if="+service.typeOfService === 1">
          <OrderServicesHydraPhone
              @changeZone="(val, zone) => changeType(idx, val, zone)"
              @createConnection="createConnection(idx)"
              @setTarifficationPhone="(contract, tariff, operator, pbx, phone) => setTarifficationPhone(idx, contract, tariff, operator, pbx, phone)"
              @toggleServiceView="servicesHydra[idx].isOpened = !servicesHydra[idx].isOpened"
              :service="service"  />
        </template>

        <template v-else>
          <OrderServicesHydra
              @changeTariff="(val) => service.tariff = val"
              @changeType="(val) => changeType(idx, val, order.TariffZoneSDId)"
              @createConnection="createConnection(idx)"
              @setTariffication="(tariff, contract) => setTariffication(idx, tariff, contract)"
              @toggleServiceView="servicesHydra[idx].isOpened = !servicesHydra[idx].isOpened"
              :dataIsReady="dataIsReady"
              :service="service">
          </OrderServicesHydra>
        </template>

      </template>


    </div>

   </template>

  <template v-if="showUploader">
    <Uploader
        :circleSize   = "'s100'"
        :circleWidth  = "'2'"
        :viewSettings = "'p-abs p16 r3 z10 bg bg-primary bgL5 br br-primary brL-10 brLInvD bgA50'"  />
  </template>

</template>

<script>
import Tooltip from "@/components/elements/Tooltip";
import InputBase from "@/components/elements/InputBase";
import OrderServicesHydra from "@/components/order/OrderServicesHydra";
import OrderServicesHydraPhone from "@/components/order/OrderServicesHydraPhone";

import { useStore } from "vuex";
import { tooltipShowLoginPassword } from "@/helpers/elements_common";

export default {
  name: "OrderServices",

  components: {
    Tooltip,
    InputBase,
    OrderServicesHydra,
    OrderServicesHydraPhone
  },

  setup() {
    const store = useStore();

    const dealId = store.state.orderPage.order.details.DealID;

    store.dispatch('static/fetchHydraServicesTypes');

    store.dispatch('orderPage/fetchSDServices', dealId);

    store.dispatch('orderPage/fetchHydraServices', dealId);

    return { dealId }
  },

  data() {
    return {
      isActive: false,
      showUploader: true
    }
  },

  watch: {
    dataIsReady() {
      this.showUploader = !this.dataIsReady;
    }
  },

  computed: {
    accountData() {
      return this.$store.state.orderPage.services.account;
    },

    dataIsReady() {
      return this.$store.state.orderPage.services.readyState && this.$store.state.static.hydraServicesTypes.length;
    },

    servicesHydra() {
     return this.$store.state.orderPage.services.fromHydra;
    },

    order() {
      return this.$store.state.orderPage.order.details;
    }
  },

  methods: {
    async changeType(idx, val, zone) {
      //this.servicesHydra[idx].showUploader = true;
      const item = this.servicesHydra[idx];
      item.showUploader = true;

      await this.$store.dispatch('orderPage/updateTypeServices', {
        tariffZone: zone,
        typeOfMainService: val,
        mainServiceSdId: item.typeOfService,
        customerHydraId: this.order.CustomerUBN
      });

      item.showUploader = false;
      //this.servicesHydra[idx].showUploader = false;
    },

    async createConnection(idx) {
      const item = this.servicesHydra[idx];
      item.showUploader = true;

      await this.$store.dispatch('orderPage/setHydraConnection', {
        goodName: item.name,
        customerHydraId: this.order.CustomerUBN
      });

      item.isConnected = true;
      item.isOpened = true;
      item.showUploader = false;
    },

    async setTarifficationPhone(idx, contract, tariff, operator, pbx, phone) {
      console.log('SET AND CONNECT PHONE TARIFF');
      const item = this.servicesHydra[idx];
      item.showUploader = true;

      await this.$store.dispatch('orderPage/setTarifficationPhone', {
        serviceId: tariff,
        customerId: this.order.CustomerUBN,
        accountId: 0, //если есть, если нет то 0
        objectId: 0,  //если есть, если нет то 0

        baseContractHydraId: contract, //передаю теперь в hydraworker/serviceConfig **
        mainServiceSdId: item.typeOfService,
        orderTTSId: this.order.OrderID,
        orderSdId: this.order.DealID,
        operatorContractId: operator,
        pbxId: pbx,
        phoneNumber: phone
      });

      item.billingStart = true;
      item.showUploader = false;
    },

    async setTariffication(idx, tariff, contract) {
      const item = this.servicesHydra[idx];
      item.showUploader = true;

      const serviceTypes = this.$store.state.static.hydraServicesTypes.find(({typeOfService}) => +typeOfService === +item.typeOfService ).list;
      const tariffData = this.servicesHydra[idx].tariffList.find(el => +el.value === +tariff);

      await this.$store.dispatch('orderPage/setTariffication', {
        serviceId: tariff,
        customerId: this.order.CustomerUBN,
        accountId: 0, //если есть, если нет то 0
        objectId: 0,  //если есть, если нет то 0
        baseContractHydraId: contract, //передаю теперь в hydraworker/serviceConfig **
        mainServiceSdId: item.typeOfService,
        orderTTSId: this.order.OrderID,
        orderSdId: this.order.DealID,
        serviceName: tariffData.name,
        serviceAmount: tariffData.price,
        serviceTypeName: serviceTypes.find(el => +el.value === +item.serviceTypeId).name
      });

      item.billingStart = true;
      item.showUploader = false;
    },

    showTooltip(name, el) {
      tooltipShowLoginPassword(name, el, this.$refs);
    },

    toggleTableView(e){
      const elem = e.currentTarget.parentNode;
      elem.classList.contains('sel') ? elem.classList.remove('sel') :  elem.classList.add('sel');
    }
  }
}
</script>

<style scoped>

</style>
