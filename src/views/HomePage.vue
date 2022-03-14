<template>

  <Header />

  <template v-if="dataIsLoaded">

    <OrdersFilters  />

    <div class="elz d-grid fn12 lh12 grH320 gap16 p16">

      <template v-for="(order,index) in orders" >
        <OrdersCard v-if="filtered(order)" :key="index" :order="order" />
      </template>

    </div>

  </template>

  <template v-else>

    <Uploader />

  </template>

</template>

<script>
import Header from "@/components/elements/Header";
import OrdersFilters from "@/components/orders/OrdersFilters";
import OrdersCard from "@/components/orders/OrdersCard";

import { useStore } from 'vuex';
//import { onUnmounted } from "vue";

export default {
  name: "HomePage",

  components: {
    Header,
    OrdersFilters,
    OrdersCard
  },

  setup() {
    console.log('HOME PAGE setup hook');

    const store = useStore();
    store.dispatch('fetchOrders');
    //store.dispatch('TESTFetchOrders', { userID: store.state.user.userId });

    store.dispatch('fetchFilters');

    /*const timer = setInterval(function () {
      console.log('interval update all orders');
      store.dispatch('fetchOrders', { userID: store.state.user.userId });
    }, 40000);

    onUnmounted(() => { clearInterval(timer); });

    return { timer }*/
  },


  computed: {
    dataIsLoaded() {
      return this.$store.state.filters.readyState && this.$store.state.orders.readyState;
    },
    orders() {
      return this.$store.state.orders;
    }
  },

  methods: {
    filtered(order) {
      return !Object.values(order.showInList).includes(false);
    }
  }
}
</script>

<style scoped>

</style>
