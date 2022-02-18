<template>

  <div class="elz p-abs p-F d-flex dir-y m4 r3 z1 p16 oAuto bsh-default3 bgp bg bg-primary bgL10 bor1 br br-black brA10">
    <div class="elz p-rel d-block cHovOut opActOut cur-pointer pB8">
      <div @click="$emit('closePopUp')" class="elz p-abs p-EB d-flex a-X s32 cur-pointer rCircle bg bg-black bgA50 bgHovInA80 fn fn-white fnL-10 fnHovL0 opActIn07 trns trnsStyle" title="Закрыть">
        <div class="elz d-block p-rel mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/cross1.svg');"></div>
      </div>
    </div>
    <slot></slot>
  </div>

</template>

<script>
export default {
  name: "OrderCardPopUp",

  emits: [ 'closePopUp' ],


  created() {
    console.log('pop-up');
  }
}
</script>

<style src="../assets/style/datepicker/dp.css"></style>
