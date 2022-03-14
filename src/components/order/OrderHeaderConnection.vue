<template>

      <div class="elz p-rel d-flex grow fb280 dir-y gap16 lh12">
        <div class="elz d-flex gap8 grow">
          <div @click="datepicker = true" class="elz d-flex gap8 a-X grow r3 hmn48 pH32 cur-pointer opAct07 bg bg-primary bgL-5 bgLInvD bgHovL-10">
            <div class="elz p-rel d-block p-rel noShrink mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/clock.svg');"></div>
            <div class="elz d-block grow al-center">{{ meetingDateTime }}</div>
          </div>
        </div>
        <div class="elz d-flex gap8 grow">
          <div class="elz d-flex gap8 a-X grow r3 hmn48 pH32 cur-pointer opAct07 bg bg-ok bgHovL10 fn fn-ok-t">
            <div class="elz p-rel d-block p-rel noShrink mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/location1.svg');"></div>
            <div class="elz d-block grow al-center">Выехал на место</div>
          </div>
        </div>
        <div class="elz d-flex gap8 grow">
          <div class="elz d-flex gap8 a-X grow r3 hmn48 pH32 cur-pointer opAct07 bg bg-success bgHovL10 fn fn-ok-t">
            <div class="elz p-rel d-block p-rel noShrink mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/flag.svg');"></div>
            <div class="elz d-block grow al-center">Прибыл на место</div>
          </div>
        </div>

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

import { dateFormatDdMmYyyy, dateTimeFormatHHMM } from "@/helpers/formating";

export default {
  name: "OrderHeaderConnection",

  components: {
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
      if (this.order.MeetingDateTime) {
        return `${dateFormatDdMmYyyy(this.order.MeetingDateTime)} в ${dateTimeFormatHHMM(this.order.MeetingDateTime)}`;
      } else {
        return 'Дата и время не заданы';
      }
    },

    order() {
      return this.$store.state.orderData.orderDetails;
    }
  },

  methods: {
    async updateMeetingDateTime(date) {
      await this.$store.dispatch('updateOrderMeetingDateTime', date);
      this.datepicker = false;
    }
  }

}
</script>

<style scoped>

</style>
