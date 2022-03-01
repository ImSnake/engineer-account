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
import { useStore } from 'vuex';
import {onUnmounted} from "vue";
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

  setup() {
    console.log('setup hook');
    const store = useStore();
    store.dispatch('fetchOrders', { userID: store.state.user.userId });
    store.dispatch('fetchFilters');

    //TODO раскомментировать, когда будет подключение к API для апдейта информации о заявках
    const timer = setInterval(function () {
      console.log('update orders interval');
      store.dispatch('fetchOrders', { userID: store.state.user.userId });
    }, 30000);

    onUnmounted(() => { clearInterval(timer); });

    return { timer }
  },

  computed: {
    dataIsLoaded() {
      return this.$store.state.readyState.filters && this.$store.state.readyState.orders;
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
