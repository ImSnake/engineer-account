<template>

  <div class="elz d-block grow fb480">

    <label :for="name">
      <div class="elz p-rel d-block r3 p16 bor1 cur-pointer opAct07 bg bg-primary bgL-5 bgHovL-10 bgLInvD br br-primary brL-10 brLInvD">
        <input type="file" :id="name" :ref="name" style="display:none" @input="uploadFile"  />
        <div class="elz p-abs p-F m8 bor1 br-dashed br br-primary brLF-30 brFInvD brLInvD"></div>
        <div class="elz p-rel d-block al-center lh15">
          <div v-if="iconName" class="elz p-rel d-block p-rel mHAuto mB8 mskBef s32 cFillBef bgBef-CC" :style="icon"></div>
          <div class="elz d-block">{{ title }}</div>
          <div v-if="subTitle" class="elz d-block fn12">{{ subTitle }}</div>
        </div>
      </div>
    </label>

    <div v-if="fileList" class="elz d-flex dir-y gap8 mT8 fn12 lh15">

      <template v-for="index in fileList" :key="index">
        <div class="elz d-flex r3 p8 gap8 bor1 bg bg-primary bgL5 bgLInvD br br-primary brL-10 brLInvD">
          <a class="elz d-flex f-wrap m-8 p8 a-H growX gap8 cur-pointer opAct07" href="#">
            <div class="elz d-block growX wbreak">
              <div class="elz d-block">{{ index.name }}</div>
<!--              <div class="elz d-block fn11">22.03.2022 в 16:45</div>-->
            </div>
          </a>
<!--          v-if="index.loading && !index.loaded"-->
          <div title="Идет загрузка" class="elz d-flex s-H a-X cur-pointer opAct07 s32 rRound bgHov bgHov-primary bgHovL-5 bgHovLInvD">
            <div class="mskIcon elz d-block p-rel noShrink mskBef s16 cFillBef bgBef-CC anim5 an-spinner animit" style="--elzMsk: url('/style/icons/spinner.svg');"></div>
          </div>
<!--          v-else-if="index.loading && index.loaded"-->
          <div title="Удалить" class="elz d-flex s-H a-X cur-pointer opAct07 s32 rRound bgHov bgHov-primary bgHovL-5 bgHovLInvD">
            <div class="mskIcon elz d-block p-rel noShrink mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/cross1.svg');"></div>
          </div>
        </div>
      </template>

    </div>

  </div>

</template>

<script>
export default {
  name: "FileUploadWrap",

  emit: ['uploadFile'],

  props: {
    name:     { required: true,  type: String },
    title:    { required: true,  type: String },
    fileList: { required: false, type: Array },
    iconName: { required: false, type: String },
    subTitle: { required: false, type: String }
  },

  computed: {
    icon() {
      return `--elzMsk: url('https://lelouch.ru/uploads/icons/${this.iconName}.svg');`;
    }
  },

  methods: {
    uploadFile(e) {
      this.$emit('uploadFile', {
        type: e.currentTarget.id,
        file: this.$refs[e.currentTarget.id].files[0]
      })
    }
  }
}
</script>

<style scoped>

</style>
