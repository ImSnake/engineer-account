<template>
  <div class="elz d-block pAT16 wmx1200 mAuto">
    <a @click.prevent="toPreviousPage" :href='url' class="elz d-flex a-H gap8 pV8 fn12 underlineHov cur-pointer opAct07">
      <div class="elz p-rel d-block p-rel mskBef s16 deg270 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/arrow4.svg');"></div>
      <div class="elz d-block bold">

        <slot></slot>

      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: "BreadCrumbs",

  props: {
    path: { required: true, type: String },
    url: { required: true, type: String }
  },

  methods: {
    async toPreviousPage(){
      await this.$router.push({name: this.path});
    }
  }
}
</script>
