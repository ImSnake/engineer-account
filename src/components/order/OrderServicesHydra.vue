<template>

    <div :class="service.isOpened ? 'sel' : ''" class="elz d-block p-rel bor1 r3 bg bg-primary bgL5 br br-primary brL-10 brLInvD hideSelOut showSelOut">

      <div @click="beforeTariffication ? $emit('toggleServiceView') : ''" :class="beforeTariffication ? 'cur-pointer opAct07' : ''" class="elz d-flex f-wrap gap8 a-H p16 hmn64">
        <div class="elz d-flex f-wrap a-H grow gap8">
          <div class="elz d-block grow fb320 lh12">
            <div class="elz d-block bold">{{ service.name }}</div>
          </div>
          <div v-if="beforeTariffication" class="elz d-flex f-wrap fn12 gapH16 pR8 gapV8">
            <div class="elz d-flex a-H gap8 al-right cur-help" :title="`Сумма к списанию: ${total} руб.`">
              <div class="elz p-rel d-block p-rel mskBef s12 cFillBef bgBef-CC msk-contain" style="--elzMsk: url('/style/icons/ruble.svg');"></div>
              <div class="elz d-block bold">{{ total }}</div>
            </div>
          </div>
        </div>

        <template v-if="beforeTariffication">
          <div class="elz p-rel d-block noShrink p-rel mskBef s8 deg180 cFillBef bgBef-CC hideSelIn" style="--elzMsk: url('/style/icons/arrow1.svg');"></div>
          <div class="elz p-rel d-block noShrink p-rel mskBef s8 cFillBef bgBef-CC showSelIn" style="--elzMsk: url('/style/icons/arrow1.svg');"></div>
        </template>

        <template v-else-if="service.billingStart">
          <div class="empLogPassWrap elz d-flex a-H">
            <div class="elz p-rel d-block">
              <div class="elz p-rel h0 invisible trns2">
                <div class="elz p-abs p-AB">
                  <div class="elz p-rel d-flex dir-y a-X">
                    <div class="elz d-block r3 fn11 bold p8 bg bg-success fn fn-success-t bor1 br br-black brA10 bgp bsh-default">Скопировано</div>
                    <div class="elz elzTriangle bordered pad1 tr-B p-rel borBef8 borAft8 brBef br-black brA10 fn fn-success"></div>
                  </div>
                </div>
              </div>
              <label class="empLogPassInput elz d-grid fb200 grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0">
                <input type="text" value="login" readonly placeholder="Логин" class="elz elzInput d-block grPin grY2 w100p bor1 rL3 h32 pL40 pR8 fn12 ellipsis trns2 invPssSib bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0 fn fn-primary-t">
                <span class="elz d-flex grPin grY2 a-H bor1 pH7 z6 evNone">
              <span class="elz p-rel d-flex a-X s24 trns2">
                <span class="elz p-rel d-block mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/user.svg');"></span>
              </span>
            </span>
              </label>
            </div>

            <label class="empLogPassInput elz d-grid fb200 grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0 mL-1">
              <input type="password" value="12345678" readonly placeholder="Пароль" class="elz elzInput d-block grPin grY2 w100p bor1 rR3 h32 pL40 pR8 fn12 ellipsis trns2 invPssSib bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0 fn fn-primary-t">
              <span class="elz d-flex grPin grY2 a-H bor1 pH7 z6 evNone">
              <span class="elz p-rel d-flex a-X s24 trns2">
                <span class="elz p-rel d-block mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/key.svg');"></span>
              </span>
            </span>
            </label>
          </div>

          <div class="elz d-flex a-X hmn28 p8 r3 fn11 bold bg cur-help bg-success fn fn-success-t" title="Услуга подключена">На тарификации</div>
        </template>

        <template v-else>
          <div @click="$emit('createConnection')" class="elz d-flex a-X hmn28 p8 r3 fn11 bold bg cur-pointer opAct07 bg-success fn fn-success-t">Настроить тарификацию</div>
        </template>
      </div>

      <div :class="service.billingStart ? 'uDisabled' : '' " class="elz d-block borT1 br br-primary brL-10 brLInvD fn12 showSelIn">
        <div class="elz d-flex a-H f-wrap fn16 p16 gap8">
          <div class="elz d-block fb320 fn fn14">Тип услуги:</div>
          <div class="elz d-flex f-wrap gap8 fb480 grow">
            <div class="elz d-block fb320 growMax">
              <div class="elz d-grid w100p grPos fn fn14 fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0 cHovOut">
                <div class="elz elzInput d-flex grPin a-H grY2 w100p bor1 r3 h40 pL16 pR24 ellipsis trns2 invPssSib bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10 brHovInL-20 brFoc-focus brFocL0 fn fn14 fn-primary-t">
                  <div class="elz growX pV8 oH nowrap ellipsis">{{ service.billingStart ? service.connectionData.type_name : typeName }}</div>
                </div>
                <span v-if="!service.billingStart" class="elz d-flex grPin grY2 a-H bor1 pH7 z6 evNone">
                <span class="elz p-rel growX d-flex a-PR">
                  <span class="elz p-rel d-flex a-X s24 r2 trns2">
                    <span class="elz p-rel d-block mskBef s8 cFillBef bgBef-CC deg180" style="--elzMsk: url('/style/icons/arrow2.svg');"></span>
                  </span>
                </span>
              </span>
                <select v-model="serviceType" @change="(e) => { $emit('changeType', e.target.value, order.TariffZoneSDId ); selectedTariff = '' }" class="elz d-block grPin grY2 p-EA s100p op0 pH16 z7 cur-pointer fn12 bg bg-primary bgL10 bgLInvD fn fn-primary-t">
                  <template v-for="(type, index) in types" :key="index">
                    <option :value="type.value">{{ type.name }}</option>
                  </template>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div v-if="serviceType || service.billingStart" class="elz d-flex a-H f-wrap fn16 pAT16 pB16 gap8">
          <div class="elz d-block fb320 fn fn14">Тарифный план:</div>

          <template v-if="serviceType" >
            <div v-if="service.tariffList.length" class="elz d-flex f-wrap gap8 fb480 grow">
              <div class="elz d-block fb320 growMax">
                <div class="elz d-grid w100p grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0 cHovOut">
                  <div class="elz elzInput d-flex grPin a-H grY2 w100p bor1 r3 h40 pL16 pR24 ellipsis trns2 invPssSib bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10 brHovInL-20 brFoc-focus brFocL0 fn fn14 fn-primary-t">
                    <div class="elz growX pV8 oH nowrap ellipsis">{{ service.tariffList.find(el => el.value == this.selectedTariff).name }}</div>
                  </div>
                  <span class="elz d-flex grPin grY2 a-H bor1 pH7 z6 evNone">
                  <span class="elz p-rel growX d-flex a-PR">
                    <span class="elz p-rel d-flex a-X s24 r2 trns2">
                      <span class="elz p-rel d-block mskBef s8 cFillBef bgBef-CC deg180" style="--elzMsk: url('/style/icons/arrow2.svg');"></span>
                    </span>
                  </span>
                </span>
                  <select @change="(e) => { selectedTariff = e.target.value; $emit('changeTariff', e.target.value )}" class="elz d-block grPin grY2 p-EA s100p op0 pH16 z7 cur-pointer fn12 bg bg-primary bgL10 bgLInvD fn fn-primary-t">
                    <template v-for="(tariff, index) in service.tariffList" :key="index">
                      <option :value="tariff.value">{{ tariff.name }}</option>
                    </template>
                  </select>
                </div>
              </div>
              <div class="elz d-block fb120 grow wmn160">
                <div class="elz d-flex a-X bor1 r3 h40 pH16 bold al-center bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10">{{ tariffPrice }}</div>
              </div>
            </div>
            <div v-else class="elz d-flex a-H f-wrap gap8 fb480 grow pH16 r3 lh12 hmn40 bg bg-primary bgLInvD">Тарифный план не найден. Обратитесь ДИТ Управление эксплуатации АСР.</div>
          </template>

          <div v-else-if="service.billingStart" class="elz d-flex a-H f-wrap gap8 fb480 grow pV8 r3 lh12 hmn40">
            <div class="elz d-block fb320 growMax">
              <div class="elz d-grid w100p grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0 cHovOut">
                <div class="elz elzInput d-flex grPin a-H grY2 w100p bor1 r3 h40 pL16 pR24 ellipsis trns2 invPssSib bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10 brHovInL-20 brFoc-focus brFocL0 fn fn14 fn-primary-t">
                  <div class="elz growX oH nowrap ellipsis">{{ service.connectionData.name }}</div>
                </div>
              </div>
            </div>
            <div class="elz d-block fb120 grow wmn160">
              <div class="elz d-flex a-X bor1 r3 h40 pH16 bold al-center bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10">{{ service.connectionData.amount }}</div>
            </div>
          </div>

        </div>

        <div v-if="selectedTariff && !service.billingStart" class="elz p-rel d-flex f-wrap a-X gap8 pV8 borT1 br br-primary brL-10 brLInvD">
          <div @click="$emit('setTariffication', selectedTariff, order.CustomerUBN, service.baseContractHydraId)" class="elz d-flex gap8 a-X al-center r3 hmn36 mV12 pH24 cur-pointer opAct07 bg bg-ok bgHovL10 fn fn-ok-t">
            <div class="elz d-block">Поставить на тарификацию</div>
          </div>
        </div>

      </div>

      <template v-if="service.showUploader">
        <Uploader
            :circleSize = "'s32'"
            :circleWidth = "'2'"
            :viewSettings = "'p-abs p16 r3 z10 bg bg-primary bgL5 br br-primary brL-10 brLInvD bgA50'"  />
      </template>

    </div>

  </template>


<script>
import { numberFormat } from "@/helpers/formating";

export default {
  name: "OrderServicesHydra",

  emits: [ 'createConnection', 'changeTariff', 'changeType', 'setTariffication', 'toggleServiceView' ],

  props: {
    service: { required: true, type: Object }
  },

  data() {
    return {
      serviceType: '',
      selectedTariff: '',
    }
  },

  computed: {
    beforeTariffication() {
      return this.service.isConnected && !this.service.billingStart;
    },

    tariffPrice() {
      return numberFormat(this.service.tariffList.find(el => +el.value === +this.selectedTariff)?.price, 2, ',', ' ');
    },

    types() {
      return this.$store.state.static.hydraServicesTypes.find(({typeOfService}) => +typeOfService === +this.service.typeOfService).list;
    },

    typeName() {
      return this.types.find(el => +el.value === +this.serviceType).name;
    },

    total() {
      return numberFormat(+(this.service.tariffList.find(el => +el.value === +this.selectedTariff)?.price), 2, ',', ' ');
    },

    order() {
      return this.$store.state.orderPage.order.details;
    }
  },

  methods: { }
}
</script>

<style scoped>
@media (max-width: 768px) {
  .empLogPassWrap {
    order: 2;
    width: 100%;
  }

  .empLogPassWrap .empLogPassInput { flex-grow: 1; }
}
</style>
