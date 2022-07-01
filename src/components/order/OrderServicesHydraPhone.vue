<template>

    <div :class="service.isOpened ? 'sel' : ''" class="elz d-block p-rel bor1 r3 bg bg-primary bgL5 br br-primary brL-10 brLInvD hideSelOut showSelOut">

      <div @click="service.isConnected ? $emit('toggleServiceView') : ''" :class="service.isConnected ? 'cur-pointer opAct07' : ''" class="elz d-flex gap8 a-H p16">
        <div class="elz d-flex f-wrap a-H grow gap8">
          <div class="elz d-block grow fb320 lh12">
            <div class="elz d-block bold">{{ service.name }}</div>
          </div>
          <div v-if="service.isConnected" class="elz d-flex f-wrap fn12 gapH16 pR8 gapV8">
            <div class="elz d-flex a-H gap8 al-right cur-help" :title="`Сумма к списанию: ${total} руб.`">
              <div class="elz p-rel d-block p-rel mskBef s12 cFillBef bgBef-CC msk-contain" style="--elzMsk: url('/style/icons/ruble.svg');"></div>
              <div class="elz d-block bold">{{ total }}</div>
            </div>
          </div>
        </div>

        <template v-if="service.isConnected">
          <div class="elz p-rel d-block noShrink p-rel mskBef s8 deg180 cFillBef bgBef-CC hideSelIn" style="--elzMsk: url('/style/icons/arrow1.svg');"></div>
          <div class="elz p-rel d-block noShrink p-rel mskBef s8 cFillBef bgBef-CC showSelIn" style="--elzMsk: url('/style/icons/arrow1.svg');"></div>
        </template>

        <template v-else>
          <div @click="$emit('createConnection')" class="elz d-block p8 r3 fn11 bold bg cur-pointer opAct07 bg-success fn fn-success-t">Настроить тарификацию</div>
        </template>
      </div>

      <div class="elz d-block borT1 br br-primary brL-10 brLInvD fn12 showSelIn">
        <div class="elz d-flex a-H f-wrap fn16 p16 gap8">
          <div class="elz d-block fb320">Тарифная зона:</div>
          <div class="elz d-flex f-wrap gap8 fb480 grow">
            <div class="elz d-block fb320 growMax">
              <div class="elz d-grid w100p grPos fn14 fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0 cHovOut">
                <div class="elz elzInput d-flex grPin a-H grY2 w100p bor1 r3 h40 pL16 pR24 ellipsis trns2 invPssSib bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10 brHovInL-20 brFoc-focus brFocL0 fn fn-primary-t">
                  <div class="elz growX pV8 oH nowrap ellipsis">Здесь будет выбор тарифной зоны</div>
                </div>
                <span v-if="!service.billingStart" class="elz d-flex grPin grY2 a-H bor1 pH7 z6 evNone">
                <span class="elz p-rel growX d-flex a-PR">
                  <span class="elz p-rel d-flex a-X s24 r2 trns2">
                    <span class="elz p-rel d-block mskBef s8 cFillBef bgBef-CC deg180" style="--elzMsk: url('/style/icons/arrow2.svg');"></span>
                  </span>
                </span>
              </span>
                <select v-model="tariffZone" @change="(e) => { $emit('changeZone', e.target.value, order.TariffZoneSDId ); contractType = '' }"
                        class="elz d-block grPin grY2 p-EA s100p op0 pH16 z7 cur-pointer fn12 bg bg-primary bgL10 bgLInvD fn fn-primary-t">
                  <!--                <template v-for="(type, index) in types" :key="index">
                                    <option :value="type.value">{{ type.name }}</option>
                                  </template>-->
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="elz d-flex a-H f-wrap fn16 p16 gap8">
          <div class="elz d-block fb320">Тип договора:</div>
          <div class="elz d-flex f-wrap gap8 fb480 grow">
            <div class="elz d-block fb320 growMax">
              <div class="elz d-grid w100p grPos fn14 fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0 cHovOut">
                <div class="elz elzInput d-flex grPin a-H grY2 w100p bor1 r3 h40 pL16 pR24 ellipsis trns2 invPssSib bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10 brHovInL-20 brFoc-focus brFocL0 fn fn-primary-t">
                  <div class="elz growX pV8 oH nowrap ellipsis">Здесь будет выбор типа договора</div>
                </div>
                <span v-if="!service.billingStart" class="elz d-flex grPin grY2 a-H bor1 pH7 z6 evNone">
                <span class="elz p-rel growX d-flex a-PR">
                  <span class="elz p-rel d-flex a-X s24 r2 trns2">
                    <span class="elz p-rel d-block mskBef s8 cFillBef bgBef-CC deg180" style="--elzMsk: url('/style/icons/arrow2.svg');"></span>
                  </span>
                </span>
              </span>
                <!--              <select v-model="contarctType" @change="(e) => { $emit('changeType', e.target.value, order.TariffZoneSDId ); selectedTariff = '' }"
                                      class="elz d-block grPin grY2 p-EA s100p op0 pH16 z7 cur-pointer fn12 bg bg-primary bgL10 bgLInvD fn fn-primary-t">
                                <template v-for="(type, index) in types" :key="index">
                                  <option :value="type.value">{{ type.name }}</option>
                                </template>
                              </select>-->
              </div>
            </div>
          </div>
        </div>

        <div class="elz d-flex a-H f-wrap fn16 p16 gap8">
          <div class="elz d-block fb320">Тариф:</div>
          <div class="elz d-flex f-wrap gap8 fb480 grow">
            <div class="elz d-block fb320 growMax">
              <div class="elz d-grid w100p grPos fn14 fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0 cHovOut">
                <div class="elz elzInput d-flex grPin a-H grY2 w100p bor1 r3 h40 pL16 pR24 ellipsis trns2 invPssSib bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10 brHovInL-20 brFoc-focus brFocL0 fn fn-primary-t">
                  <div class="elz growX pV8 oH nowrap ellipsis">Здесь будет выбор тарифа</div>
                </div>
                <span v-if="!service.billingStart" class="elz d-flex grPin grY2 a-H bor1 pH7 z6 evNone">
                <span class="elz p-rel growX d-flex a-PR">
                  <span class="elz p-rel d-flex a-X s24 r2 trns2">
                    <span class="elz p-rel d-block mskBef s8 cFillBef bgBef-CC deg180" style="--elzMsk: url('/style/icons/arrow2.svg');"></span>
                  </span>
                </span>
              </span>
                <!--              <select v-model="contarctType" @change="(e) => { $emit('changeType', e.target.value, order.TariffZoneSDId ); selectedTariff = '' }"
                                      class="elz d-block grPin grY2 p-EA s100p op0 pH16 z7 cur-pointer fn12 bg bg-primary bgL10 bgLInvD fn fn-primary-t">
                                <template v-for="(type, index) in types" :key="index">
                                  <option :value="type.value">{{ type.name }}</option>
                                </template>
                              </select>-->
              </div>
            </div>
          </div>
        </div>

        <div class="elz d-flex a-H f-wrap fn16 p16 gap8">
          <div class="elz d-block fb320">Оператор:</div>
          <div class="elz d-flex f-wrap gap8 fb480 grow">
            <div class="elz d-block fb320 growMax">
              <div class="elz d-grid w100p grPos fn14 fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0 cHovOut">
                <div class="elz elzInput d-flex grPin a-H grY2 w100p bor1 r3 h40 pL16 pR24 ellipsis trns2 invPssSib bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10 brHovInL-20 brFoc-focus brFocL0 fn fn-primary-t">
                  <div class="elz growX pV8 oH nowrap ellipsis">Здесь будет ПРЕДУПРЕЖДЕНИЕ и выбор оператора</div>
                </div>
                <span v-if="!service.billingStart" class="elz d-flex grPin grY2 a-H bor1 pH7 z6 evNone">
                <span class="elz p-rel growX d-flex a-PR">
                  <span class="elz p-rel d-flex a-X s24 r2 trns2">
                    <span class="elz p-rel d-block mskBef s8 cFillBef bgBef-CC deg180" style="--elzMsk: url('/style/icons/arrow2.svg');"></span>
                  </span>
                </span>
              </span>
                <!--              <select v-model="contarctType" @change="(e) => { $emit('changeType', e.target.value, order.TariffZoneSDId ); selectedTariff = '' }"
                                      class="elz d-block grPin grY2 p-EA s100p op0 pH16 z7 cur-pointer fn12 bg bg-primary bgL10 bgLInvD fn fn-primary-t">
                                <template v-for="(type, index) in types" :key="index">
                                  <option :value="type.value">{{ type.name }}</option>
                                </template>
                              </select>-->
              </div>
            </div>
          </div>
        </div>

        <div class="elz d-flex a-H f-wrap fn16 p16 gap8">
          <div class="elz d-block fb320">Последняя колонка:</div>
          <div class="elz d-flex f-wrap gap8 fb480 grow">
            <div class="elz d-block fb320 growMax">
              <div class="elz d-grid w100p grPos fn14 fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0 cHovOut">
                <div class="elz elzInput d-flex grPin a-H grY2 w100p bor1 r3 h40 pL16 pR24 ellipsis trns2 invPssSib bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10 brHovInL-20 brFoc-focus brFocL0 fn fn-primary-t">
                  <div class="elz growX pV8 oH nowrap ellipsis">Что-то выбрано</div>
                </div>
                <span v-if="!service.billingStart" class="elz d-flex grPin grY2 a-H bor1 pH7 z6 evNone">
                <span class="elz p-rel growX d-flex a-PR">
                  <span class="elz p-rel d-flex a-X s24 r2 trns2">
                    <span class="elz p-rel d-block mskBef s8 cFillBef bgBef-CC deg180" style="--elzMsk: url('/style/icons/arrow2.svg');"></span>
                  </span>
                </span>
              </span>
                <!--              <select v-model="serviceType" @change="(e) => { $emit('changeType', e.target.value, order.TariffZoneSDId ); selectedTariff = '' }"
                                      class="elz d-block grPin grY2 p-EA s100p op0 pH16 z7 cur-pointer fn12 bg bg-primary bgL10 bgLInvD fn fn-primary-t">
                                <template v-for="(type, index) in types" :key="index">
                                  <option :value="type.value">{{ type.name }}</option>
                                </template>
                              </select>-->
              </div>
            </div>
            <div class="elz d-block fb200 grow">
              <label class="elz d-grid grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0">
                <input type="text" value="" placeholder="+7(963)999-64-40" class="elz elzInput d-block grPin grY2 w100p bor1 r3 h40 pL40 pR8 fn12 ellipsis trns2 invPssSib bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0 fn fn-primary-t">
                <span class="elz d-flex grPin grY2 a-H bor1 pH7 z6 evNone">
              <span class="elz p-rel d-flex a-X s24 trns2">
                <span class="elz p-rel d-block mskBef s16 cFillBef bgBef-CC" style="--elzMsk:url('https://lelouch.ru/dev/elize/design/icons/user.svg');" data-v-5573b587=""></span>
              </span>
            </span>
              </label>
            </div>
          </div>
        </div>

        <div v-if="service.contractsList.length" class="elz d-flex a-H f-wrap fn16 p16 gap8">
          <div class="elz d-block fb320">Тип договора:</div>
          <div class="elz d-flex f-wrap gap8 fb480 grow">
            <div class="elz d-block fb320 growMax">
              <div class="elz d-grid w100p grPos fn14 fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0 cHovOut">
                <div class="elz elzInput d-flex grPin a-H grY2 w100p bor1 r3 h40 pL16 pR24 ellipsis trns2 invPssSib bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10 brHovInL-20 brFoc-focus brFocL0 fn fn-primary-t">
                  <div class="elz growX pV8 oH nowrap ellipsis">Здесь выбранный контракт</div>
                </div>
                <span class="elz d-flex grPin grY2 a-H bor1 pH7 z6 evNone">
                <span class="elz p-rel growX d-flex a-PR">
                  <span class="elz p-rel d-flex a-X s24 r2 trns2">
                    <span class="elz p-rel d-block mskBef s8 cFillBef bgBef-CC deg180" style="--elzMsk: url('/style/icons/arrow2.svg');"></span>
                  </span>
                </span>
              </span>
                <select @change="(e) => { selectedContract = e.target.value; $emit('changeContract', selectedContract )}"
                        class="elz d-block grPin grY2 p-EA s100p op0 pH16 z7 cur-pointer fn12 bg bg-primary bgL10 bgLInvD fn fn-primary-t">
                  <template v-for="(contract, index) in service.contractsList" :key="index">
                    <option :value="contract.value">{{ contract.name }}</option>
                  </template>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="elz p-rel d-flex f-wrap a-X gap8 pV8 borT1 br br-primary brL-10 brLInvD">
          <div class="elz d-flex gap8 a-X al-center r3 hmn36 mV12 pH24 cur-pointer opAct07 bg bg-ok bgHovL10 fn fn-ok-t">
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
export default {
  name: "OrderServicesHydraPhone",

  emits: ['changeZone', 'createConnection','toggleServiceView'],

  props: {
    service: { required: true, type: Object }
  },

  data() {
    return {
      tariffZone: '',
      contractType: ''
    }
  }

}
</script>
