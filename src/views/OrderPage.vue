<template>

  <Header  />

  <BreadCrumbs :title="'К списку заявок'" :path="'Home'" />

  <template v-if="$store.state.orderData.readyState">

    <OrderHeader />

    <OrderNav />

    <OrderContent />

  </template>

  <template v-else>
    <Uploader />
  </template>

</template>

<script>
import Header       from "@/components/elements/Header";
import BreadCrumbs  from "@/components/elements/BreadCrumbs";
import OrderHeader  from "@/components/order/OrderHeader";
import OrderNav     from "@/components/order/OrderNav";
import OrderContent from "@/components/order/OrderContent";

import { useStore } from "vuex";
import { onUnmounted } from "vue";

export default {
  name: "OrderPage",

  components: {
    Header,
    BreadCrumbs,
    OrderHeader,
    OrderNav,
    OrderContent
  },

  props: {
    orderId: { required: true, type: [ Number, String ] }
  },

  setup(props) {
    console.log('ORDER PAGE setup hook');
    const store = useStore();
    store.dispatch('fetchOrderData', { orderId: props.orderId });
    console.log(store.state.orderData);

    onUnmounted(() => {store.state.orderData = []; });

    //TODO Определить тип заявки для отображения интерфейса:
    //- если это подключение - показывать правую панель "OrderHeaderConnection"
  },


  methods: {
  }

}
</script>

<style scoped>

</style>
