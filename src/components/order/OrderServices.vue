<template>

  <template v-if="isActive">

    <div class="elz d-block r3 bor1 fn12 mB32 oAuto br br-ok bg bg-ok bgA10 showSelOut hideSelOut">
      <div @click="toggleTableView" class="elz d-flex gap8 a-H p16 fn16 opAct07 cur-pointer">
        <div class="elz d-block grow bold">Услуги по сделке: #{{ $store.state.orderPage.order.details.DealID }}</div>
        <div class="elz p-rel d-block noShrink p-rel mskBef s8 deg180 cFillBef bgBef-CC hideSelIn" style="--elzMsk: url('/style/icons/arrow1.svg');"></div>
        <div class="elz p-rel d-block noShrink p-rel mskBef s8 cFillBef bgBef-CC showSelIn" style="--elzMsk: url('/style/icons/arrow1.svg');"></div>
      </div>
      <table class="elz elzTable w100p showSelIn">
        <thead class="tbody bor borB1 br br-ok">
        <tr class="tr bold pad pV10 pH16 nowrap">
          <td class="td">Бизнес-услуга</td>
          <td class="td">Наименование в счете</td>
          <td class="td">Вид начисления</td>
          <td class="td">Сумма по сделке</td>
        </tr>
        </thead>
        <tbody class="tbody pad pV10 pH16 fn16 uStrip stripEven strip005 stripHover stripLD">
        <tr v-for="(service,index) in $store.state.orderPage.order.servicesSD" :key="index" class="tr">
          <td class="td">{{service.businessName}}</td>
          <td class="td">{{ service.billName }}</td>
          <td class="td">{{ service.incomingType }}</td>
          <td class="td nowrap">{{ service.sum }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="elz d-flex a-X mB32 hide">
      <BaseButton
          :classList="'hmn48 bg-ok bgHovL10 fn-ok-t'"
          :title="'Создать клиента в Гидре'"    />
    </div>

    <div class="elz d-flex dir-y gap16">

      <template v-for="(service, index) in $store.state.orderPage.order.servicesHydra" :key="index">
        <OrderServicesHydra
            @changeTariff="(val) => service.tariff = val"
            @createAgreement="service.agreement = true"
            :service="service"   />
      </template>

    </div>

   </template>

</template>

<script>
import BaseButton from "@/components/elements/BaseButton";
import OrderServicesHydra from "@/components/order/OrderServicesHydra";
import { useStore } from "vuex";


export default {
  name: "OrderServices",

  components: {
    BaseButton,
    OrderServicesHydra
  },

  setup() {
    const store = useStore();

    if (!store.state.orderPage.services) {
      store.dispatch('orderPage/fetchDealSDServices', store.state.orderPage.order.details.DealID);
      store.dispatch('orderPage/fetchDealHydraServices', store.state.orderPage.order.details.DealID);
    }

  },

  data() {
    return {
      isActive: false
    }
  },

  computed: {
  },

  methods: {
    toggleTableView(e){
      const elem = e.currentTarget.parentNode;
      elem.classList.contains('sel') ? elem.classList.remove('sel') :  elem.classList.add('sel');
    },

    /*createAgreement(service) {
      //TODO запрос на создание договора в ГИДРА
      service.agreement = true;
    },*/
  }

}
</script>

<style scoped>

</style>
