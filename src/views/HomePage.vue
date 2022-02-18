<template v-if="isReady">

  <Header  />

  <Filters />

  <div class="elz d-grid fn12 lh12 grH320 gap16 p16">

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

  data() {
    return {
      isReady: false
    }
  },

  created() {
    this.setFilters();
    this.setOrders(this.$store.state.user.userId);
    console.log(this.$store.state);
  },

  computed: {
    orders() {
      return this.$store.state.orders;
    }
  },

  methods: {
    setFilters() {
      this.$store.dispatch('fetchAppFilters');
    },

    async setOrders(userId) {
      await this.$store.dispatch('fetchOrders', { userID: userId });
      this.isReady = true;
    },

    filtered(order) {
      return !Object.values(order.showInList).includes(false);
    },

    /*testTest() {
      console.log('FORCE UPDATE');
      console.log(this.$store.state.orders);
      this.$forceUpdate();
    }*/

    /*
    priorityArray = Array("Низкий","Обычный","Высокий", "Срочно")
    */
  }
}
</script>

<style scoped>

</style>
