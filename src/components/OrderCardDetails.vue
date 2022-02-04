<template>

  <div class="elz d-flex a-H pV8 pH16 mH8 fn14 lh14 al-center borB1 hmn80 br br-primary brL-5 brLF20 brFD bold">
    <div class="elz d-block al-center grow">{{ title }}</div>
  </div>
  <div class="elz d-block p20">
    <div class="elz d-block  mT-16">
      <div v-if="orderContacts" class="elz a-H mT20 lh15">
        <div class="elz d-block bold">Контакты:</div>
        <div class="elz d-block wbreak" v-html="orderContacts"></div>
      </div>
      <div v-if="orderComment" class="elz a-H mT20 lh15">
        <div class="elz d-block bold">Комментарий:</div>
        <div class="elz d-block wbreak" v-html="orderComment"></div>
      </div>
    </div>
  </div>

</template>

<script>
import {valueFormatToHtml} from "@/helpers/formating";

export default {
  name: "OrderCardDetails",

  props: {
    title: {type: String, required: true},
    contacts: {type: String, required: false},
    comments: {type: String, required: false},
  },

  computed: {
    orderComment() {
      return valueFormatToHtml(this.comments);
    },
    orderContacts() {
      return valueFormatToHtml(this.contacts);
    }
  }
}
</script>
