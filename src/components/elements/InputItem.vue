<template>
  <div :class="inputProps ? inputProps.classApproval : ''" class="elz infoLine d-block grow mB32">
    <div v-if="titleMain" class="elz infoTitle d-flex a-H hmn40 borB2 mL24 noShrink">
      <div class="elz d-block">{{ titleMain }}</div>
    </div>
    <div class="elz d-block mL24 p-rel">
      <label class="elz d-grid grPos fn fnLInvD fn-primary-t fnL20 fnHovL10 fnFow-focus fnFowL0">
        <input class="elz d-block grPin grY2 w100p borB2 h40 pR20 ellipsis trns2 invPssSib br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0 fn fn-primary-t"
            @input="$emit('updateModelValue', $event.target.value)"
            @keyup="$emit('keyupAction', $event.target)"
            v-maska="inputMask"
            :placeholder="placeholder"
            :type="inputType"
            :value="modelValue"   />
        <span v-if="titleFocus" class="elz infoLabel d-block fn11 trns2 invPssLing">{{ titleFocus }}</span>
        <span class="elz d-flex grPin grY2 a-X borB2 evNone">
          <span class="elz p-rel growZ d-flex a-PR">
            <span :class="modelValue ? inputProps.classList : ''" class="elz p-rel d-flex a-X s24 r2">
              <span :class="modelValue ? ' bgBef-CC' : ''" :style="modelValue ? inputProps.icon : ''" class="elz p-rel d-block mskBef s16 cFillBef"></span>
            </span>
          </span>
        </span>
      </label>
      <div v-if="autocomplete" class="elz p-abs pi-T p-H d-block oAuto r3 mT2 hmx320 bgp bor1 z10 bsh-default4 br br-black brA10 bg bg-primary bgL10">
        <div class="elz d-block pV8 lh12">
          <div v-for="(item, index) in autocomplete" :key="index" @click="$emit('autocompleteSelected', index)" class="elz p-rel d-flex pV8 pH16 a-H cur-pointer opAct07 bgHov bgHov-ok fnHov fnHov-ok-t">
            <div class="elz d-block growX">{{ item.value }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputItem",

  emits: [ 'autocompleteSelected', 'keyupAction', 'updateModelValue' ],

  props: {
    modelValue:  { required: true,  type: [Number, String, null] },
    inputType:   { required: true,  type: String },

    autocomplete:{ required: false, type: [Array, Boolean] },
    inputMask:   { required: false, type: [Object, String] },
    inputProps:  { required: false, type: [Object, String] },
    labelClass:  { required: false, type: [Function, String] },
    placeholder: { required: false, type: String },
    titleFocus:  { required: false, type: String },
    titleMain:   { required: false, type: String },
  }
}
</script>

<style scoped>

</style>
