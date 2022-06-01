<template>
  <div class="elz d-block p16 wmx1200 mAuto">
    <div class="elz d-flex f-wrap mAuto  gapH32 gapV16 lh15">
      <div class="elz d-flex growMax fb320 dir-y gap16 r3 p16 bg bg-primary bgL-5 bgLInvD">
        <div class="elz d-flex f-wrap gapH8">
          <div class="elz d-block fb120 grow noShrink fn14 pV1">Клиент:</div>
          <div class="elz d-block fb150 growMax bold">
            <div class="elz d-flex f-wrap a-H gapH16 gapV4">
              <template v-if="order.DealID" >
                <a :href="`http://sdn.naukanet.ru/customers/customer/${order.CustomerIDSD}`" target="_blank" class="elz d-block fb150 growMax bold cur-pointer fn fn-link-inline underlineHov">{{ order.CustomerName }}</a>
                <div :class="order.CustomerUBN ? 'bg-success  fn-success-t' : 'bg-error fn-error-t'" class="elz d-block lh10 fn10 bold rRound pV4 pH6 bg fn">{{ order.CustomerUBN ? 'Связан с биллингом' : 'Нет связи с биллингом' }}</div>
              </template>
              <template v-else>
                <div class="elz d-block">{{ order.CustomerName }}</div>
              </template>
            </div>
          </div>
        </div>
        <div class="elz d-flex f-wrap gapH8">
          <div class="elz d-block fb120 grow noShrink fn14 pV1">Заявка:</div>
          <a :href="`http://tts.naukanet.ru/customers/orderinfo.asp?OrderID=${order.OrderID}`" target="_blank" class="elz d-block fb150 growMax bold cur-pointer fn fn-link-inline underlineHov">#{{ order.OrderID }}</a>
        </div>
        <div v-if="order.DealID" class="elz d-flex f-wrap gap8">
          <div class="elz d-block fb120 grow noShrink fn14 pV1">Сделка:</div>
          <a :href="`http://tts.naukanet.ru:8086/Orders/OrderInfoNew.asp?OrderID=${order.DealID}`" target="_blank" class="elz d-block fb150 growMax bold cur-pointer fn fn-link-inline underlineHov">#{{ order.DealID }}</a>
        </div>
        <div class="elz d-flex f-wrap gapH8">
          <div class="elz d-block fb120 grow noShrink fn14 pV1">Тип заявки:</div>
          <div class="elz d-block fb150 growMax bold">{{ order.OrderTypeName }}</div>
        </div>
        <div class="elz d-flex f-wrap gapH8">
          <div class="elz d-block fb120 grow noShrink fn14 pV1">Статус:</div>
          <div class="elz d-block fb150 growMax bold">{{ order.orderStatusName }}</div>
        </div>
        <div v-if="order.TariffZone" class="elz d-flex f-wrap gapH8">
          <div class="elz d-block fb120 grow noShrink fn14 pV1">Тарифная зона:</div>
          <div class="elz d-block fb150 growMax bold">{{ order.TariffZone }}</div>
        </div>
        <div class="elz d-flex f-wrap gapH8">
          <div class="elz d-block fb120 grow noShrink fn14 pV1">Телефон:</div>
          <div class="elz d-block fb150 growMax bold">{{ order.CustomerPhone }}</div>
        </div>
        <div v-if="isConnection" class="elz d-flex f-wrap gapH8">
          <div class="elz d-block fb120 grow noShrink fn14 pV1">Адрес:</div>
          <div class="elz d-block fb150 growMax bold">{{ orderAddress }}</div>
        </div>
      </div>

<!--      <template v-if="isConnection">
        <OrderHeaderConnection />
      </template>-->

    </div>
  </div>
</template>

<script>
//import OrderHeaderConnection from "@/components/order/OrderHeaderConnection";

export default {
  name: "OrderHeader",

  components: {
    //OrderHeaderConnection
  },

  props: {
    isConnection: { required: true, type: Boolean }
  },

  computed: {
/*    isConnection() {
      return (+this.$store.state.orderPage.order.details.OrderTypeID === 2 || +this.$store.state.orderPage.order.details.OrderTypeID === 11);
    },*/

    order() {
      return this.$store.state.orderPage.order.details;
    },

    orderAddress() {
      let txt = this.order.locationAddress ? this.order.locationAddress : null;
      if (txt) {
        txt += this.order.locationAddressEntrance ? `, подъезд ${this.order.locationAddressEntrance}` : '';
        txt += this.order.locationAddressLevel ? `, этаж ${this.order.locationAddressLevel}` : '';
        txt += this.order.locationAddressFlat ? `, квартира ${this.order.locationAddressFlat}` : '';
      }
      return txt;
    }
  }

}
</script>

<style scoped>

</style>
