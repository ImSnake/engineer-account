<template>
<!--  <div class="elz d-block p24 wmx960 mAuto">
    <div @click="toPreviousPage" class="elz d-flex a-H gap8">
      <div class="elz p-rel d-block p-rel mskBef s16 deg270 cFillBef bgBef-CC" style="&#45;&#45;elzMsk: url('/style/icons//arrow4.svg');"></div>
      <div class="elz d-block fn12 cur-pointer opAct07 underlineHov bold">{{ title }}</div>
    </div>
  </div>-->
  <div class="elz d-block pAT16 wmx1200 mAuto">
    <div @click="toPreviousPage" class="elz d-flex a-H gap8 pV8 fn12 underlineHov cur-pointer opAct07">
      <div class="elz p-rel d-block p-rel mskBef s16 deg270 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/arrow4.svg');"></div>
      <div class="elz d-block bold">К списку заявок</div>
    </div>
  </div>

</template>

<script>
export default {
  name: "BreadCrumbs",

  props: {
    title: {required: true, type: String},
    path:  {required: true, type: String}
  },

  methods: {
    toPreviousPage(){
      this.$router.push({name: this.path});
    }
  }
}
</script>

<style scoped>

</style>
