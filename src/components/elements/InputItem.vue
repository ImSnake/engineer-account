<template>
  <div class="elz infoLine d-block mB32">
    <div class="elz infoTitle d-flex a-H hmn40 borB2 mL24 noShrink">
      <div class="elz d-block">{{ titleMain }}</div>
    </div>
    <div class="elz d-block mL24">
      <label class="elz d-grid grPos fn fnLInvD fn-primary-t fnL20 fnHovL10 fnFow-focus fnFowL0">
        <input class="elz d-block grPin grY2 w100p borB2 h40 ellipsis trns2 invPssSib br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0 fn fn-primary-t"
            @input="$emit('updateModelValue', $event.target.value)"
            v-maska="inputMask"
            :placeholder="placeholder"
            :type="inputType"
            :value="modelValue"
        />
        <span class="elz d-flex grPin grY2 a-X borB2 evNone">
          <span class="elz p-rel growZ d-flex a-PR">
            <span class="elz p-rel d-flex a-X s24 r2"
                :ref="refName"
                :class="modelValue ? validClass : ''"  >
              <span class="elz p-rel d-block mskBef s16 cFillBef"
                  :class="modelValue ? ' bgBef-CC' : ''"
                  :style="modelValue ? validIcon : ''"></span>
            </span>
          </span>
        </span>
        <span v-if="titleFocus" class="elz infoLabel d-block fn-8 trns2 invPssLing">{{ titleFocus }}</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputItem",

  emits: ['updateModelValue'],

  props: {
    modelValue:  { required: true,  type: [Number, String] },
    inputType:   { required: true,  type: String },

    labelClass:  { required: false, type: [Function, String] },
    inputMask:   { required: false, type: [Object, String] },
    placeholder: { required: false, type: String },
    refName:     { required: false, type: String },
    titleFocus:  { required: false, type: String },
    titleMain:   { required: false, type: String },
    tooltip:     { required: false, type: String },
    validClass:  { required: false, type: [Function, String] },
    validIcon:   { required: false, type: [Function, String] }
  },

  computed: {

  }
}
</script>

<style scoped>

</style>
