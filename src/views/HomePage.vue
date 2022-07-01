<template>

  <Header @logOutApp="$emit('logEvent')"/>

  <template v-if="dataIsReady">

    <OrdersFilters  />

    <div class="elz cnnCardsList d-grid fn12 lh12 grH320 gap16 p16">
      <template v-for="order in orders" >
        <OrdersCard v-if="filtered(order)" :key="order.OrderID" :order="order" />
      </template>
    </div>

  </template>

  <template v-else>
    <Uploader
        :circleSize   = "'s120'"
        :circleWidth  = "'2'"
        :viewSettings = "'p-fixed p16 z1k bg bg-primary bgA80'"  />
  </template>

</template>

<script>
import { useStore }  from 'vuex';
import { onUnmounted } from "vue";
import Header        from "@/components/elements/Header";
import OrdersFilters from "@/components/orders/OrdersFilters";
import OrdersCard    from "@/components/orders/OrdersCard";

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

    store.dispatch('static/fetchFilters');

    onUnmounted(() => store.state.homePage.orders = []);
  },

  computed: {
    dataIsReady() {
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
