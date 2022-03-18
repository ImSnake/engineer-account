<template>
  <div class="elz d-block mV24 mAuto borV1 br br-primary brL-10 brLInvD">
    <div class="elz d-flex pV2 mV-2 oAuto scrollHide uDragToScroll cur-grabAct">
      <div class="elz d-flex gap32 h56 wmn1200 pH16 mAuto">

        <OrderNavItem ref="works"
            @onItemClick="testNavClick('works')"
            :iconName="'hammer1'"
            :title="'Работы по заявке'"
            :label="worksLength"   />

        <template v-if="isConnection">

          <OrderNavItem ref="customer"
              @onItemClick="testNavClick('customer')"
              :iconName="'user'"
              :title="'Данные клиента'"   />

          <OrderNavItem ref="services"
              @onItemClick="testNavClick('services')"
              :iconName="'hammer-wrench'"
              :title="'Конфигурация услуг'"   />

          <OrderNavItem ref="tariffing"
              @onItemClick="testNavClick('tariffing')"
              :iconName="'network'"
              :title="'Постановка на тарификацию'"   />

          <OrderNavItem ref="finishing"
              @onItemClick="testNavClick('finishing')"
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

  components: {
    OrderNavItem
  },

  mounted() {
    this.$refs[Object.keys(this.$refs)[0]].isActive = true;
  },

  computed: {
    isConnection() {
      return (+this.$store.state.order.details.OrderTypeID === 2 || +this.$store.state.order.details.OrderTypeID === 11);
    },

    worksLength() {
      return this.$store.state.order.works.length;
    }
  },

  methods: {
    testNavClick(bookmarkName) {
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
