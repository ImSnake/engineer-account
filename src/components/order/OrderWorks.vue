<template>

  <template v-if="isActive">

    <div class="elz d-flex a-X mB32">
      <BaseButton @onButtonClick="workCreate"
          :classList="'hmn48 bg-ok bgHovL10 fn-ok-t'"
          :title="'Создать работу'"      />
    </div>

    <div class="elz d-flex dir-y gap16">
      <template v-for="(work,index) in workList" :key="index">
        <OrderWorksItem :work="work"  />
      </template>
    </div>

  </template>

</template>

<script>
import BaseButton     from "@/components/elements/BaseButton";
import OrderWorksItem from "@/components/order/OrderWorksItem";

export default {
  name: "OrderWorks",

  components: {
    BaseButton,
    OrderWorksItem
  },

  data() {
    return {
      isActive: false
    }
  },

  computed: {
    workList() {
      return this.$store.state.order.works;
    }
  },

  methods: {
    workCreate() {
      console.log('create work');
      this.workList.push({
        workId: "987",
        startDate: "",
        finishDate: "",
        points: "0",
        participants: [
          {
            participantId: "123456",
            participantFIO: "Иванов Петр Федорович",
            participationStart: ""
          },
          {
            participantId: "123456",
            participantFIO: "Джигарханян Ильман Ахметович",
            participationStart: ""
          }
        ],
        workList: []
      });
    },
  }
}
</script>

<style scoped>

</style>
