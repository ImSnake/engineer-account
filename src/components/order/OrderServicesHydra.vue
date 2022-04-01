<template>
  <div class="elz d-block bor1 r3 bg bg-primary bgL5 br br-primary brL-10 brLInvD hideSelOut showSelOut">

    <div @click="toggleTableView" :class="service.agreement ? 'cur-pointer ' : ''" class="elz d-flex gap8 a-H p16 opAct07">
      <div class="elz d-flex f-wrap a-H grow gap8">
        <div class="elz d-block grow fb320 lh12">
          <div class="elz d-block bold">{{ service.name }}</div>
        </div>
        <div v-if="service.agreement" class="elz d-flex f-wrap fn12 gapH16 gapV8">
          <div class="elz d-flex a-H gap8 wmn64 cur-help" :title="`Выбрано подписок: ${subscription.count}`">
            <div class="elz p-rel d-block p-rel mskBef s16 cFillBef bgBef-CC msk-contain" style="--elzMsk: url('/style/icons/loop.svg');"></div>
            <div class="elz d-block bold">{{ subscription.count }}</div>
          </div>
          <div class="elz d-flex a-H gap8 wmn64 cur-help" :title="`Выбрано услуг: ${purchase.count}`">
            <div class="elz p-rel d-block p-rel mskBef s16 cFillBef bgBef-CC msk-contain" style="--elzMsk: url('/style/icons/cog.svg');"></div>
            <div class="elz d-block bold">{{ purchase.count }}</div>
          </div>
          <div class="elz d-flex a-H gap8 wmn100 cur-help" :title="`Сумма к списанию: ${total} руб.`">
            <div class="elz p-rel d-block p-rel mskBef s12 cFillBef bgBef-CC msk-contain" style="--elzMsk: url('/style/icons/ruble.svg');"></div>
            <div class="elz d-block bold">{{ total }}</div>
          </div>
        </div>
      </div>
      <template v-if="service.agreement">
        <div class="elz p-rel d-block noShrink p-rel mskBef s8 deg180 cFillBef bgBef-CC hideSelIn" style="--elzMsk: url('/style/icons/arrow1.svg');"></div>
        <div class="elz p-rel d-block noShrink p-rel mskBef s8 cFillBef bgBef-CC showSelIn" style="--elzMsk: url('/style/icons/arrow1.svg');"></div>
      </template>
      <template v-else>
        <div @click="$emit('createAgreement')" class="elz d-block p8 r3 fn11 bold bg cur-pointer opAct07 bg-success fn fn-success-t">Создать договор</div>
      </template>
    </div>

    <div class="elz d-block borT1 br br-primary brL-10 brLInvD fn12 showSelIn">
      <div class="elz d-flex a-H f-wrap fn16 pAT16 gap8">
        <div class="elz d-block fb320">Тарифный план:</div>
        <div class="elz d-flex f-wrap gap8 fb480 grow">
          <div class="elz d-block fb320 growMax">
            <div class="elz d-grid w100p grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0 cHovOut">
              <div class="elz elzInput d-flex grPin a-H grY2 w100p bor1 r3 h40 pL16 pR24 ellipsis trns2 invPssSib bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10 brHovInL-20 brFoc-focus brFocL0 fn fn-primary-t">
                <div class="elz growX pV8 oH nowrap ellipsis">{{ service.tariff }}</div>
              </div>
              <span class="elz d-flex grPin grY2 a-H bor1 pH7 z6 evNone">
                <span class="elz p-rel growX d-flex a-PR">
                  <span class="elz p-rel d-flex a-X s24 r2 trns2">
                    <span class="elz p-rel d-block mskBef s8 cFillBef bgBef-CC deg180" style="--elzMsk: url('/style/icons/arrow2.svg');"></span>
                  </span>
                </span>
              </span>
              <select @change="(e) => $emit('changeTariff', e.target.value)" class="elz d-block grPin grY2 p-EA s100p op0 pH16 z7 cur-pointer fn12 bg bg-primary bgL10 bgLInvD fn fn-primary-t">
                <template v-for="(tariff, index) in service.tariffList" :key="index">
                  <option :value="tariff.name">{{ tariff.name }}</option>
                </template>
              </select>
            </div>
          </div>
          <div class="elz d-block fb120 grow wmn160">
            <div class="elz d-flex a-X bor1 r3 h40 pH16 bold al-center bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10">{{ tariffPrice }}</div>
          </div>
        </div>
      </div>

      <div class="elz d-block mT16 r3 oH">
        <div v-if="service.monthly.length" class="elz d-block showSelOut1 hideSelOut1 sel">
          <div @click="toggleTableView" class="elz d-flex a-H borV1 pH16 gap16 pV10 lh12 opAct07 cur-pointer bg bg-primary br br-primary brL-10 brHovL-15 brLInvD">
            <div class="elz d-block growX bold">Подписки</div>
            <div class="elz d-block pV4 pH6 al-center wmn24 r3 fn11 bold bg bg-primary bgL-10">{{ subscription.count }}</div>
            <div class="elz d-flex a-H gap8 cur-help fn11 pV4 pH8 al-center wmn24 r3 fn11 bold bg bg-primary bgL-10" :title="`Сумма за подписки: ${subscription.summary}`">
              <div class="elz d-block bold">{{ subscription.summary }} руб.</div>
            </div>
            <div class="elz p-rel d-block noShrink p-rel mskBef s8 cFillBef bgBef-CC showSelIn1" style="--elzMsk: url('/style/icons/arrow1.svg');"></div>
            <div class="elz p-rel d-block noShrink p-rel mskBef s8 deg180 cFillBef bgBef-CC hideSelIn1" style="--elzMsk: url('/style/icons/arrow1.svg');"></div>
          </div>
          <div class="elz d-block showSelIn lh15 uStrip stripEven stripHover stripLD strip005 showSelIn1">
            <template v-for="(item, index) in service.monthly" :key="index">
              <div class="elz d-flex f-wrap a-H uStripIn pR16">
                <label class="elz d-flex a-H gap16 growMax fb280 pL16 pV8 cur-pointer">
                  <input @change="toggleSubscription" :value="item.price" type="checkbox" class="elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s18 p3 r2 cLInvD bg bg-primary bgL10 br br-primary brL-10 brHovL-20 fn fn-primary-t fnHovL-5 bshAct-inset1">
                  <span class="elz d-block grow">{{ item.name }}</span>
                </label>
                <div class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb160">
                  <div class="elz d-flex grow a-X bor1 r3 h24 pH16 bold al-center bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10">{{ item.price }} руб.</div>
                </div>
              </div>
            </template>
          </div>
        </div>

        <div v-if="service.oneTime.length" class="elz d-block showSelOut1 hideSelOut1 sel">
          <div @click="toggleTableView" class="elz d-flex a-H borV1 pH16 gap16 pV10 lh12 opAct07 cur-pointer bg bg-primary br br-primary brL-10 brHovL-15 brLInvD">
            <div class="elz d-block growX bold">Покупки</div>
            <div class="elz d-block p4 al-center wmn24 r3 fn11 bold bg bg-primary bgL-10">{{ purchase.count }}</div>
            <div class="elz d-flex a-H gap8 cur-help fn11 pV4 pH6 al-center wmn24 r3 fn11 bold bg bg-primary bgL-10" :title="`Сумма за покупки: ${purchase.summary}`">
              <div class="elz d-block bold">{{ purchase.summary }} руб.</div>
            </div>
            <div class="elz p-rel d-block noShrink p-rel mskBef s8 cFillBef bgBef-CC showSelIn1" style="--elzMsk: url('/style/icons/arrow1.svg');"></div>
            <div class="elz p-rel d-block noShrink p-rel mskBef s8 deg180 cFillBef bgBef-CC hideSelIn1" style="--elzMsk: url('/style/icons/arrow1.svg');"></div>
          </div>
          <div class="elz d-block showSelIn lh15 uStrip stripEven stripHover stripLD strip005 showSelIn1">
          <template v-for="(item, index) in service.oneTime" :key="index">
            <div class="oneTimeItem elz d-flex f-wrap a-H uStripIn pR16">
              <label class="elz d-flex a-H gap16 growMax fb280 pL16 pV8 cur-pointer">
                <input @change="togglePurchase" :value="item.price" type="checkbox" class="oneTimeItemCheckbox elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s18 p3 r2 cLInvD bg bg-primary bgL10 br br-primary brL-10 brHovL-20 fn fn-primary-t fnHovL-5 bshAct-inset1">
                <span class="elz d-block grow">{{ item.name }}</span>
              </label>
              <div class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb280">
                <div class="elz d-block al-right grow bold growMax">{{ item.price }} руб.</div>
                <label class="elz d-grid grow w64 noShrink grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0">
                  <input @input="setPurchaseValue" :data-price="item.price" value="0" type="number" min="0" class="purchaseItemInput uDisabled elz elzInput d-block grPin grY2 w100p bor1 r3 h24 pL20 fn12 ellipsis trns2 invPssSib bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0 fn fn-primary-t">
                  <span class="elz d-flex grPin grY2 a-H pH8 z6 evNone">
                    <span class="elz p-rel a-H d-flex trns2">×</span>
                  </span>
                </label>
              </div>
            </div>
          </template>
          </div>
        </div>
      </div>

      <div class="elz p-rel d-flex f-wrap a-X gap8 pV8 borT1 br br-primary brL-10 brLInvD">
        <div class="elz d-flex gap8 a-X al-center r3 hmn36 pH24 cur-pointer opAct07 bg bg-ok bgHovL10 fn fn-ok-t">
          <div class="elz d-block">Подключить</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { numberFormat } from "@/helpers/formating";

export default {
  name: "OrderServicesHydra",

  emits: [ 'createAgreement', 'changeTariff' ],

  props: {
    service: { required: true, type: Object }
  },

  data() {
    return {
      subscription: {
        count: 0,
        summary: 0
      },
      purchase: {
        count: 0,
        summary: 0
      }
    }
  },

  computed: {
    tariffPrice() {
      return numberFormat(this.service.tariffList.find(el => el.name === this.service.tariff)?.price, 2, ',', ' ');
    },

    total() {
      //return numberFormat(+this.summary + +(this.service.tariffList.find(el => el.name === this.service.tariff)?.price), 2, ',', ' ');
      return numberFormat(
          +this.subscription.summary + +this.purchase.summary + +(this.service.tariffList.find(el => el.name === this.service.tariff)?.price)
          , 2, ',', ' ');
    }
  },

  methods: {
    setPurchaseValue(e) {
      const checkbox = e.currentTarget.closest('.oneTimeItem').getElementsByClassName('oneTimeItemCheckbox')[0];
      if (e.target.value > 0) {
        const value = +e.target.value * +(e.target.getAttribute('data-price'));
        if (!checkbox.dataset.prevprice) {
          checkbox.dataset.prevprice = checkbox.value;
        }
        this.purchase.summary -= +checkbox.dataset.prevprice;
        this.purchase.summary += +value;
        checkbox.dataset.prevprice = value;
      } else {
        checkbox.value = 0;
        e.currentTarget.classList.add('uDisabled');
        this.purchase.count -= 1;
        this.purchase.summary -= +checkbox.dataset.prevprice;
        checkbox.dataset.prevprice = '';
        checkbox.checked = false;
      }
    },

    togglePurchase(e) {
      const $checkbox = e.currentTarget;
      const $input = e.currentTarget.closest('.oneTimeItem').getElementsByClassName('purchaseItemInput')[0];
      const previousValue = $checkbox.dataset.prevprice ? +$checkbox.dataset.prevprice : +$checkbox.value;

      if ($checkbox.checked) {
        $input.value = 1;
        $input.classList.remove('uDisabled');
        this.purchase.count += 1;
        this.purchase.summary += previousValue;
      } else {
        $input.value = 0;
        $input.classList.add('uDisabled');
        this.purchase.count -= 1;
        this.purchase.summary -= previousValue;
        $checkbox.dataset.prevprice = '';
      }
    },

    toggleSubscription(e) {
      if (e.target.checked) {
        this.subscription.count += 1;
        this.subscription.summary += +e.target.value;
      } else {
        this.subscription.count -= 1;
        this.subscription.summary -= +e.target.value;
      }
    },

    toggleTableView(e){
      if (this.service.agreement) {
        const elem = e.currentTarget.parentNode;
        elem.classList.contains('sel') ? elem.classList.remove('sel') :  elem.classList.add('sel');
      }
    },
  }
}
</script>

<style scoped>

</style>
