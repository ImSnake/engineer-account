<template>

  <div class="elz d-block p16 wmx1200 mAuto">

    <div class="elz d-flex f-wrap mAuto  gapH32 gapV16 lh15">
      <div class="elz d-flex growMax fb320 dir-y gap16 r3 p16 bg bg-primary bgL-5 bgLInvD">
        <div class="elz d-flex f-wrap gap8">
          <div class="elz d-block fb120 grow noShrink fn14 pV1">Тип заявки:</div>
          <div class="elz d-block fb150 growMax bold">{{ order.OrderTypeName }}</div>
        </div>
        <div class="elz d-flex f-wrap gap8">
          <div class="elz d-block fb120 grow noShrink fn14 pV1">Номер заявки:</div>
          <a :href="`http://tts.naukanet.ru/customers/orderinfo.asp?OrderID=${order.OrderID}`" target="_blank" class="elz d-block fb150 growMax bold cur-pointer fn fn-link-inline underlineHov">#{{ order.OrderID }}</a>
        </div>
        <div class="elz d-flex f-wrap gap8">
          <div class="elz d-block fb120 grow noShrink fn14 pV1">Сделка:</div>
          <a :href="`http://tts.naukanet.ru:8086/Orders/OrderInfoNew.asp?OrderID=${order.DealID}`" target="_blank" class="elz d-block fb150 growMax bold cur-pointer fn fn-link-inline underlineHov">#{{ order.DealID }}</a>
        </div>
        <div class="elz d-flex f-wrap gap8">
          <div class="elz d-block fb120 grow noShrink fn14 pV1">Клиент:</div>
          <div class="elz d-block fb150 growMax bold">{{ order.CustomerName }}</div>
        </div>
        <div class="elz d-flex f-wrap gap8">
          <div class="elz d-block fb120 grow noShrink fn14 pV1">Телефон:</div>
          <div class="elz d-block fb150 growMax bold">{{ order.CustomerPhone }}</div>
        </div>
        <div class="elz d-flex f-wrap gap8">
          <div class="elz d-block fb120 grow noShrink fn14 pV1">Адрес:</div>
          <div class="elz d-block fb150 growMax bold">{{ order.CustomerAddress }}</div>
        </div>
        <div class="elz d-flex f-wrap gap8">
          <div class="elz d-block fb120 grow noShrink fn14 pV1">Тарифная зона:</div>
          <div class="elz d-block fb150 growMax bold">{{ order.TariffZone }}</div>
        </div>
      </div>

      <template v-if="isConnection">
        <OrderHeaderConnection />
      </template>

    </div>

  </div>

</template>

<script>
import OrderHeaderConnection from "@/components/order/OrderHeaderConnection";

export default {
  name: "OrderHeader",

  components: {
    OrderHeaderConnection
  },

  computed: {
    isConnection() {
      return (+this.$store.state.order.details.OrderTypeID === 2 || +this.$store.state.order.details.OrderTypeID === 11);
    },

    order() {
      return this.$store.state.order.details;
    }
  }

}
</script>

<style scoped>

</style>
