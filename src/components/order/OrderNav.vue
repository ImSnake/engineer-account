<template>
  <div class="elz d-block mV24 mAuto borV1 br br-primary brL-10 brLInvD">
    <div class="elz d-flex pV2 mV-2 oAuto scrollHide uDragToScroll cur-grabAct">
      <div class="elz d-flex h56 w1200 wmx100p mAuto">

        <OrderNavItem ref="works"
            @onItemClick="navClick('works')"
            :bookmark="'works'"
            :iconName="'hammer1'"
            :title="'Работы по заявке'"
            :label="$store.state.scoreWorks.works.length"   />

        <template v-if="isConnection">

          <OrderNavItem ref="customer"
              @onItemClick="navClick('customer')"
              :bookmark="'customer'"
              :iconName="'user'"
              :title="'Данные клиента'"   />

          <OrderNavItem ref="services"
              @onItemClick="navClick('services')"
              :bookmark="'services'"
              :iconName="'hammer-wrench'"
              :title="'Конфигурация услуг'"   />

          <OrderNavItem ref="finishing"
              @onItemClick="navClick('finishing')"
              :bookmark="'finishing'"
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
    hash: { required: false, type: String },
    isConnection: { required: true, type: Boolean }
  },

  components: {
    OrderNavItem
  },

  mounted() {
    this.hash ? this.$refs[this.hash].isActive = true : this.$refs[Object.keys(this.$refs)[0]].isActive = true;
  },

  computed: {},

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
