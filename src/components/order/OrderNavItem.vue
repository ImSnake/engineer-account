<template>
  <a :href="'#'+bookmark" @click="$emit('onItemClick')" :class="isActive ? 'sel fn fn-success ' : ' '" class="elz montMenuItem p-rel d-flex grow al-center nowrap noShrink cur-pointer opAct07 scHovOut scSelOut opHovOut opSelOut">
    <div class="elz d-flex a-X grow gap8 pH16">
      <div class="elz p-rel d-block p-rel mskBef s16 cFillBef bgBef-CC" :style="iconPath"></div>
      <div class="elz d-block">{{ title }}</div>
      <div v-if="label" class="elz d-block p4 al-center wmn24 r3 fn11 bold bg bg-primary bgL-10">{{ label }}</div>
      <div class="elz p-abs p-AB d-block h3 mB-2 mH16 rRound scZeroX scHovInFull scSelInFullX op0 opHovIn05 opSelIn10 trnsOccur trns2 bg-CC"></div>
    </div>
  </a>
</template>

<script>
export default {
  name: "OrderNavItem",

  emit: [ 'onItemClick' ],

  props: {
    bookmark: { required: true,  type: String },
    iconName: { required: true,  type: String },
    label:    { required: false, type: [ Number, String ] },
    title:    { required: true,  type: String }
  },

  data() {
    return {
      isActive: false
    }
  },

  computed: {
    iconPath() {
      return `--elzMsk: url('https://lelouch.ru/uploads/icons/${this.iconName}.svg');`;
    }
  }
}
</script>

<style scoped>

</style>
