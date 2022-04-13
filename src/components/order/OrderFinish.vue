<template>
  <template v-if="isActive">
    <div class="elz d-flex a-X mB32">
      <a :href="`http://tts.naukanet.ru/customers/orderinfo.asp?OrderID=${$store.state.orderPage.order.details.OrderID}`" target="_blank" :class="[{ uDisabled: !isDisabled },'h48 bg-ok fn-ok-t']" :title="buttonTitle" class="elz d-flex gap8 a-X r3 pH32 cur-pointer opAct07 bg fn">
        <div class="elz d-block grow al-center">{{ buttonTitle }}</div>
      </a>
<!--      <BaseButton
          @onButtonClick="finishOrder"
          :classList="[{ uDisabled: !isDisabled },'h48 bg-ok fn-ok-t']"
          :title="buttonTitle"   />-->
    </div>

    <div class="elz d-flex gapH16 gapV32 f-wrap">
      <FileUploadWrap
          @uploadFile="uploadFile"
          :name="'act'"
          :title="'Загрузить акт'"
          :fileList="$store.state.orderPage.files.act"
          :iconName="'rules'"
          :subTitle="'Нажмите чтобы загрузить файл'"   />

      <FileUploadWrap
          @uploadFile="uploadFile"
          :name="'blanc'"
          :title="'Загрузить бланк заказа'"
          :fileList="$store.state.orderPage.files.blanc"
          :iconName="'file-presentation'"
          :subTitle="'Нажмите чтобы загрузить файл'"   />

      <FileUploadWrap
          @uploadFile="uploadFile"
          :name="'doc'"
          :title="'Загрузить файл'"
          :fileList="$store.state.orderPage.files.doc"
          :iconName="'file-presentation'"
          :subTitle="'Нажмите чтобы загрузить файл'"   />
    </div>
  </template>
</template>

<script>
//import BaseButton     from "@/components/elements/BaseButton";
import FileUploadWrap from "@/components/elements/FileUploadWrap";

export default {
  name: "OrderFinish",

  components: {
    //BaseButton,
    FileUploadWrap
  },

  data() {
    return {
      isActive: false,
      file: ''
    }
  },

  computed: {
    isDisabled() {
      return this.$store.state.orderPage.files.act.length && this.$store.state.orderPage.files.blanc.length;
    },

    buttonTitle(){
      return this.isDisabled ? 'Перейти в TTS для завершения заявки' : 'Требуется загрузить сканы документов';
    }
  },

  methods: {
    finishOrder() {
      console.log('order is finished');
    },

    uploadFile(data) {
/*      const type = e.currentTarget.id;
      const file = this.$refs[type].files[0];*/

      //console.log(data);

      this.$store.commit('orderPage/UPDATE_FILES', data);

      /*let formData = new FormData();
      formData.append('file', this.file);
      console.log(formData);*/
    },

    /*uploadFile(file) {
      console.log('input file update');
      console.log(file);
      if (file.length > 0) {

        this.$store.commit('orderPage/UPDATE_FILES', file);
      }
      //this.$store.dispatch() -> post-action="/upload/post"
    },*/
  }
}
</script>

<style scoped>

</style>
