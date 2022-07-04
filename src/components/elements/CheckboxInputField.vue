<template>
  <div :class="{uDisabled: isDisabled}" class="elz d-flex f-wrap a-H uStripIn pR16">
    <label class="elz d-flex a-H gap16 growMax fb280 pL16 pV8 cur-pointer">
      <input @change="(e) => $emit('toggleCheckbox', field.id, e.target.checked)" :value="field.id" :checked="params.isChecked" type="checkbox" class="elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s18 p3 r2 cLInvD bg bg-primary bgL10 br br-primary brL-10 brHovL-20 fn fn-primary-t fnHovL-5 bshAct-inset1">
      <span class="elz d-block grow">{{ field.name }}</span>
    </label>
    <div class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb280">
      <div class="elz d-block al-right grow bold growMax pH20">{{ field.value }}</div>
      <label :class="{uDisabled: !params.isChecked}" type="checkbox" class="elz d-grid grow w56 noShrink grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0">
        <input @change="(e) => $emit('updateCount', field.id, e.target.value)" :value="params.count" type="number" min="0" class="elz elzInput d-block grPin grY2 w100p bor1 r3 h24 pL20 fn12 ellipsis trns2 invPssSib bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0 fn fn-primary-t">
        <span class="elz d-flex grPin grY2 a-H pH8 z6 evNone">
          <span class="elz p-rel a-H d-flex trns2">×</span>
        </span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckboxInputField",

  emits: [ 'toggleCheckbox', 'updateCount' ],

  props: {
    field: { required: true, type: Object },
    params: { required: true, type: Object },
    isDisabled: { required: true, type: Boolean }
  }
}
</script>

<style scoped>

</style>
