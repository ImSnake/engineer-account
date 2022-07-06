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
          <div @click="$emit('createConnection')" class="elz d-block wmn120 p8 r3 fn11 bold bg cur-pointer opAct07 bg-success fn fn-success-t">Настроить тарификацию</div>
        </template>
      </div>

      <div class="elz d-block borT1 br br-primary brL-10 brLInvD fn12 showSelIn">
        <div class="elz d-flex a-H f-wrap fn16 p16 gap8">
          <div class="elz d-block fb320">Тарифная зона:</div>
          <div class="elz d-flex f-wrap gap8 fb480 grow">
            <div class="elz d-block fb320 growMax">
              <SelectBase
                  v-model="tariffZone"
                  @update:modelValue="updateTariffZone"
                  :disabled="service.billingStart"
                  :options="types"
                  :title="service.billingStart ? service.connectionData.type_name : 'Выбрать тарифную зону'"  />
            </div>
          </div>
        </div>

        <div v-if="tariffZone" class="elz d-flex a-H f-wrap fn16 p16 gap8">
          <div class="elz d-block fb320">Тип договора:</div>
          <div class="elz d-flex f-wrap gap8 fb480 grow">
            <div class="elz d-block fb320 growMax">
              <SelectBase
                  v-model="contractType"
                  @update:modelValue="setTariffList"
                  :disabled="service.billingStart"
                  :options="service.contractsList"
                  :title="service.billingStart ? service.connectionData.contract_name : 'Выбрать тип договора'"  />
            </div>
          </div>
        </div>

        <div v-if="contractType" class="elz d-flex a-H f-wrap fn16 p16 gap8">
          <div class="elz d-block fb320">Тариф:</div>
          <div class="elz d-flex f-wrap gap8 fb480 grow">
            <div class="elz d-block fb320 growMax">
              <SelectBase
                  v-model="tariff"
                  @update:modelValue="operator = ''; pbx = '';"
                  :disabled="service.billingStart"
                  :options="tariffOptions"
                  :title="service.billingStart ? service.connectionData.tariff_name : 'Выбрать тариф'"  />
            </div>
            <div class="elz d-block fb120 grow wmn160">
              <div class="elz d-flex a-X bor1 r3 h40 pH16 bold al-center bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10">{{ tariffPrice }}</div>
            </div>
          </div>
        </div>

        <div v-if="tariff" class="elz d-flex a-H f-wrap fn16 p16 gap8">
          <div class="elz d-block fb320">Оператор:</div>
          <div class="elz d-flex f-wrap gap8 fb480 grow">
            <div class="elz d-block fb320 growMax">
              <SelectBase
                  v-model="operator"
                  @update:modelValue="pbx = '';"
                  :disabled="service.billingStart"
                  :options="$store.state.static.hydraPhoneOperators"
                  :title="service.billingStart ? service.connectionData.operator_name : 'Выбрать оператора'"  />
            </div>
          </div>
        </div>

        <div v-if="operator" class="elz d-flex a-H f-wrap fn16 p16 gap8">
          <div class="elz d-block fb320">Привязка к pbx:</div>
          <div class="elz d-flex f-wrap gap8 fb480 grow">
            <div class="elz d-block fb320 growMax">
              <SelectBase
                  v-model="pbx"
                  :disabled="service.billingStart"
                  :options="$store.state.static.hydraPhonePbx"
                  :title="service.billingStart ? service.connectionData.pbx_name : 'Указать привязку к pbx'"  />
            </div>
            <div class="elz d-block fb200 grow">
              <InputBase
                  @on:keyup="(v, r) => phoneValidation(v, r)"
                  :modelValue="phoneNumber"
                  :classInput="'r3 h40'"
                  :classLabel="'empLogPassInput grow'"
                  :icon="'phone'"
                  :inputMask="'+7 (###) ###-##-##'"
                  :inputType="'text'"
                  :placeholder="'+7 (123) 456-78-90'"   />
            </div>
          </div>
        </div>

        <div v-if="pbx && phoneRaw && !service.billingStart" class="elz p-rel d-flex f-wrap a-X gap8 pV16 borT1 br br-primary brL-10 brLInvD">
          <ButtonBase
              @onButtonClick="checkButtonState"
              :classList="'confirmAction hmn36 bg-ok bgHovL10 fn-ok-t'">
            {{ confirmAction ? 'Уверен???' : 'Подключить телефонию' }}
          </ButtonBase>
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
import SelectBase from "@/components/elements/SelectBase";
import InputBase from "@/components/elements/InputBase";
import ButtonBase from "@/components/elements/ButtonBase";
import {numberFormat} from "@/helpers/formating";

export default {
  name: "OrderServicesHydraPhone",

  components: {
    SelectBase,
    InputBase,
    ButtonBase
  },

  emits: ['changeZone', 'createConnection','toggleServiceView', 'setTarifficationPhone'],

  props: {
    service: { required: true, type: Object }
  },

  data() {
    return {
      confirmAction: false,
      tariffZone: '',
      contractType: '',
      tariffOptions: [],
      tariff: '',
      operator: '',
      pbx: '',
      phoneNumber: '',
      phoneRaw: ''
    }
  },

  computed: {
    tariffPrice() {
      return this.service.billingStart ? numberFormat(+this.service.connectionData.amount, 2, ',', ' ') : numberFormat(this.tariffOptions.find(el => +el.value === +this.tariff)?.price, 2, ',', ' ');
    },

    total() {
      if (!this.tariffOptions.length) {
        return 0;
      }
      return numberFormat(+(this.tariffOptions.find(el => +el.value === +this.tariff)?.price), 2, ',', ' ') || 0;
    },

    types() {
      return this.$store.state.static.hydraServicesTypes.find(({typeOfService}) => +typeOfService === +this.service.typeOfService).list || [];
    },
  },

  methods: {
    checkButtonState() {
      if (!this.confirmAction) {
        this.confirmAction = true;
        document.addEventListener("click", this.clickOut.bind(null, 'confirmAction'), { capture: true, once:true });
      } else {
        this.$emit(
            'setTarifficationPhone',
            this.contractType,
            this.tariff,
            this.operator,
            this.pbx,
            this.phoneRaw
        );
        this.confirmAction = false;
      }
    },

    clickOut(actionName, e) {
      if (this[actionName] === false || !e.target.closest(`.${actionName}`)) {
        this[actionName] = false;
      }
    },

    phoneValidation(val, raw) {
      if(raw.length === 10) {
        this.phoneRaw = '7' + raw;
      } else {
        this.phoneRaw = '';
      }
    },

    updateTariffZone(val) {
      this.$emit('changeZone', 0, val );

      this.contractType = '';
      this.tariffOptions = [];
      this.tariff = '';
      this.operator = '';
      this.pbx = '';
    },

    setTariffList(val) {
      this.tariffOptions = this.service.contractsList.find(el => +el.value === +val).tariffList;

      this.tariff = '';
      this.operator = '';
      this.pbx = '';
    }


  }

}
</script>
