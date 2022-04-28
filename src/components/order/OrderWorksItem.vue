<template>
    <div :class="isClosed ? '' : 'sel'" class="elz d-block mB16 bor1 r3 bg bg-primary bgL5 br br-primary brL-10 brLInvD hideSelOut showSelOut">
      <div @click="isClosed = !isClosed" class="elz d-flex gap8 a-H p16 opAct07 cur-pointer">
        <div class="elz d-flex f-wrap a-H grow gap8">
          <div class="elz d-block grow fb320 lh12">
            <div class="elz d-flex">
              <div class="bg-success fn-success-t elz d-block mR8 pH8 lh10 fn10 bold rRound pV4 pH6 bg fn">Будет статус</div>
              <div class="elz d-block">Работа #{{ work.workId }}</div>
            </div>

            <div class="elz d-flex f-wrap gapH16 gapV4 fn11 mT6 nowrap">
              <div class="elz d-block">Начато: <b class="elz bold">{{ setDateTime(work.startDate, 'Время не задано') }}</b></div>
              <div class="elz d-block">Завершено: <b class="elz bold">{{ setDateTime(work.finishDate, 'Время не задано') }}</b></div>
            </div>
          </div>
          <div class="elz d-flex f-wrap fn12 gapH16 gapV8">
            <div class="elz d-flex a-H gap8 wmn64 cur-help" :title="`Участников: ${work.participants.length}`">
              <div class="elz p-rel d-block p-rel mskBef s16 cFillBef bgBef-CC msk-contain" style="--elzMsk: url('/style/icons/user.svg');"></div>
              <div class="elz d-block bold">{{ work.participants.length }}</div>
            </div>
            <div class="elz d-flex a-H gap8 wmn64 cur-help" :title="`Баллов начислено: ${pointsSummary}`">
              <div class="elz p-rel d-block p-rel mskBef s16 cFillBef bgBef-CC msk-contain" style="--elzMsk: url('/style/icons/star3.svg');"></div>
              <div class="elz d-block bold">{{ pointsSummary }}</div>
            </div>
            <div class="elz d-flex a-H gap8 wmn64 cur-help" :title="`Работ выполняется: ${work.workList.length}`">
              <div class="elz p-rel d-block p-rel mskBef w20 h16 cFillBef bgBef-CC msk-contain" style="--elzMsk: url('/style/icons/hammer-wrench.svg');"></div>
              <div class="elz d-block bold">{{ work.workList.length }}</div>
            </div>
          </div>
        </div>
        <div class="elz p-rel d-block noShrink p-rel mskBef s8 deg180 cFillBef bgBef-CC hideSelIn" style="--elzMsk: url('/style/icons/arrow1.svg');"></div>
        <div class="elz p-rel d-block noShrink p-rel mskBef s8 cFillBef bgBef-CC showSelIn" style="--elzMsk: url('/style/icons/arrow1.svg');"></div>
      </div>
      <div class="elz d-block borT1 br br-primary brL-10 brLInvD fn12 showSelIn">
        <div class="elz p-sticky p-TEP pH16 pV8 mV16 z10 bg bg-primary bgL5">
          <div class="elz p-rel d-flex pH36 f-wrap a-X gap8">

            <BaseButton
                @onButtonClick="confirmChangeWorkStatus"
                :classList="['changeWorkStatus hmn36 ', buttonClass]"
                :title="buttonTitle"   />

            <div v-if="+work.workStatus === 1" @click="confirmDeleteAction" class="deleteWorkItem elz p-abs p-R d-flex gap8 a-X al-center r3 s36 cur-pointer opAct07 bg bg-error bgHovL10 fn fn-error-t">
              <div class="elz p-rel d-block p-rel mskBef s16 cFillBef bgBef-CC" :style="`--elzMsk: url('/style/icons/${deleteWorkItem ? 'trash' : 'cross1'}.svg');`"></div>
            </div>
          </div>
        </div>
        <div class="elz d-grid gap8 grH200 pH16">
          <label v-for="(participant, index) in participants" :key="index" :class="(+work.workStatus === 3) ? 'uDisabled' : ''" class="elz d-flex a-H r3 bor1 pH16 pV10 opAct07 cur-pointer bg bg-primary br br-primary brL-10 brHovL-15 brLInvD">
            <input type="checkbox" :checked="participantTitle(participant.responsibleId)" @input="(e) => $emit('toggleParticipant', e.currentTarget.checked, participant.responsibleId, timeStampNow())" class="elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s24 p4 r2 cLInvD bg bg-primary bgL10 br br-primary brL-10 brHovL-20 fn fn-primary-t fnHovL-5 bshAct-inset1">
            <span class="elz d-block growX mL16">
              <span class="elz d-block bold lh12 oH ellipsis nowrap">{{ participant.responsibleName }}</span>
              <span class="elz d-block fn11 mT8">{{ setDateTime(participantTitle(participant.responsibleId), 'Не назначен') }}</span>
            </span>
          </label>
        </div>
        <div class="elz d-block mT16 r3 oH">
          <template v-for="(list, index) in $store.state.static.scoreServices" :key="index">
            <CheckboxInputFieldWrapper
                @updateWorkCount="(id, count) => $emit('updateWorkCount', id, count)"
                @updateWorkList="(id, state) => $emit('updateWorkList', id, state)"
                :isDisabled="+work.workStatus === 3"
                :itemsList="list"
                :itemsSelected="work.workList"   />
          </template>
        </div>
      </div>
    </div>
</template>

<script>
import BaseButton from "@/components/elements/BaseButton";
import CheckboxInputFieldWrapper from "@/components/elements/CheckboxInputFieldWrapper";

import {dateFormatDdMmYyyy, dateTimeFormatHHMM} from "@/helpers/formating";

export default {
  name: "OrderWorksItem",

  components: {
    BaseButton,
    CheckboxInputFieldWrapper,
  },

  emits: [ 'changeWorkStatus', 'deleteWorkItem', 'toggleParticipant', 'updateWorkCount', 'updateWorkList' ],

  props: {
    work: { required: true,  type: Object }
  },

  data() {
    return {
      isClosed: true,
      deleteWorkItem: false,
      changeWorkStatus: false,
    }
  },

  computed: {
    buttonClass() {
      let classList = '';
      switch(+this.work.workStatus) {
        case 1:
          classList = 'bg-ok bgHovL10 fn-ok-t';
          break;
        case 2:
          classList = 'bg-success bgHovL10 fn-success-t';
          break;
        case 3:
          classList = 'bg-primary bgL-5 bgLInvD bgHovL-10 uDisabled';
      }
      return classList;
    },

    buttonTitle() {
      let title = '';
      switch(+this.work.workStatus) {
        case 1:
          title = 'Начать работу';
          break;
        case 2:
          title = 'Завершить работу';
          break;
        case 3:
          title = 'Работы завершены';
      }
      title += (this.changeWorkStatus) ? "?" : "";
      return title;
    },

    participants() {
      return this.$store.state.orderPage.order.details.responsibleList;
    },

    pointsSummary() {
      let summary = 0;
      this.work.workList.forEach(selectedWork => {
        this.$store.state.static.scoreServices.forEach(workCategory => {
          const workSum = workCategory.list.find(el => +el.id === +selectedWork.id)?.sum;
          if(workSum) {
            summary += +selectedWork.count * +workSum;
          }
        })
      });
      return summary.toFixed(2);
    }
  },

  methods: {

    setDateTime(date, defaultTitle) {
      return (date) ? `${dateFormatDdMmYyyy(date)} в ${dateTimeFormatHHMM(date)}` : defaultTitle;
    },

    clickOut(actionName, e) {
      if (this[actionName] === false || !e.target.closest(`.${actionName}`)) {
        this[actionName] = false;
      }
    },

    confirmDeleteAction() {
      if (!this.deleteWorkItem) {
        this.deleteWorkItem = true;
        document.addEventListener("click", this.clickOut.bind(null, 'deleteWorkItem'), { capture: true, once:true });
      } else {
        this.$emit('deleteWorkItem');
      }
    },

    confirmChangeWorkStatus() {
      if (!this.changeWorkStatus) {
        this.changeWorkStatus = true;
        document.addEventListener("click", this.clickOut.bind(null, 'changeWorkStatus'), { capture: true, once:true });
      } else {
        this.$emit('changeWorkStatus', +this.work.workStatus + 1, this.timeStampNow());
        this.changeWorkStatus = false;
      }
    },

    participantTitle(participantId) {
      return this.work.participants.find(el => +el.participantId === +participantId)?.participationStart;
    },

    timeStampNow() {
      const date = new Date();
      return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
    },

  }
}
</script>

<style scoped>

</style>
