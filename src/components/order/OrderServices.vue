<template>

  <template v-if="isActive">

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
        <tr v-for="(service,index) in $store.state.orderPage.order.servicesSD" :key="index" class="tr">
          <td class="td">{{service.businessName}}</td>
          <td class="td">{{ service.billName }}</td>
          <td class="td">{{ service.incomingType }}</td>
          <td class="td nowrap">{{ service.sum }}</td>
        </tr>
        </tbody>
      </table>
    </div>


    <div class="elz d-flex dir-y gap16">

      <template v-for="(service, idx) in $store.state.orderPage.order.servicesHydra" :key="idx">
        <OrderServicesHydra
            @changeTariff="(val) => changeTariff(idx, val)"
            @changeType="(val, zone) => changeType(idx, val, zone)"
            @createConnection="createConnection(idx)"
            @setTariffication="(tariff, ubn, contract) => setTariffication(idx, tariff, ubn, contract)"
            @toggleServiceView="servicesHydra[idx].isOpened = !servicesHydra[idx].isOpened"
            :service="service"   />
      </template>

    </div>

   </template>

</template>

<script>
import { useStore } from "vuex";
import OrderServicesHydra from "@/components/order/OrderServicesHydra";

export default {
  name: "OrderServices",

  components: {
    //BaseButton,
    OrderServicesHydra
  },

  setup() {
    const store = useStore();

    const dealId = store.state.orderPage.order.details.DealID;

    if (!store.state.static.hydraServicesTypes.length) {
      store.dispatch('static/fetchHydraServicesTypes');
    }
    store.dispatch('orderPage/fetchSDServices', dealId);
    store.dispatch('orderPage/fetchHydraServices', dealId);

    return { dealId }
  },

  data() {
    return {
      isActive: false
    }
  },

  computed: {
    servicesHydra() {
     return this.$store.state.orderPage.order.servicesHydra;
    },

    customerUbn() {
      return this.$store.state.orderPage.order.details.CustomerUBN;
    }
  },

  methods: {
    changeTariff(idx, val) {

      console.log(val);
      const item = this.servicesHydra[idx];

      item.tariff = val;
/*      if (!val) {
        item.tariffList = [];
      }*/
    },

    async changeType(idx, val, zone) {
      this.servicesHydra[idx].showUploader = true;
      await this.$store.dispatch('orderPage/updateTypeServices', {
        tariffZone: zone,
        typeOfMainService: val,
        mainServiceSdId: this.servicesHydra[idx].typeOfService,
        customerHydraId: this.customerUbn
      });
      this.servicesHydra[idx].showUploader = false;
    },

    async createConnection(idx) {
      const item = this.servicesHydra[idx];
      item.showUploader = true;
      await this.$store.dispatch('orderPage/setHydraConnection', {
        goodName: item.name,
        customerHydraId: this.customerUbn
      });
      item.isConnected = true;
      item.isOpened = true;
      item.showUploader = false;
    },

    async setTariffication(idx, tariff, ubn, contract) {
      const item = this.servicesHydra[idx];
      item.showUploader = true;
      await this.$store.dispatch('orderPage/setTariffication', {
        serviceId: tariff,
        customerId: ubn,
        accountId: 0, //если есть, если нет то 0
        objectId: 0,  //если есть, если нет то 0
        baseContractHydraId: contract, //передаю теперь в hydraworker/serviceConfig **
        mainServiceSdId: this.servicesHydra[idx].typeOfService
      });
      item.billingStart = true;
      item.showUploader = false;
    },

    toggleTableView(e){
      const elem = e.currentTarget.parentNode;
      elem.classList.contains('sel') ? elem.classList.remove('sel') :  elem.classList.add('sel');
    },

  }

}
</script>

<style scoped>

</style>
