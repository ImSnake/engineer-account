<template>
    <div :class="isClosed ? '' : 'sel'" class="elz p-rel d-block mB16 bor1 r3 bg bg-primary bgL5 br br-primary brL-10 brLInvD hideSelOut showSelOut">
      <div @click="toggleWorkItem" class="elz d-flex gap8 a-H p16 opAct07 cur-pointer">
        <div class="elz d-flex f-wrap a-H grow gap8">
          <div class="elz d-block grow fb320 lh12">
            <div class="elz d-flex">
              <div :class="statusClass" class="elz d-block mR8 pH8 lh10 fn10 bold rRound pV4 pH6 bg fn" style="min-width: 64px; text-align: center;">{{ statusTitle }}</div>
              <div class="elz d-block">Работа #{{ work.ScoreWorkID }}</div>
            </div>
            <div class="elz d-flex f-wrap gapH16 gapV4 fn11 mT6 nowrap">
              <div class="elz d-block">Начато: <b class="elz bold">{{ setDateTime(work.StartedAt, 'Время не задано') }}</b></div>
              <div class="elz d-block">Завершено: <b class="elz bold">{{ setDateTime(work.FinishedAt, 'Время не задано') }}</b></div>
            </div>
          </div>
          <div class="elz d-flex f-wrap fn12 gapH16 gapV8">
            <div class="elz d-flex a-H gap8 wmn64 cur-help" :title="`Участников: ${work.UserCount}`">
              <div class="elz p-rel d-block p-rel mskBef s16 cFillBef bgBef-CC msk-contain" style="--elzMsk: url('/style/icons/user.svg');"></div>
              <div class="elz d-block bold">{{ work.UserCount }}</div>
            </div>
            <div class="elz d-flex a-H gap8 wmn64 cur-help" :title="`Баллов начислено: ${+work.ScoreTotal.toFixed(2)}`">
              <div class="elz p-rel d-block p-rel mskBef s16 cFillBef bgBef-CC msk-contain" style="--elzMsk: url('/style/icons/star3.svg');"></div>
              <div class="elz d-block bold">{{ +work.ScoreTotal.toFixed(2) }}</div>
            </div>
            <div class="elz d-flex a-H gap8 wmn64 cur-help" :title="`Работ выполняется: ${work.ServiceCount}`">
              <div class="elz p-rel d-block p-rel mskBef w20 h16 cFillBef bgBef-CC msk-contain" style="--elzMsk: url('/style/icons/hammer-wrench.svg');"></div>
              <div class="elz d-block bold">{{ work.ServiceCount }}</div>
            </div>
          </div>
        </div>
        <div class="elz p-rel d-block noShrink p-rel mskBef s8 deg180 cFillBef bgBef-CC hideSelIn" style="--elzMsk: url('/style/icons/arrow1.svg');"></div>
        <div class="elz p-rel d-block noShrink p-rel mskBef s8 cFillBef bgBef-CC showSelIn" style="--elzMsk: url('/style/icons/arrow1.svg');"></div>
      </div>
      <div v-if="work.hasDetails" class="elz d-block borT1 br br-primary brL-10 brLInvD fn12 showSelIn">
        <div class="elz p-sticky p-TEP pH16 pV8 mV16 z10 bg bg-primary bgL5">
          <div class="elz p-rel d-flex pH36 f-wrap a-X gap8">
            <BaseButton
                @onButtonClick="confirmChangeWorkStatus"
                :classList="['changeWorkStatus hmn36 ', buttonClass]"
                :title="buttonTitle"   />
            <div v-if="+work.ScoreWorkStatusID === 1" @click="confirmDeleteAction" class="deleteWorkItem elz p-abs p-R d-flex gap8 a-X al-center r3 s36 cur-pointer opAct07 bg bg-error bgHovL10 fn fn-error-t">
              <div class="elz p-rel d-block p-rel mskBef s16 cFillBef bgBef-CC" :style="`--elzMsk: url('/style/icons/${deleteWorkItem ? 'trash' : 'cross1'}.svg');`"></div>
            </div>
          </div>
        </div>
        <div class="elz d-grid gap8 grH240 pH16">
          <div v-for="participant in participantList" :key="participant.UserID" :class="(+work.ScoreWorkStatusID >= 3 || participant.StoppedAt) ? 'uDisabled' : ''" class="p-rel d-flex a-H r3 bor1 bg bg-primary br br-primary brL-10 brHovL-15 brLInvD">

            <label :class="participant.StoppedAt ? 'hide' : 'or1'" class="p-rel d-flex a-X pV12 pH16 s-SV cur-pointer or1" title="Назначить / снять участника">
              <input type="checkbox" :checked="!!participant.UserSelected" @input="(e) => $emit('toggleParticipant', e.currentTarget.checked, participant.UserID, timeStampNow())" class="elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s24 p4 r2 cLInvD bg bg-primary bgL10 br br-primary brL-10 brHovL-20 fn fn-primary-t fnHovL-5 bshAct-inset1">
            </label>

            <div class="elz d-block growX hmn32 pV12 or2">
              <div class="elz d-block bold lh12 oH ellipsis nowrap">{{ participant.UserName }}</div>
              <div class="elz d-block fn11 mT4">{{ setDateTime(participant.CreatedAt, 'Не назначен') }}</div>
            </div>

            <div @click="finishParticipation(participant.UserID)" v-if="participant.UserSelected" :class="participant.StoppedAt ? 'or1' : 'or3'" class="elz d-flex a-PR wmn56 pR16 s-SV cur-pointer opAct07 fnHov fnHov-primary-t fnHovL-20 fnHovLInvD" title="Завершить участие">
              <div class="elz d-flex a-X noShrink r3 s32">
                <div class="elz d-flex a-X rRound bor2 s20 noShrink br-CC">
                  <div class="elz p-rel d-block p-rel noShrink mskBef s8 cFillBef bgBef-CC" style="--elzMsk: url('https://lelouch.ru/dev/elize/design/icons/stop.svg');"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div v-if="+work.ScoreWorkStatusID < 3" class="elz d-block mT16 r3 oH">
          <template v-for="(list, index) in $store.state.static.scoreServices" :key="index">
            <CheckboxInputFieldWrapper
                @updateServicesList="(id, checked) => $emit('updateServicesList', id, checked)"
                @updateServiceCount="(id, count) => $emit('updateServiceCount', id, count)"
                :isDisabled="false"
                :itemsList="list"
                :itemsSelected="work.workServices"   />
          </template>
        </div>

        <div v-else class="elz d-block mT16 r3 oH">
          <template v-for="(list, index) in loggedServices" :key="index">
            <CheckboxInputFieldWrapper
                :isDisabled="true"
                :itemsList="list"
                :itemsSelected="work.workServices"   />
          </template>
        </div>
      </div>

      <template v-if="showUploader">
        <Uploader
            :circleSize = "'s32'"
            :circleWidth = "'2'"
            :viewSettings = "'p-abs p16 r3 z5 bg bg-primary bgL5 br br-primary brL-10 brLInvD bgA50'"  />
      </template>

    </div>
</template>

<script>
import BaseButton from "@/components/elements/BaseButton";
import CheckboxInputFieldWrapper from "@/components/elements/CheckboxInputFieldWrapper";
import { dateFormatDdMmYyyy, dateTimeFormatHHMM } from "@/helpers/formating";

export default {
  name: "OrderWorksItem",

  components: {
    BaseButton,
    CheckboxInputFieldWrapper,
  },

  emits: [ 'changeWorkStatus', 'deleteWorkItem', 'toggleParticipant', 'updateServiceCount', 'updateServicesList' ],

  props: {
    work: { required: true,  type: Object }
  },

  setup() {
    const workStatusProps = [
      {
        statusId: 1,
        buttonClass: 'bg-ok bgHovL10 fn-ok-t',
        buttonTitle: 'Начать работу',
        tagClass: 'bg-ok fn-ok-t'
      },
      {
        statusId: 2,
        buttonClass: 'bg-success bgHovL10 fn-success-t',
        buttonTitle: 'Завершить работу',
        tagClass: 'bg-success fn-success-t'
      },
      {
        statusId: 3,
        buttonClass: 'bg-primary-t fn-primary bgLInvD bgHovL-10 uDisabled',
        buttonTitle: 'Работы завершены',
        tagClass: 'bg-primary-t fn-primary'
      },
      {
        statusId: 4,
        buttonClass: 'bg-error fn-error-t bgL-5 bgLInvD bgHovL-10 uDisabled',
        buttonTitle: 'Работы отменены',
        tagClass: 'bg-error fn-error-t '
      }
    ];
    return { workStatusProps }
  },

  data() {
    return {
      isClosed: true,
      deleteWorkItem: false,
      changeWorkStatus: false,
      showUploader: false
    }
  },

  created() {
    if (this.work.isOpened) {
      this.isClosed = false;
    }
  },

  computed: {
    buttonClass() {
      return this.workStatusProps.find(({statusId}) => +statusId === this.work.ScoreWorkStatusID)?.buttonClass;
    },

    buttonTitle() {
      let title = this.workStatusProps.find(({statusId}) => +statusId === this.work.ScoreWorkStatusID)?.buttonTitle;
      return title += this.changeWorkStatus ? "?" : "";
    },

    loggedServices() {
      let services = [];

      if (this.work.workServices.length) {
        const list = [];
        this.work.workServices.forEach(({scoreServiceId, serviceScore, serviceTitle}) => {
          list.push({
            id: scoreServiceId,
            name: serviceTitle,
            value: serviceScore
          });
        });

        list.sort(function (a, b) {
          return a.id - b.id;
        });

        services.push({
          categoryId: 0,
          name: 'Выбранные работы',
          list: list
        });
      }

      return services;
    },

    participantList() {
      return this.work.ScoreWorkStatusID < 3 ? this.work.workParticipants : this.work.workParticipants.filter(({UserSelected}) => +UserSelected === 1);
    },

    statusTitle() {
      return this.$store.state.static.workStatuses.find(({ScoreWorkStatusID}) => +ScoreWorkStatusID === +this.work.ScoreWorkStatusID)?.StatusTitle;
    },

    statusClass() {
      return this.workStatusProps.find(({statusId}) => statusId === +this.work.ScoreWorkStatusID)?.tagClass;
    }
  },

  methods: {
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
        this.$emit('deleteWorkItem', this.work.ScoreWorkID);
      }
    },

    confirmChangeWorkStatus() {
      if (!this.changeWorkStatus) {
        this.changeWorkStatus = true;
        document.addEventListener("click", this.clickOut.bind(null, 'changeWorkStatus'), { capture: true, once:true });
      } else {
        this.$emit('changeWorkStatus', +this.work.ScoreWorkStatusID + 1, this.timeStampNow());
        this.changeWorkStatus = false;
      }
    },

    finishParticipation(userId) {
      const user = this.work.workParticipants.find(({UserID}) => UserID === userId);
      user.StoppedAt = this.timeStampNow();
      this.$store.dispatch('scoreWorks/updateOrderWorkParticipant', {
        workId: +this.work.ScoreWorkID,
        participantId: +userId
      });
    },

    setDateTime(date, defaultTitle) {
      return (date) ? `${dateFormatDdMmYyyy(date)} в ${dateTimeFormatHHMM(date)}` : defaultTitle;
    },

    timeStampNow() {
      const date = new Date();
      return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
    },

    async toggleWorkItem() {
      if (this.isClosed && !this.work.hasDetails) {
        this.showUploader = true;
        await this.$store.dispatch('scoreWorks/fetchOrderWorkDetails', this.work.ScoreWorkID);
        this.showUploader = false;
      }
      this.isClosed = !this.isClosed;
    },
  }
}
</script>

<style scoped>

</style>
