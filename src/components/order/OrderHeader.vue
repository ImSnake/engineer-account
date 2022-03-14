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
          <div class="elz d-block fb150 growMax bold">#{{ order.OrderID }}</div>
        </div>
        <div class="elz d-flex f-wrap gap8">
          <div class="elz d-block fb120 grow noShrink fn14 pV1">Сделка:</div>
          <div class="elz d-block fb150 growMax bold">#{{ order.DealID }}</div>
        </div>
        <div class="elz d-flex f-wrap gap8">
          <div class="elz d-block fb120 grow noShrink fn14 pV1">Клиент:</div>
          <div class="elz d-block fb150 growMax bold">{{ order.CustomerName }}</div>
        </div>
        <div class="elz d-flex f-wrap gap8">
          <div class="elz d-block fb120 grow noShrink fn14 pV1">Тарифная зона:</div>
          <div class="elz d-block fb150 growMax bold">{{ order.TariffZone }}</div>
        </div>
        <div class="elz d-flex f-wrap gap8">
          <div class="elz d-block fb120 grow noShrink fn14 pV1">Адрес:</div>
          <div class="elz d-block fb150 growMax bold">{{ order.CustomerAddress }}</div>
        </div>
        <div class="elz d-flex f-wrap gap8">
          <div class="elz d-block fb120 grow noShrink fn14 pV1">Телефон:</div>
          <div class="elz d-block fb150 growMax bold">{{ order.CustomerPhone }}</div>
        </div>
      </div>

      <!--  -->
      <OrderHeaderConnection />

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
    order() {
      return this.$store.state.orderData.orderDetails;
    }
  }

}
</script>

<style scoped>

</style>
