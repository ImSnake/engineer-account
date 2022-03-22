<template>

  <Header @logOutApp="$emit('logEvent')"/>

  <BreadCrumbs :title="'К списку заявок'" :path="'Home'" />

  <template v-if="dataIsReady">

    <OrderHeader   />

    <OrderNav @switchOrderContent="switchComponentView"   />

    <div class="elz d-block p16 wmx1200 mAuto">

      <OrderWorks ref="works"   />

      <OrderCustomer ref="customer"   />

      <OrderServices ref="services"   />

    </div>

  </template>

  <template v-else>
    <Uploader />
  </template>

</template>

<script>
import Header        from "@/components/elements/Header";
import BreadCrumbs   from "@/components/elements/BreadCrumbs";
import OrderHeader   from "@/components/order/OrderHeader";
import OrderNav      from "@/components/order/OrderNav";
import OrderWorks    from "@/components/order/OrderWorks";
import OrderCustomer from "@/components/order/OrderCustomer";
import OrderServices from "@/components/order/OrderServices";

import { useStore } from "vuex";
import { onUnmounted } from "vue";

export default {
  name: "OrderPage",

  components: {
    Header,
    BreadCrumbs,
    OrderHeader,
    OrderNav,
    OrderWorks,
    OrderCustomer,
    OrderServices
  },

  emits: [ 'logEvent' ],

  props: {
    orderId: { required: true, type: [ Number, String ] }
  },

  setup(props) {
    console.log('ORDER PAGE setup hook');
    const store = useStore();
    //store.dispatch('TESTFetchOrderDetails', { orderId: props.orderId });
    store.dispatch('fetchOrderDetails', props.orderId);

    onUnmounted(() => {store.state.order = {}; });

    //TODO Определить тип заявки для отображения интерфейса: если это подключение - показывать правую панель "OrderHeaderConnection"
  },

  watch: {
    dataIsReady() {
      setTimeout(()=> {
        this.switchComponentView(Object.keys(this.$refs)[0]);
      }, 100);
    }
  },

  computed: {
    dataIsReady() {
      return this.$store.state.order.readyState;
    }
  },

  methods: {
    switchComponentView(bookmarkName){
      Object.keys(this.$refs).forEach(el => {
        (el === bookmarkName) ? this.$refs[el].isActive = true : this.$refs[el].isActive = false;
      });
      this.$refs[bookmarkName].isActive = true;
    }
  }

}
</script>

<style scoped>

</style>
