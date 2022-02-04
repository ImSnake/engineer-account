<template>

  <div class="elz p-abs p-F d-flex dir-y m4 r3 z1 p16 oAuto bsh-default3 bgp bg bg-primary bgL10 bor1 br br-black brA10">
    <div class="elz p-rel d-block cHovOut opActOut cur-pointer pB8">
      <div class="elz d-block mAuto mT36 s64 oH rCircle">
        <img alt="" class="elz d-block s100p obj-cover" src="/style/icons/avatar.svg">
      </div>
      <div class="elz d-block fn14 al-center mT16">{{ details.responsibleName }}</div>

      <div @click="$emit('closePopUp')" class="elz p-abs p-EB d-flex a-X s32 cur-pointer rCircle bg bg-black bgA50 bgHovInA80 fn fn-white fnL-10 fnHovL0 opActIn07 trns trnsStyle" title="Закрыть">
        <div class="elz d-block p-rel mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/cross1.svg');"></div>
      </div>
    </div>
    <div class="elz d-block s-M">
      <div class="elz d-flex a-H mT20" title="Должность">
        <div class="elz d-block p-rel noShrink mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/user.svg');"></div>
        <div class="elz d-block mL8">{{ details.Position }}</div>
      </div>
      <div class="elz d-flex a-H mT20" title="Подразделение">
        <div class="elz d-block p-rel noShrink mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/briefcase.svg');"></div>
        <div class="elz d-block mL8">{{ details.DepartmentName }}</div>
      </div>
      <div class="elz d-flex a-H mT20" title="Мобильный">
        <div class="elz d-block p-rel noShrink mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/mobile.svg');"></div>
        <div class="elz d-block mL8">{{ details.MobilePhone }}</div>
      </div>
      <div class="elz d-flex a-H mT20" title="Добавочный">
        <div class="elz d-block p-rel noShrink mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/phone1.svg');"></div>
        <div class="elz d-block mL8">{{ details.Phone }}</div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "OrderCardPopUp",

  emits: [ 'closePopUp' ],

  props: {
    details: {type: Object, required: true}
  },

  created() {
/*    console.log(this.details);
    console.log(this.$store.state.responsibleList);*/
  }
}
</script>

<style scoped>

</style>
