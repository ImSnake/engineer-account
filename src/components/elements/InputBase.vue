<template>
  <label @click="$emit('on:click', $event)" class="elz d-grid fb200 grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0">
    <input :type="inputType" @change="$emit('on:change', $event.target.value)" :value="modelValue" :readonly="readonly" :placeholder="placeholder" class="elz elzInput d-block grPin grY2 w100p bor1 rL3 h32 pL40 pR8 fn12 ellipsis trns2 invPssSib bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0 fn fn-primary-t">
    <span v-if="icon" class="elz d-flex grPin grY2 a-H bor1 pH7 z6 evNone">
      <span class="elz p-rel d-flex a-X s24 trns2">
        <span class="elz p-rel d-block mskBef s16 cFillBef bgBef-CC" :style="iconPath"></span>
      </span>
    </span>
  </label>
</template>

<script>
export default {
  name: "InputBase",

  emits: ['on:change', 'on:click' ],

  props: {
    modelValue:  { required: true,  type: [Number, String, null] },
    inputType:   { required: true,  type: String },

    classLabel:  { required: false, type: [Function, String] },
    icon:        { required: false, type: String },
/*    inputMask:   { required: false, type: [Object, String] },*/
    placeholder: { required: false, type: String },
    readonly:    { required: false, type: Boolean },
  },

  computed: {
    iconPath() {
      return `--elzMsk: url('/style/icons/${this.icon}.svg')`
    }
  }

}
</script>

