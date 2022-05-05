<template>
  <div class="elz  p-rel d-flex dir-y rT4 rB3 bg bg-primary bgL5 bsh-default2">

    <a @click="toOrderDetails" :href="orderPath" class="elz d-flex fn16 al-center cur-pointer opAct07 cHovOut" title="Открыть карточку заявки">
      <div class="elz d-flex a-X w50p p16 rEA3 bg bg-primary bgL-5 bgHovInL-10">
        <div v-if="orderIsImportant" title="Срочно" style="--elzMsk: url('/style/icons/fire.svg');" class="elz p-rel d-block p-rel mskBef s16 mT-2 mR8 cFillBef bgBef-CC fn fn-danger fnLF-10 fnFL"></div>
        <div class="elz d-block"># {{ order.OrderID }}</div>
      </div>
      <div :class="statusColor" class="elz d-block w50p p16 rEB3 bg fn bgHovInL-10">{{ statusName }}</div>
    </a>

    <div class="elz d-block p-rel showSelOut invSelOut grow ">
      <div class="elz d-block invSelIn">
        <div class="elz d-flex a-H pV8 pH16 mH8 fn14 lh14 al-center borB1 hmn80 br br-primary brL-5 brLF20 brFD bold">
          <div class="elz d-block al-center grow">{{ order.Descr }}</div>
        </div>
        <div class="elz d-block p20">
          <div class="elz d-block  mT-16">
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
              <div class="elz d-block mL8">{{ this.order.Place || 'Адрес не указан' }}</div>
            </div>
            <div class="elz d-flex a-H mT20" title="Подразделение">
              <div class="elz d-block p-rel noShrink mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/briefcase.svg');"></div>
              <div class="elz d-block mL8">{{ order.DepartmentName }}</div>
            </div>
            <div @click="showResponsibleDetails" class="elz d-flex a-H mT20 bold cur-pointer fn fn-link-inline fnHovL10 opAct07 underlineHov" title="Ответственный">
              <div class="elz d-block p-rel noShrink mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/user.svg');"></div>
              <div class="elz d-block mL8">{{ order.ResponsibleName }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="elz p-abs p-F d-block p-abs oAuto showSelIn">
        <OrdersCardDetails v-if="hasComments" :title="order.Descr" :contacts="order.Contacts.trim()" :comments="order.Comments.trim()" />
      </div>
    </div>

    <div @click="toggleOrderView" class="elz d-block pAB16 pAT6">
      <input :class="hasComments ? '' : 'uDisabled'" :data-text-bef="hasComments ? 'Показать комментарий' : 'Комментарий отсутствует'" data-text-bef-check="Скрыть комментарий" type="checkbox" class="elz d-flex a-X w100p h36 hAuto r3 cur-pointer bold opAct07 cTextBef cTextChkBef bg bg-primary bgL-5 bgHovL-10"  />
    </div>

    <template v-if="responsible">
      <PopUpWindow @closePopUp="responsible = false" :className="'p-F m4'">
        <div class="elz d-block s-M">
          <div class="elz d-block mAuto mT36 s64 oH rCircle">
            <img alt="" class="elz d-block s100p obj-cover" src="/style/icons/avatar.svg">
          </div>
          <div class="elz d-block fn14 al-center mT16">{{ responsibleDetails.ResponsibleName }}</div>
        </div>
        <div class="elz d-block s-M">
          <div v-if="responsibleDetails.Position" class="elz d-flex a-H mT20" title="Должность">
            <div class="elz d-block p-rel noShrink mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/user.svg');"></div>
            <div class="elz d-block mL8">{{ responsibleDetails.Position }}</div>
          </div>
          <div v-if="responsibleDetails.DepartmentName" class="elz d-flex a-H mT20" title="Подразделение">
            <div class="elz d-block p-rel noShrink mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/briefcase.svg');"></div>
            <div class="elz d-block mL8">{{ responsibleDetails.DepartmentName }}</div>
          </div>
          <div v-if="responsibleDetails.Email" class="elz d-flex a-H mT20" title="Мобильный">
            <div class="elz d-block p-rel noShrink mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/mail.svg');"></div>
            <div class="elz d-block mL8">{{ responsibleDetails.Email }}</div>
          </div>
          <div v-if="responsibleDetails.MobilePhone" class="elz d-flex a-H mT20" title="Мобильный">
            <div class="elz d-block p-rel noShrink mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/mobile.svg');"></div>
            <div class="elz d-block mL8">{{ responsibleDetails.MobilePhone }}</div>
          </div>
          <div v-if="responsibleDetails.Phone" class="elz d-flex a-H mT20" title="Добавочный">
            <div class="elz d-block p-rel noShrink mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/phone1.svg');"></div>
            <div class="elz d-block mL8">{{ responsibleDetails.Phone }}</div>
          </div>
        </div>
      </PopUpWindow>
    </template>

  </div>
</template>

<script>
import PopUpWindow       from "@/components/elements/PopUpWindow";
import OrdersCardDetails from "@/components/orders/OrdersCardDetails";
import { dateFormatDdMmYyyy } from "@/helpers/formating";

export default {
  name: "OrdersCard",

  components: {
    OrdersCardDetails,
    PopUpWindow,
  },

  props: {
    order: { type: Object, required: true }
  },

  data() {
    return {
      responsible: false
    }
  },

  computed: {
    hasComments() {
      return this.order.Comments.trim().length || this.order.Contacts.trim().length;
    },

    orderDate() {
      return dateFormatDdMmYyyy(this.order.OrderDate);
    },

    orderIsImportant() {
      return +this.order.Priority === 2 || +this.order.Priority === 3;
    },

    orderPath() {
      return `${window.location.href}/order/${this.order.OrderID}`;
    },

    responsibleDetails(){
      return this.$store.state.static.responsibleList.find(el => +el.ResponsibleID === +this.order.ResponsibleID);
    },

    statusName() {
      return this.$store.state.static.filters.statuses.find(el => +el.value === +this.order.TroubleStatusID).name;
    },

    statusColor() {
      const color = this.$store.state.static.filters.statuses.find(el => +el.value === +this.order.TroubleStatusID).color;
      return `bg-${color} fn-${color}-t`;
    }
  },

  methods: {
    async showResponsibleDetails() {
      if (!this.responsibleDetails) {
        await this.$store.dispatch('static/fetchResponsible', this.order.ResponsibleID);
      }
      this.responsible = true;
    },

    toOrderDetails() {
      this.$router.push({
        name: 'Order',
        params: { orderId: this.order.OrderID }
      });
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
