<template>

  <Header />

  <Filters v-if="dataIsLoaded" />

  <div v-if="dataIsLoaded" class="elz d-grid fn12 lh12 grH320 gap16 p16">

    <template v-for="(order,index) in orders" >
      <OrderCard v-if="filtered(order)" :key="index" :order="order" />
    </template>

  </div>

</template>

<script>
import Header from "@/components/Header";
import Filters from "@/components/Filters";
import OrderCard from "@/components/OrderCard";

export default {
  name: "HomePage",

  components: {
    Header,
    Filters,
    OrderCard
  },

  created() {
    this.setOrders(this.$store.state.user.userId);
    this.setFilters();
    console.log(this.$store.state);
  },

  computed: {
    dataIsLoaded() {
      console.log('data Is Loaded');
      console.log(this.$store.state.readyState.filters && this.$store.state.readyState.orders);
      return this.$store.state.readyState.filters && this.$store.state.readyState.orders;
    },
    orders() {
      return this.$store.state.orders;
    }
  },

  methods: {
    setFilters() {
      this.$store.dispatch('fetchFilters');
    },

    setOrders(userId) {
      this.$store.dispatch('fetchOrders', { userID: userId });
    },

    filtered(order) {
      return !Object.values(order.showInList).includes(false);
    },

    /*testTest() {
      console.log('FORCE UPDATE');
      console.log(this.$store.state.orders);
      this.$forceUpdate();
    }*/

  }
}
</script>

<style scoped>

</style>
