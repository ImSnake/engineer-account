<template>

  <Header @logOutApp="$emit('logEvent')"/>

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
import Header        from "@/components/elements/Header";
import OrdersFilters from "@/components/orders/OrdersFilters";
import OrdersCard    from "@/components/orders/OrdersCard";
import { useStore }  from 'vuex';


export default {
  name: "HomePage",

  components: {
    Header,
    OrdersFilters,
    OrdersCard
  },

  emits: [ 'logEvent' ],

  setup() {
    const store = useStore();
    store.dispatch('homePage/fetchOrders');
    //store.dispatch('homePage/TESTFetchOrders');

    if (!store.state.static.filters.readyState) {
      store.dispatch('static/fetchFilters');
    }
  },

  computed: {
    dataIsLoaded() {
      return this.$store.state.static.filters.readyState && this.$store.state.homePage.readyState;
    },

    orders() {
      return this.$store.state.homePage.orders;
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
