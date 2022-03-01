<template>

  <div class="elz  p-rel d-flex dir-y rT4 rB3 bg bg-primary bgL5 bsh-default2">

    <div @click="toOrderDetails" class="elz d-flex fn16 al-center cur-pointer opAct07 cHovOut" title="Открыть карточку заявки">
      <div class="elz d-flex a-X w50p p16 rEA3 bg bg-primary bgL-5 bgHovInL-10">
        <div v-if="orderIsImportant" title="Срочно" style="--elzMsk: url('/style/icons/fire.svg');" class="elz p-rel d-block p-rel mskBef s16 mT-2 mR8 cFillBef bgBef-CC fn fn-danger fnLF-10 fnFL"></div>
        <div class="elz d-block"># {{ order.OrderID }}</div>
      </div>
      <div :class="statusColor" class="elz d-block w50p p16 rEB3 bg fn bgHovInL-10">{{ statusName }}</div>
    </div>

    <div class="elz d-block p-rel showSelOut invSelOut grow ">
      <div class="elz d-block invSelIn">
        <div class="elz d-flex a-H pV8 pH16 mH8 fn14 lh14 al-center borB1 hmn80 br br-primary brL-5 brLF20 brFD bold">
          <div class="elz d-block al-center grow">{{ order.Descr }}</div>
        </div>
        <div class="elz d-block p20">
          <div class="elz d-block  mT-16">
            <div @click="datepicker = true" class="elz d-flex a-H mT20 cur-pointer fn fn-link-inline fnHovL10 opAct07 underlineHov" title="Дата и время визита к клиенту">
              <div class="elz d-block p-rel noShrink mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/truck.svg');"></div>
              <div class="elz d-block mL8"><b class="elz bold">{{ meetingDateTime }}</b></div>
            </div>
            <div class="elz d-flex a-H mT20" title="Срок выполнения">
              <div class="elz d-block p-rel noShrink mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/clock.svg');"></div>
              <div class="elz d-block mL8"><b class="elz bold">{{ orderDate }}</b>&nbsp;({{ order.overdueTitle }})</div>
            </div>
            <div class="elz d-flex a-H mT20 bold" title="Название клиента">
              <div class="elz d-block p-rel noShrink mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/users.svg');"></div>
              <div class="elz d-block mL8">{{ order.CustomerName || 'клиент не указан' }}</div>
            </div>
            <div class="elz d-flex a-H mT20" title="Тип заявки">
              <div class="elz d-block p-rel noShrink mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/cog.svg');"></div>
              <div class="elz d-block mL8">{{ order.OrderTypeName }}</div>
            </div>
            <div class="elz d-flex a-H mT20" title="Адрес">
              <div class="elz d-block p-rel noShrink mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/home.svg');"></div>
              <div class="elz d-block mL8">{{ this.order.Place || 'адрес не указан' }}</div>
            </div>
            <div class="elz d-flex a-H mT20" title="Подразделение">
              <div class="elz d-block p-rel noShrink mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/briefcase.svg');"></div>
              <div class="elz d-block mL8">{{ order.DepartmentName }}</div>
            </div>
            <div @click="showResponsibleDetails" class="elz d-flex a-H mT20 bold cur-pointer fn fn-link-inline fnHovL10 opAct07 underlineHov" title="Ответственный">
              <div class="elz d-block p-rel noShrink mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/user.svg');"></div>
              <div class="elz d-block mL8">{{ order.responsibleName }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="elz p-abs p-F d-block p-abs oAuto showSelIn">
        <OrderCardDetails v-if="hasComments" :title="order.Descr" :contacts="order.Contacts" :comments="order.Comments" />
      </div>
    </div>
    <div @click="toggleOrderView" class="elz d-block pAB16 pAT6">
      <input :data-text-bef="hasComments ? 'Показать комментарий' : 'Комментарий отсутствует'" data-text-bef-check="Скрыть комментарий" type="checkbox"
             :class="hasComments ? '' : 'uDisabled'" class="elz d-flex a-X w100p h36 hAuto r3 cur-pointer bold opAct07 cTextBef cTextChkBef bg bg-primary bgL-5 bgHovL-10"  />
    </div>

    <template v-if="datepicker">
      <OrderCardPopUp @closePopUp="datepicker = false">
        <OrderDatepicker @datepickerDate="test" :currentDate="order.MeetingDateTime"/>
      </OrderCardPopUp>
    </template>

    <template v-if="responsible">
      <OrderCardPopUp @closePopUp="responsible = false">
        <div class="elz d-block s-M">
          <div class="elz d-block mAuto mT36 s64 oH rCircle">
            <img alt="" class="elz d-block s100p obj-cover" src="/style/icons/avatar.svg">
          </div>
          <div class="elz d-block fn14 al-center mT16">{{ responsibleDetails.responsibleName }}</div>
        </div>
        <div class="elz d-block s-M">
          <div class="elz d-flex a-H mT20" title="Должность">
            <div class="elz d-block p-rel noShrink mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/user.svg');"></div>
            <div class="elz d-block mL8">{{ responsibleDetails.Position }}</div>
          </div>
          <div class="elz d-flex a-H mT20" title="Подразделение">
            <div class="elz d-block p-rel noShrink mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/briefcase.svg');"></div>
            <div class="elz d-block mL8">{{ responsibleDetails.DepartmentName }}</div>
          </div>
          <div class="elz d-flex a-H mT20" title="Мобильный">
            <div class="elz d-block p-rel noShrink mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/mobile.svg');"></div>
            <div class="elz d-block mL8">{{ responsibleDetails.MobilePhone }}</div>
          </div>
          <div class="elz d-flex a-H mT20" title="Добавочный">
            <div class="elz d-block p-rel noShrink mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/phone1.svg');"></div>
            <div class="elz d-block mL8">{{ responsibleDetails.Phone }}</div>
          </div>
        </div>
      </OrderCardPopUp>
    </template>

  </div>

</template>

<script>
import {dateFormatDdMmYyyy, dateTimeFormatHHMM} from "@/helpers/formating";
import OrderCardPopUp from "@/components/OrderCardPopUp";
import OrderCardDetails from "@/components/OrderCardDetails";
import OrderDatepicker from "@/components/OrderDatepicker";

export default {
  name: "OrderCard",

  components: {
    OrderCardDetails,
    OrderCardPopUp,
    OrderDatepicker
  },

  props: {
    order: {type: Object, required: true}
  },

  data() {
    return {
      responsible: false,
      datepicker: false,
    }
  },

  computed: {
    hasComments() {
      return this.order.Comments.length || this.order.Contacts.length;
    },
    meetingDateTime() {
      if (this.order.MeetingDateTime) {
         return `${dateFormatDdMmYyyy(this.order.MeetingDateTime)} в ${dateTimeFormatHHMM(this.order.MeetingDateTime)}`;
      } else {
        return 'дата и время выезда не назначены';
      }
    },
    orderDate() {
      return dateFormatDdMmYyyy(this.order.OrderDate);
    },
    orderIsImportant() {
      return +this.order.Priority === 2 || +this.order.Priority === 3;
    },
    responsibleDetails(){
      return this.$store.state.responsibleList.find(el => +el.responsibleId === +this.order.responsibleId);
    },
    statusName() {
      return this.$store.state.filters.statuses.find(el => +el.value === +this.order.TroubleStatusID).name;
    },
    statusColor() {
      const color = this.$store.state.filters.statuses.find(el => +el.value === +this.order.TroubleStatusID).color;
      return `bg-${color} fn-${color}-t`;
    }
  },

  methods: {
    async test(date) {
      console.log('emit');
      console.log(date);
      await this.$store.dispatch('updateMeetingDateTime', {date, OrderID: this.order.OrderID});
      this.datepicker = false;
    },

    toOrderDetails() {
      this.$router.push({
        name: 'Order',
        params: { orderId: this.order.OrderID }
      });
    },

    async showResponsibleDetails() {
      // проверить есть ли данные в кэше, если нет - полуить данные по ID и сохранить
      if (!this.responsibleDetails) {
        await this.$store.dispatch('fetchResponsible', this.order.responsibleId);
      }
      this.responsible = true;
    },

    toggleOrderView(e) {
      const $elem = e.currentTarget;
      if (!$elem.children[0].classList.contains('uDisabled')) {
        $elem.previousElementSibling.classList.toggle('sel');
      }
    }
  }
}
</script>
