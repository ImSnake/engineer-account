<template>
      <div class="elz p-rel d-flex grow fb280 dir-y gap16 lh12">

        <BaseButton
            @click="datepicker = true"
            :iconName="'truck'"
            :classList="[{uDisabled: order.meetingStatusId > 2},' hmn48 grow bg-primary bgL-5 bgLInvD bgHovL-10']"
            :title="formattedDateTime"   />

        <BaseButton
            @onButtonClick="confirmAction('onWayConfirm', 'onWayDateTime', 3, )"
            :iconName="onWayConfirm ? 'question' : 'location1'"
            :classList="[{uDisabled: order.meetingStatusId > 2 || !order.meetingDateTime}, 'onWayConfirm hmn48 grow bg-ok bgHovL10 fn-ok-t']"
            :title="onWayConfirm ? 'Подтвердить выезд' : titleOnWay"   />

        <BaseButton
            @onButtonClick="confirmAction('onPlaceConfirm', 'onPlaceDateTime', 4)"
            :iconName="onPlaceConfirm ? 'question' : 'flag'"
            :classList="[{uDisabled: order.meetingStatusId < 3 || order.meetingStatusId === 4}, 'onPlaceConfirm hmn48 grow bg-success bgHovL10 fn-ok-t']"
            :title="onPlaceConfirm ? 'Подтвердить прибытие' : titleOnPlace"   />

        <template v-if="datepicker">
          <PopUpWindow @closePopUp="datepicker = false" :className="'p-AT mT-8 mH-16'">
            <DateTimePicker @datepickerDate="updateMeetingDateTime" :currentDate="order.meetingDateTime"/>
          </PopUpWindow>
        </template>

      </div>
</template>

<script>
import DateTimePicker from "@/components/elements/DateTimePicker";
import PopUpWindow    from "@/components/elements/PopUpWindow";
import BaseButton     from "@/components/elements/BaseButton";

import { dateFormatDdMmYyyy, dateTimeFormatHHMM } from "@/helpers/formating";

export default {
  name: "OrderHeaderConnection",

  components: {
    BaseButton,
    DateTimePicker,
    PopUpWindow
  },

  data() {
    return {
      onWayConfirm: false,
      onPlaceConfirm: false,
      datepicker: false
    }
  },

  computed: {
    formattedDateTime() {
      return this.order.meetingDateTime ? `${dateFormatDdMmYyyy(this.order.meetingDateTime)} в ${dateTimeFormatHHMM(this.order.meetingDateTime)}` : 'Дата и время не заданы';
    },

    order() {
      return this.$store.state.orderPage.order.details;
    },

    titleOnPlace() {
      return this.order.meetingStatusId >= 4 && this.order.onPlaceDateTime? `Прибыл в ${dateTimeFormatHHMM(this.order.onPlaceDateTime)}` : 'Прибыл на место';
    },

    titleOnWay() {
      return this.order.meetingStatusId >= 3 && this.order.onWayDateTime ? `Выехал в ${dateTimeFormatHHMM(this.order.onWayDateTime)}` : 'Выехал к клиенту';
    }
  },

  methods: {
    getMeetingParams(date, status) {
      return {
        time: date,
        status: status,
        orderId: this.order.OrderID
      }
    },

    clickOut(actionName, e) {
      if (this[actionName] === false || !e.target.closest(`.${actionName}`)) {
        this[actionName] = false;
      }
    },

    async confirmAction(actionName, dateName, statusId) {
      if (!this[actionName]) {
        this[actionName] = true;
        document.addEventListener("click", this.clickOut.bind(null, actionName), { capture: true, once:true });
      } else {
        this.order[dateName] = this.timeStampNow();
        this.order.meetingStatusId = statusId;
        await this.$store.dispatch('orderPage/updateMeetingDateTime', this.getMeetingParams(this.order[dateName], this.order.meetingStatusId));
        this[actionName] = false;
      }
    },

    timeStampNow() {
      const date = new Date();
      return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
    },

    async updateMeetingDateTime(date) {
      this.order.meetingStatusId =  date ? 2 : 1;
      await this.$store.dispatch('orderPage/updateMeetingDateTime', this.getMeetingParams(date, this.order.meetingStatusId));
      this.order.meetingDateTime = date;
      this.datepicker = false;
    }
  }

}
</script>

<style scoped>

</style>
