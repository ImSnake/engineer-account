<template>
  <div :class="service.isOpened ? 'sel' : ''" class="elz d-block p-rel bor1 r3 mB16 bg bg-primary bgL5 br br-primary brL-10 brLInvD hideSelOut showSelOut">
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
            <Tooltip ref='login' :type="'ok'" :hasTail="true" :duration="2000">Логин скопирован</Tooltip>
            <InputBase
                @on:click="(e) => $emit('showTooltip', 'login', e.currentTarget.querySelector('input'))"
                :modelValue="service.connectionData.login || null"
                :inputType="'text'"
                :readonly="true"
                :icon="'user'"
                :classInput="'rL3 selNone cur-inh h32'"
                :classLabel="'empLogPassInput grow mR-1 cur-pointer'"   />
          </div>
          <div class="elz p-rel d-block">
            <Tooltip ref="password" :type="'ok'" :hasTail="true" :duration="2000">Пароль скопирован</Tooltip>
            <InputBase
                @on:click="(e) => $emit('showTooltip', 'password', e.currentTarget.querySelector('input'))"
                :modelValue="service.connectionData.pass || null"
                :inputType="'password'"
                :readonly="true"
                :icon="'key'"
                :classInput="'rR3 selNone cur-inh h32'"
                :classLabel="'empLogPassInput grow cur-pointer'"   />
          </div>
        </div>
        <div class="elz d-flex a-X wmn120 hmn28 p8 r3 fn11 bold bg cur-help bg-success fn fn-success-t" title="Услуга подключена">На тарификации</div>
      </template>

      <template v-else>
        <div @click="$emit('createConnection')" class="elz d-flex a-X wmn120 hmn28 p8 r3 fn11 bold bg cur-pointer opAct07 bg-success fn fn-success-t">Настроить тарификацию</div>
      </template>
    </div>

    <div :class="service.billingStart ? 'uDisabled' : '' " class="elz d-block borT1 br br-primary brL-10 brLInvD fn12 showSelIn">
      <div class="elz d-flex a-H f-wrap fn16 p16 gap8">
        <div class="elz d-block fb320 fn fn14">Тип услуги:</div>
        <div class="elz d-flex f-wrap gap8 fb480 grow">
          <div class="elz d-block fb320 growMax">
            <SelectBase
                v-model="serviceType"
                @update:modelValue="(val) => { $emit('changeType', val, this.order.TariffZoneSDId ); selectedTariff = '' }"
                :disabled="service.billingStart"
                :options="types"
                :title="service.billingStart ? service.connectionData.type_name : 'Выбрать тип услуги'"  />
          </div>
        </div>
      </div>
      <div v-if="serviceType || service.billingStart" class="elz d-flex a-H f-wrap fn16 pAT16 pB16 gap8">
        <div class="elz d-block fb320 fn fn14">Тарифный план:</div>
        <template v-if="serviceType || service.billingStart" >
          <div v-if="service.tariffList.length || service.billingStart" class="elz d-flex f-wrap gap8 fb480 grow">
            <div class="elz d-block fb320 growMax">
              <SelectBase
                  v-model="selectedTariff"
                  @update:modelValue="(val) => $emit('changeTariff', val )"
                  :disabled="service.billingStart"
                  :options="service.tariffList"
                  :title="service.billingStart ? service.connectionData.name : 'Выбрать тарифный план'"  />
            </div>
            <div class="elz d-block fb120 grow wmn160">
              <div class="elz d-flex a-X bor1 r3 h40 pH16 bold al-center bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10">{{ tariffPrice }}</div>
            </div>
          </div>
          <div v-else class="elz d-flex a-H f-wrap gap8 fb480 grow pH16 r3 lh12 hmn40 bg bg-primary bgLInvD">Тарифный план не найден. Обратитесь ДИТ Управление эксплуатации АСР.</div>
        </template>
      </div>
      <div v-if="selectedTariff && !service.billingStart" class="elz p-rel d-flex f-wrap a-X gap8 pV16 borT1 br br-primary brL-10 brLInvD">
        <ButtonBase @onButtonClick="$emit('setTariffication', selectedTariff, order.CustomerUBN, service.baseContractHydraId)"
            :classList="'hmn36 bg-ok bgHovL10 fn-ok-t'">Поставить на тарификацию</ButtonBase>
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
import ButtonBase from '@/components/elements/ButtonBase';
import InputBase from "@/components/elements/InputBase";
import SelectBase from "@/components/elements/SelectBase"
import Tooltip from "@/components/elements/Tooltip";
import { numberFormat } from "@/helpers/formating";

export default {
  name: "OrderServicesHydra",

  components: {
    ButtonBase,
    InputBase,
    SelectBase,
    Tooltip
  },

  emits: [ 'createConnection', 'changeTariff', 'changeType', 'setTariffication', 'showTooltip', 'toggleServiceView' ],

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

    order() {
      return this.$store.state.orderPage.order.details;
    },

    tariffPrice() {
      return this.service.billingStart ? numberFormat(+this.service.connectionData.amount, 2, ',', ' ') : numberFormat(this.service.tariffList.find(el => +el.value === +this.selectedTariff)?.price, 2, ',', ' ');
    },

    total() {
      return numberFormat(+(this.service.tariffList.find(el => +el.value === +this.selectedTariff)?.price), 2, ',', ' ');
    },

    types() {
      return this.$store.state.static.hydraServicesTypes.find(({typeOfService}) => +typeOfService === +this.service.typeOfService).list;
    }
  },
/*
  methods: {
    showTooltip(name, el) {
      if (name === 'password') {
        el.type = 'text';
        setTimeout(() => el.type = 'password', 3500);
      }

      navigator.clipboard.writeText(el.value)
        .then(() => {
          this.$refs[name].isOpen = true;
        });
    }

  }*/
}
</script>


