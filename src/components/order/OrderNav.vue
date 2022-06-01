<template>
  <div class="elz d-block mV24 mAuto borV1 br br-primary brL-10 brLInvD">
    <div class="elz d-flex pV2 mV-2 oAuto scrollHide uDragToScroll cur-grabAct">
      <div class="elz d-flex h56 w1200 wmx100p mAuto">

        <OrderNavItem ref="works"
            @onItemClick="navClick('works')"
            :iconName="'hammer1'"
            :title="'Работы по заявке'"
            :label="$store.state.scoreWorks.works.length"   />

        <template v-if="isConnection">

          <OrderNavItem ref="customer"
              @onItemClick="navClick('customer')"
              :iconName="'user'"
              :title="'Данные клиента'"   />

          <OrderNavItem ref="services"
              @onItemClick="navClick('services')"
              :iconName="'hammer-wrench'"
              :title="'Конфигурация услуг'"   />

          <OrderNavItem ref="finishing"
              @onItemClick="navClick('finishing')"
              :iconName="'file-text'"
              :title="'Завершение'"   />

        </template>

      </div>
    </div>
  </div>
</template>

<script>
import OrderNavItem from "@/components/order/OrderNavItem";

export default {
  name: "OrderNav",

  emit: [ 'switchOrderContent' ],

  props: {
    isConnection: { required: true, type: Boolean }
  },

  components: {
    OrderNavItem
  },

  mounted() {
    this.$refs[Object.keys(this.$refs)[0]].isActive = true;
  },

  computed: {
/*    isConnection() {
      return (+this.order.OrderTypeID === 2 || +this.order.OrderTypeID === 11) && (+this.order.CustomerTypeID === 2);
    },

    order() {
      return this.$store.state.orderPage.order.details;
    },*/

/*    worksLength() {
      return this.$store.state.orderPage.works.length;
    }*/
  },

  methods: {
    navClick(bookmarkName) {
      Object.keys(this.$refs).forEach(el => {
        (el === bookmarkName) ? this.$refs[el].isActive = true : this.$refs[el].isActive = false;
      });
      this.$emit('switchOrderContent', bookmarkName);
    },
  }

}
</script>

<style scoped>
.montMenuItem:only-child {
  flex-grow: 0;
}
</style>
