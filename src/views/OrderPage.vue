<template>

  <Header @logOutApp="$emit('logEvent')"/>

  <BreadCrumbs :title="'К списку заявок'" :path="'Home'" />

  <template v-if="dataIsReady">

    <OrderHeader   />

    <OrderNav @switchOrderContent="switchComponentView" :isConnection="isConnection"  />

    <div class="elz d-block p16 wmx1200 mAuto">

      <OrderWorks ref="works"   />

      <template v-if="isConnection">

        <OrderCustomer ref="customer"   />

        <OrderServices ref="services"   />

        <OrderFinish ref="finishing"   />

      </template>

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
import OrderFinish   from "@/components/order/OrderFinish";

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
    OrderServices,
    OrderFinish
  },

  emits: [ 'logEvent' ],

  props: {
    orderId: { required: true, type: [ Number, String ] }
  },

  setup(props) {
    const store = useStore();

    if (!store.state.static.visitStatuses.length) {
      store.dispatch('static/fetchVisitStatuses');
    }

    store.dispatch('orderPage/fetchOrderDetails', props.orderId);

    onUnmounted(() => {store.state.orderPage.order = {}; });
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
      return this.$store.state.orderPage.order.readyState;
    },

    order() {
      return this.$store.state.orderPage.order.details;
    },

    isConnection() {
      return (+this.order.OrderTypeID === 2 || +this.order.OrderTypeID === 11) && (+this.order.CustomerTypeID === 2);
    },
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
