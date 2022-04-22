<template>
  <div :class="isClosed ? '' : 'sel'" class="elz d-block showSelOut1 hideSelOut1">
    <div @click="isClosed = !isClosed" class="elz d-flex a-H borV1 pH16 gap16 pV10 lh12 opAct07 cur-pointer bg bg-primary br br-primary brL-10 brHovL-15 brLInvD">
      <div class="elz p-rel d-block noShrink p-rel mskBef s8 cFillBef bgBef-CC showSelIn1" style="--elzMsk: url('/style/icons/arrow1.svg');"></div>
      <div class="elz p-rel d-block noShrink p-rel mskBef s8 deg180 cFillBef bgBef-CC hideSelIn1" style="--elzMsk: url('/style/icons/arrow1.svg');"></div>
      <div class="elz d-block growX bold">{{ wrapper.name }}</div>
      <div class="elz d-flex a-H gap8 wmn64 cur-help" :title="`Количество баллов: ${summary}`">
        <div class="elz p-rel d-block p-rel mskBef s14 cFillBef bgBef-CC msk-contain" style="--elzMsk: url('/style/icons/star3.svg');"></div>
        <div class="elz d-block p4 al-center wmn24 r3 fn11 bold bg bg-primary bgL-10">{{ summary }}</div>
      </div>
      <div class="elz d-flex a-H gap8 wmn64 cur-help" :title="`Работ выполняется: ${count}`">
        <div class="elz p-rel d-block p-rel mskBef w18 h14 cFillBef bgBef-CC msk-contain" style="--elzMsk: url('/style/icons/hammer-wrench.svg');"></div>
        <div class="elz d-block p4 al-center wmn24 r3 fn11 bold bg bg-primary bgL-10">{{ count }}</div>
      </div>

    </div>
    <div class="elz d-block showSelIn lh15 uStrip stripEven stripHover stripLD strip005 showSelIn1">
      <template v-for="(field, index) in wrapper.list" :key="index">
        <CheckboxInputField :field="field"  />
      </template>
    </div>
  </div>
</template>

<script>
import CheckboxInputField from "@/components/elements/CheckboxInputField";

export default {
  name: "CheckboxInputFieldWrapper",

  components: {
    CheckboxInputField
  },

  props: {
    wrapper: { required: true, type: Object }
  },

  data() {
    return {
      isClosed: true,
      count: 0,
      summary: 0
    }
  },

  methods: {}
}
</script>

<style scoped>

</style>
