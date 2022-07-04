<template>
  <div class="elz d-grid w100p grPos fn fn14 fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0 cHovOut">
    <div class="elz elzInput d-flex grPin a-H grY2 w100p bor1 r3 h40 pL16 pR24 ellipsis trns2 invPssSib bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10 brHovInL-20 brFoc-focus brFocL0 fn fn14 fn-primary-t">
      <div class="elz growX pV8 oH nowrap ellipsis">{{ getTitle }}</div>
    </div>
    <span v-if="!disabled" class="elz d-flex grPin grY2 a-H bor1 pH7 z6 evNone">
       <span class="elz p-rel growX d-flex a-PR">
         <span class="elz p-rel d-flex a-X s24 r2 trns2">
           <span class="elz p-rel d-block mskBef s8 cFillBef bgBef-CC deg180" style="--elzMsk: url('/style/icons/arrow2.svg');"></span>
         </span>
       </span>
    </span>
    <select @change.stop="$emit('update:modelValue', $event.target.value)" :value="modelValue" class="elz d-block grPin grY2 p-EA s100p op0 pH16 z7 cur-pointer fn12 bg bg-primary bgL10 bgLInvD fn fn-primary-t">
      <option v-for="(option,index) in options" :key="index" :value="option.value" v-html="option.name"></option>
    </select>
  </div>
</template>

<script>
export default {
  name: "SelectBase",

  emits: [ 'update:modelValue' ],

  props: {
    modelValue: [String, Number],
    disabled: { type: Boolean, required: false },
    options: { type: Array, required: true },
    title: { type: String, required: true }
  },

  computed: {
    getTitle() {
      return (this.modelValue) ? this.options.find(el => el.value == this.modelValue).name : this.title;
    }
  }

/*  methods: {
    updateSelect(event) {
      this.$emit("update:modelValue", parseInt(event.target.value));
    }
  }*/
}
</script>

