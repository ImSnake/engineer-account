<template v-if="dataIsReady">

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

  async created() {
    this.setFilters();
    this.setOrders(this.$store.state.user.userId, 0, 0);
    console.log(this.$store.state);
  },

  computed: {
    dataIsReady() {
      return this.orders.length > 0 && this.$store.state.filters.statuses.length;
    },
    orders() {
      return this.$store.state.orders;
    }
  },

  methods: {
    async setFilters() {
      await this.$store.dispatch('fetchAppFilters')
        .catch(error => {
          this.$router.push({
            name: 'ErrorDisplay',
            params: { error: error }
          });
        });
    },

    async setOrders(userId, departmentId, roleId) {
      await this.$store.dispatch('fetchOrders', {
        userID: userId,
        departmentId: departmentId,
        roleId: roleId
      }).catch(error => {
          this.$router.push({
            name: 'ErrorDisplay',
            params: { error: error }
          });
      });
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
