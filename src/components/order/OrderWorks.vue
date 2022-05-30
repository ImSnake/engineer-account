<template>
  <template v-if="isActive">
    <div class="elz cnnCreateWork p-rel d-flex a-X mB48">
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
            @deleteWorkItem="(id) => deleteWorkItem(index, id)"
            @toggleParticipant="(checked, participantId, timeStamp) => toggleParticipant(index, checked, participantId, timeStamp)"
            @updateServicesList="(id, checked) => updateServicesList(index, +id, checked)"
            @updateServiceCount="(id, count) => updateServiceCount(index, +id, count)"   />
      </template>

      <template v-if="showUploader">
        <Uploader />
      </template>

    </div>
  </template>
</template>

<script>
import { useStore } from "vuex";
import { io } from 'socket.io-client';
import BaseButton     from "@/components/elements/BaseButton";
import OrderWorksItem from "@/components/order/OrderWorksItem";

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


    // ===========================================================================

    //const socket = io('https://172.16.220.252:24136');
    const socket = io('https://172.16.220.252:24236');

    console.log(socket);

    socket.on("connect_error", (e) => {
      console.log(e);
      console.log('connection error');
    });

    socket.emit('switch_order',  store.state.orderPage.ORDER_ID);

    socket.on('order_message_work', function(res) {
      console.log(res);
      store.dispatch('updateOrderWorks', res);
    });

  },

  data() {
    return {
      isActive: false,
      showFinished: false,
      showCancelled: false,
      showUploader: false
    }
  },

  computed: {
    hasFinished() {
      return this.$store.state.orderPage.works.filter(el => +el.ScoreWorkStatusID === 3).length;
    },

    hasCanceled() {
      return this.$store.state.orderPage.works.filter(el => +el.ScoreWorkStatusID === 4).length;
    },

    works() {
      if (!this.showFinished && !this.showCancelled) {
        return this.$store.state.orderPage.works.filter(el => el.ScoreWorkStatusID < 3);
      } else if (this.showFinished && !this.showCancelled) {
        return this.$store.state.orderPage.works.filter(el => el.ScoreWorkStatusID !== 4);
      } else if (!this.showFinished && this.showCancelled) {
        return this.$store.state.orderPage.works.filter(el => el.ScoreWorkStatusID !== 3);
      } else {
        return this.$store.state.orderPage.works;
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
        await this.$store.dispatch('orderPage/updateOrderWorkStarted', data);
        this.works[index].StartedAt = timeStamp;
      }
      else if (newStatus === 3) {
        await this.$store.dispatch('orderPage/updateOrderWorkFinished', data);
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
      await this.$store.dispatch('orderPage/deleteOrderWorkService', params);
      this.works[index].workServices = this.works[index].workServices.filter(({scoreServiceId}) => +scoreServiceId !== id);
    },

    async deleteWorkItem(index, id) {
      this.showUploader = true;
      await this.$store.dispatch('orderPage/deleteOrderWork', id);
      this.works.find(({ScoreWorkID}) => +ScoreWorkID === +id).ScoreWorkStatusID = 4;
      this.showUploader = false;
    },

    getServiceParams(index, id) {
      return {
        scoreWorkId: this.works[index].ScoreWorkID,
        service: { scoreServiceId: id }
      }
    },

    async setWorkItem() {
      this.showUploader = true;
      const workId = await this.$store.dispatch('orderPage/setOrderWork',{
        sectionId: +this.$store.state.orderPage.SECTION_ID,
        subSectionId: +this.$store.state.orderPage.ORDER_ID
      });
      await this.$store.dispatch('orderPage/fetchOrderWork', workId);
      this.showUploader = false;
    },

    async toggleParticipant(index, checked, participantId, timeStamp) {
      const user = this.works[index].workParticipants.find(({UserID}) => +UserID === +participantId);
      const data = {
        workId: +this.works[index].ScoreWorkID
      }
      if (checked) {
        data.params = { participantUserId: +participantId };
        await this.$store.dispatch('orderPage/setOrderWorkParticipant', data);
        user.CreatedAt = timeStamp;
        user.UserSelected = 1;
      } else {
        data.participantUserId = +participantId;
        await this.$store.dispatch('orderPage/deleteOrderWorkParticipant', data);
        user.CreatedAt = "";
        user.UserSelected = 0;
      }
      checked ? this.works[index].UserCount += 1 : this.works[index].UserCount -= 1;
    },

    async updateServiceCount(index, id, count) {
      const params = this.getServiceParams(index, id);
      count = parseInt(count, 0);
      if (count === 0) {
        await this.deleteServiceItem(index, id, params);
      } else {
        params.service.serviceAmount = count;
        await this.$store.dispatch('orderPage/updateOrderWorkService', params);
        this.works[index].workServices.find(({scoreServiceId}) => +scoreServiceId === +id).serviceAmount = count;
      }
      this.countServicesSummary(index);
    },

    async updateServicesList(index, id, checked) {
      const params = this.getServiceParams(index, id);
      if (checked) {
        await this.$store.dispatch('orderPage/setOrderWorkService', params);
        params.service.serviceAmount = 1;
        //params.service.serviceScore = this.$store.state.static.scoreServicesRaw.find(({ScoreServiceID}) => ScoreServiceID === id).ServiceScore;
        //params.service.scoreTitle = name;
        const scoreParams = this.$store.state.static.scoreServicesRaw.find(({ScoreServiceID}) => ScoreServiceID === id);
        params.service.serviceScore = scoreParams.ServiceScore;
        params.service.serviceTitle = scoreParams.ServiceTitle;
        this.works[index].workServices.push(params.service);
      } else {
        await this.deleteServiceItem(index, id, params);
      }
      this.countServicesSummary(index);
    },

  }
}
</script>
