<template>
  <template v-if="isActive">

    <div :class="showUploader ? 'uDisabled' : ''" class="elz cnnCreateWork p-rel d-flex a-X mB48">
      <BaseButton
          @onButtonClick="setWorkItem"
          :classList="'hmn48 bg-ok bgHovL10 fn-ok-t'"
          :title="'Создать работу'"      />

      <div class="elz cnnCompletedLabel p-abs d-flex a-X gapH24 gapV8 p-R">
        <label v-if="hasFinished" class="elz d-flex a-X nowrap fn12 gap8 bold cur-pointer">
          <input @change="showFinished = !showFinished" type="checkbox" class="elz elzSwitch swOut p-rel d-block p4 w48 h24 rRound cur-pointer borAft2 noShrink fn fn-primary bgBef bg-primary bgL-20 bgLInvD bgChk-primary-t bgChkL0 brAft br-primary brL-20 brLInvD brChk-primary-t brChkL0">
          <span class="elz d-block">Завершенные</span>
        </label>
        <label v-if="hasCanceled" class="elz d-flex a-X nowrap fn12 gap8 bold cur-pointer">
          <input @change="showCancelled = !showCancelled" type="checkbox" class="elz elzSwitch swOut p-rel d-block p4 w48 h24 rRound cur-pointer borAft2 noShrink fn fn-primary bgBef bg-primary bgL-20 bgLInvD bgChk-error bgChkL0 brAft br-primary brL-20 brLInvD brChk-error brChkL0">
          <span class="elz d-block">Отмененные</span>
        </label>
      </div>
    </div>

    <div class="elz d-flex dir-y gap16">
      <template v-for="(work,index) in works" :key="work.ScoreWorkID">
        <OrderWorksItem
            :work="work"
            @changeWorkStatus="(status, timeStamp) => changeWorkStatus(index, status, timeStamp)"
            @deleteWorkItem="deleteWorkItem"
            @participantFinish="(participantId, timeStamp) => participantFinish(index, participantId, timeStamp)"
            @participantToggle="(checked, participantId, timeStamp) => participantToggle(index, checked, participantId, timeStamp)"
            @updateServicesList="(id, checked, list) => updateServicesList(index, +id, checked, list)"
            @updateServiceCount="(id, count, list) => updateServiceCount(index, +id, count, list)"   />
      </template>
    </div>

    <template v-if="showUploader">
      <Uploader
          :circleSize   = "'s120'"
          :circleWidth  = "'2'"
          :viewSettings = "'p-abs p16 r3 z10 bg bg-primary bgL5 br br-primary brL-10 brLInvD bgA50'"  />
    </template>

  </template>
</template>

<script>
import { useStore } from "vuex";
import BaseButton from "@/components/elements/BaseButton";
import OrderWorksItem from "@/components/order/OrderWorksItem";
import {onMounted, onUnmounted} from "vue";

export default {
  name: "OrderWorks",

  components: {
    BaseButton,
    OrderWorksItem
  },

  setup() {
    const store = useStore();

    const orderId = store.state.orderPage.ORDER_ID;

    store.dispatch('scoreWorks/fetchOrderWorks', {
      sectionId: store.state.orderPage.SECTION_ID,
      subSectionId: orderId
    });

    onMounted(() => {
      store.dispatch('scoreWorks/socketRegisterScoreWorks', res => {
        store.dispatch('scoreWorks/updateOrderWork', res);
      });
    });

    onUnmounted(() => {
      store.dispatch('scoreWorks/socketOffScoreWorks');
      store.state.scoreWorks.works = [];
      store.state.scoreWorks.readyState = false;
    });
  },

  data() {
    return {
      isActive: false,
      showFinished: false,
      showCancelled: false,
      showUploader: true
    }
  },

  watch: {
    isReady() {
      this.showUploader = !this.isReady;
    }
  },

  computed: {
    hasFinished() {
      return this.$store.state.scoreWorks.works.filter(el => +el.ScoreWorkStatusID === 3).length;
    },

    hasCanceled() {
      return this.$store.state.scoreWorks.works.filter(el => +el.ScoreWorkStatusID === 4).length;
    },

    isReady() {
      return this.$store.state.scoreWorks.readyState;
    },

    works() {
      if (!this.showFinished && !this.showCancelled) {
        return this.$store.state.scoreWorks.works.filter(el => el.ScoreWorkStatusID < 3);
      }
      else if (this.showFinished && !this.showCancelled) {
        return this.$store.state.scoreWorks.works.filter(el => el.ScoreWorkStatusID !== 4);
      }
      else if (!this.showFinished && this.showCancelled) {
        return this.$store.state.scoreWorks.works.filter(el => el.ScoreWorkStatusID !== 3);
      }
      else {
        return this.$store.state.scoreWorks.works;
      }
    }
  },

  methods: {
    async changeWorkStatus(index, newStatus, timeStamp) {
      const workId = +this.works[index].ScoreWorkID;
      const data = {
        workId: workId,
        params: { scoreWorkId: workId }
      }
      if (newStatus === 2) {
        await this.$store.dispatch('scoreWorks/updateOrderWorkStarted', data);
        this.works[index].StartedAt = timeStamp;
      } else if (newStatus === 3) {
        await this.$store.dispatch('scoreWorks/updateOrderWorkFinished', data);
        this.works[index].FinishedAt = timeStamp;
      }
      this.works[index].ScoreWorkStatusID = newStatus;
    },

    countServicesSummary(index) {
      let count = 0;
      let summary = 0;
      this.works[index].workServices.forEach(e => {
        count += 1;
        summary += +e.serviceAmount * +e.serviceScore;
      });
      this.works[index].ServiceCount = count;
      this.works[index].ScoreTotal = summary;
    },

    async deleteServiceItem(index, id, params) {
      await this.$store.dispatch('scoreWorks/deleteOrderWorkService', params);
      this.works[index].workServices = this.works[index].workServices.filter(({scoreServiceId}) => +scoreServiceId !== id);
    },

    async deleteWorkItem(id) {
      await this.$store.dispatch('scoreWorks/deleteOrderWork', id);
    },

    getServiceParams(index, id) {
      return {
        scoreWorkId: this.works[index].ScoreWorkID,
        service: { scoreServiceId: id }
      }
    },

    async setWorkItem() {
      this.showUploader = true;
      const workId = await this.$store.dispatch('scoreWorks/setOrderWork',{
        sectionId: +this.$store.state.orderPage.SECTION_ID,
        subSectionId: +this.$store.state.orderPage.ORDER_ID
      });
      await this.$store.dispatch('scoreWorks/fetchOrderWork', workId);
      this.showUploader = false;
    },

    async participantFinish(index, participantId, timeStamp) {
      const user = this.works[index].workParticipants.find(({UserID}) => +UserID === +participantId);
      user.showUploader = true;
      await this.$store.dispatch('scoreWorks/updateOrderWorkParticipant', {
        workId: +this.works[index].ScoreWorkID,
        participantId: +participantId
      });
      user.StoppedAt = timeStamp;
      user.showUploader = false;
    },

    async participantToggle(index, checked, participantId, timeStamp) {
      const user = this.works[index].workParticipants.find(({UserID}) => +UserID === +participantId);
      user.showUploader = true;
      const data = {
        workId: +this.works[index].ScoreWorkID
      }
      if (checked) {
        data.params = { participantUserId: +participantId };
        await this.$store.dispatch('scoreWorks/setOrderWorkParticipant', data);
        user.CreatedAt = timeStamp;
        user.UserSelected = 1;
      } else {
        data.participantUserId = +participantId;
        await this.$store.dispatch('scoreWorks/deleteOrderWorkParticipant', data);
        user.CreatedAt = "";
        user.UserSelected = 0;
      }
      checked ? this.works[index].UserCount += 1 : this.works[index].UserCount -= 1;
      user.showUploader = false;
    },

    async updateServiceCount(index, id, count, list) {
      list.showUploader = true;

      const params = this.getServiceParams(index, id);
      count = parseInt(count, 0);
      if (count === 0) {
        await this.deleteServiceItem(index, id, params);
      } else {
        params.service.serviceAmount = count;
        await this.$store.dispatch('scoreWorks/updateOrderWorkService', params);
        this.works[index].workServices.find(({scoreServiceId}) => +scoreServiceId === +id).serviceAmount = count;
      }
      this.countServicesSummary(index);

      list.showUploader = false;
    },

    async updateServicesList(index, id, checked, list) {
      list.showUploader = true;

      const params = this.getServiceParams(index, id);
      if (checked) {
        await this.$store.dispatch('scoreWorks/setOrderWorkService', params);
        params.service.serviceAmount = 1;
        const scoreParams = this.$store.state.static.scoreServicesRaw.find(({ScoreServiceID}) => ScoreServiceID === id);
        params.service.serviceScore = scoreParams.ServiceScore;
        params.service.serviceTitle = scoreParams.ServiceTitle;
        this.works[index].workServices.push(params.service);
      } else {
        await this.deleteServiceItem(index, id, params);
      }
      this.countServicesSummary(index);

      list.showUploader = false;
    }
  }
}
</script>
