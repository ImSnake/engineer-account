<template>
  <div @click="$emit('onButtonClick')" class="elz d-flex gap8 a-X r3 pH32 cur-pointer opAct07 bg fn" :class="classList" >
    <div v-if="iconName" class="elz p-rel d-block p-rel noShrink mskBef s16 cFillBef bgBef-CC" :style="iconPath"></div>
    <div class="elz d-block grow al-center">{{ title }}

      <slot></slot>

    </div>
  </div>
</template>

<script>
export default {
  name: "ButtonBase",

  emit: [ 'onButtonClick' ],

  props: {
    classList: { required: true,  type: [Array, String] },

    iconName:  { required: false, type: String },
    title:     { required: false, type: String }
  },

  computed: {
    iconPath() {
      return `--elzMsk: url('/style/icons/${this.iconName}.svg');`;
    }
  }
}
</script>

<style scoped>

</style>
