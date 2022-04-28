<template>
  <template v-if="isActive">

    <div class="elz d-flex dir-y gap16">
      <template v-for="(work,index) in works" :key="index">
        <OrderWorksItem
            :work="work"
            @changeWorkStatus="(status, timeStamp) => changeWorkStatus(index, status, timeStamp)"
            @deleteWorkItem="deleteWorkItem(index)"
            @toggleParticipant="(checked, participantId, timeStamp) => toggleParticipant(index, checked, participantId, timeStamp)"
            @updateWorkCount="(id, count) => updateWorkCount(index, id, count)"
            @updateWorkList="(id, state) => updateWorkList(index, id, state)"   />
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
    store.dispatch('orderPage/fetchOrderWorks', {
      sectionId: store.state.orderPage.SECTION_ID,
      subSectionId: store.state.orderPage.ORDER_ID
    });
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
      if (newStatus === 2) {
        this.works[index].startDate = timeStamp;
      }
      else if (newStatus === 3) {
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
        workStatus: 1,
        participants: [],
        workList: []
      });
    },

    toggleParticipant(index, checked, participantId, timeStamp) {
     checked
         ? this.works[index].participants.push({ participantId: participantId, participationStart: timeStamp })
         : this.works[index].participants = this.works[index].participants.filter(el => +el.participantId !== +participantId);
     //await this.$store.dispatch('orderPage/setWorkItemParticipant', participantId, timeStamp);
    },

    updateWorkCount(index, id, count) {
      if (typeof +count === 'number' && +count !== 0) {
        this.works[index].workList.find(el => +el.id === +id).count = count;
      } else {
        this.works[index].workList = this.works[index].workList.filter(el => +el.id !== +id);
      }
      //await this.$store.dispatch('orderPage/updateWorkItemList', id, count);
    },

    updateWorkList(index, id, state) {
      state
          ? this.works[index].workList.push({id: id, count: 1})
          : this.works[index].workList = this.works[index].workList.filter(el => +el.id !== +id);
      //await this.$store.dispatch('orderPage/updateWorkItemList', id, count);
    }
  }
}
</script>

<style scoped>

</style>
