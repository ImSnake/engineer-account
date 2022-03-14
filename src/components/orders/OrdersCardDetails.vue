<template>

  <div class="elz d-flex a-H pV8 pH16 mH8 fn14 lh14 al-center borB1 hmn80 br br-primary brL-5 brLF20 brFD bold">
    <div class="elz d-block al-center grow">{{ title }}</div>
  </div>
  <div class="elz d-block p20">
    <div class="elz d-block  mT-16">
      <div v-if="contacts" class="elz a-H mT20 lh15">
        <div class="elz d-block bold">Контакты:</div>
        <div class="elz d-block wbreak prewrap" >{{contacts}}</div>
      </div>
      <div v-if="comments" class="elz a-H mT20 lh15">
        <div class="elz d-block bold">Комментарий:</div>
        <div class="elz d-block wbreak prewrap" >{{comments}}</div>
      </div>
    </div>
  </div>

</template>

<script>
//import {valueFormatToHtml} from "@/helpers/formating";

export default {
  name: "OrdersCardDetails",

  props: {
    title: {type: String, required: true},
    contacts: {type: String, required: false},
    comments: {type: String, required: false},
  },

  /*computed: {
    orderComment() {
      return this.comments;
      //return valueFormatToHtml(this.comments);
    },
    orderContacts() {
      return this.contacts;
      //return valueFormatToHtml(this.contacts);
    }
  }*/
}
</script>
