<template>

  <Header @logOutApp="$emit('logEvent')"/>

  <BreadCrumbs :path="'Home'" :url="'/'">К списку заявок</BreadCrumbs>

  <template v-if="dataIsReady">

    <OrderHeader :isConnection="isConnection" :order="order" />

    <OrderNav @switchOrderContent="switchComponentView" :hash="hash" :isConnection="isConnection"  />

    <div class="elz d-block p16 p-rel wmx1200 mAuto" style="padding-bottom: 50px">

      <OrderWorks ref="works"   />

      <template v-if="isConnection">

        <OrderCustomer ref="customer"   />

        <OrderServices ref="services"   />

        <OrderFinish ref="finishing"   />

      </template>

    </div>

  </template>

  <template v-else>
    <Uploader
        :circleSize = "'s120'"
        :circleWidth = "'2'"
        :viewSettings = "'p-fixed p16 z1k bg bg-primary bgA80'"  />
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
import { useRouter } from 'vue-router';
import { onMounted, onUnmounted } from "vue";

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
    // eslint-disable-next-line vue/no-setup-props-destructure
    const orderId = props.orderId;
    const store = useStore();
    const router = useRouter();

    store.state.orderPage.SECTION_ID = 6;
    store.state.orderPage.ORDER_ID = orderId;

    store.dispatch('static/fetchVisitStatuses');

    store.dispatch('orderPage/fetchOrderDetails', orderId);

    onMounted(() => store.dispatch('orderPage/socketRegisterOrder', orderId));

    onUnmounted(() => store.commit('orderPage/CLEAR_STATE'));

    const hash = router.currentRoute._rawValue.hash.slice(1);

    return { hash }
  },

  watch: {
    dataIsReady() {
      setTimeout(()=> {
        this.switchComponentView(this.hash ? this.hash : Object.keys(this.$refs)[0]);
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
        this.$refs[el].isActive = false;
      });
      this.$refs[bookmarkName].isActive = true;
    }
  }
}
</script>
