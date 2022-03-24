<template>

      <div class="elz p-rel d-flex grow fb280 dir-y gap16 lh12">

        <BaseButton @click="datepicker = true"
            :iconName="'truck'"
            :classList="'hmn48 grow bg-primary bgL-5 bgLInvD bgHovL-10'"
            :title="meetingDateTime"   />

        <BaseButton @onButtonClick="onButtonClick"
            :iconName="'location1'"
            :classList="'hmn48 grow bg-ok bgHovL10 fn-ok-t'"
            :title="'Выехал на место'"   />

        <BaseButton @onButtonClick="onButtonClick"
            :iconName="'flag'"
            :classList="'hmn48 grow bg-success bgHovL10 fn-ok-t'"
            :title="'Прибыл на место'"   />

        <template v-if="datepicker">
          <PopUpWindow @closePopUp="datepicker = false" :className="'p-AT mT-8 mH-16'">
            <DateTimePicker @datepickerDate="updateMeetingDateTime" :currentDate="order.MeetingDateTime"/>
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
      datepicker: false,
    }
  },

  computed: {
    meetingDateTime() {
      if (this.order.MeetingDateTime.length > 1) {
        return `${dateFormatDdMmYyyy(this.order.MeetingDateTime)} в ${dateTimeFormatHHMM(this.order.MeetingDateTime)}`;
      } else {
        return 'Дата и время не заданы';
      }
    },

    order() {
      return this.$store.state.orderPage.order.details;
    }
  },

  methods: {
    onButtonClick() {
      console.log('button is clicked');
    },

    async updateMeetingDateTime(date) {
      await this.$store.dispatch('orderPage/updateOrderMeetingDateTime', date);
      this.datepicker = false;
    }
  }

}
</script>

<style scoped>

</style>
