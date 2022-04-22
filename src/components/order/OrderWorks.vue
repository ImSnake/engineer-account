<template>
  <template v-if="isActive">

    <div class="elz d-flex dir-y gap16">
      <template v-for="(work,index) in works" :key="index">
        <OrderWorksItem
            :work="work"
            @deleteWorkItem="deleteWorkItem(index)"
            @changeWorkStatus="(status, timeStamp) => changeWorkStatus(index, status, timeStamp)"
            @toggleParticipant="(checked, participantId, timeStamp) => toggleParticipant(index, checked, participantId, timeStamp)"/>
      </template>
    </div>

    <div class="elz d-flex a-X mT32 mB32">
      <BaseButton
          @onButtonClick="createWorkItem"
          :classList="'hmn48 bg-ok bgHovL10 fn-ok-t'"
          :title="'Создать работу'"      />
    </div>

  </template>
</template>

<script>
import BaseButton     from "@/components/elements/BaseButton";
import OrderWorksItem from "@/components/order/OrderWorksItem";
import { useStore } from "vuex";


export default {
  name: "OrderWorks",

  components: {
    BaseButton,
    OrderWorksItem
  },

  setup() {
    const store = useStore();
    store.dispatch('orderPage/fetchOrderWorks'/*, store.state.order.details.OrderID*/);
  },

  data() {
    return {
      isActive: false
    }
  },

  computed: {
    works() {
      return this.$store.state.orderPage.works;
    }
  },

  methods: {
    changeWorkStatus(index, newStatus, timeStamp) {
      this.works[index].workStatus = newStatus;
      if (newStatus === 1) {
        this.works[index].startDate = timeStamp;
      }
      else if (newStatus === 2) {
        this.works[index].finishDate = timeStamp;
      }
      //await this.$store.dispatch('orderPage/updateWorkItemStatus', {workItemId, newStatus, timeStamp});
    },

    deleteWorkItem(index) {
      this.works.splice(index, 1);
      //await this.$store.dispatch('orderPage/deleteWorkItem', workItemId);
    },

    createWorkItem() {
      this.works.push({
        workId: "987",
        startDate: "",
        finishDate: "",
        points: 0,
        workStatus: 0,
        participants: [],
        workList: []
      });
    },

    toggleParticipant(index, checked, participantId, timeStamp) {
     checked
         ? this.works[index].participants.push({ participantId: participantId, participationStart: timeStamp })
         : this.works[index].participants = this.works[index].participants.filter(el => +el.participantId !== +participantId);
      //await this.$store.dispatch('orderPage/setWorkItemParticipant', participantId, timeStamp);
    }
  }
}
</script>

<style scoped>

</style>
