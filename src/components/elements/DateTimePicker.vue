<template>
  <div class="elz d-block grow">
    <Datepicker v-model="date" inline autoApply/>
  </div>
  <div class="elz d-flex a-X mT10 gap8">
    <div @click="clearDatepicker" class="elz d-block r3 pV8 pH16 cur-pointer opAct07 bg bg-primary bgHovL-10">Сбросить</div>
    <div @click="setDatepicker" class="elz d-block r3 pV8 pH16 cur-pointer opAct07 bg bg-ok bgHovL10 fn fn-ok-t">Сохранить</div>
  </div>
</template>

<script>
import { ref } from "vue";
import Datepicker from "vue3-date-time-picker";
import "vue3-date-time-picker/dist/main.css";


export default {
  name: "DateTimePicker",

  components: {
    Datepicker
  },

  emits: [ 'datepickerDate' ],

  props: [ 'currentDate' ],

  setup(props) {
    const date = props.currentDate ? props.currentDate : ref(new Date());
    return { date };
  },

  methods: {
    clearDatepicker() {
      this.date = '';
      this.$emit('datepickerDate', this.date);
    },

    setDatepicker() {
      const date = `${this.date.getFullYear()}-${this.defineLeadZero(this.date.getMonth() + 1)}-${this.defineLeadZero(this.date.getDate())} ${this.defineLeadZero(this.date.getHours())}:${this.defineLeadZero(this.date.getMinutes())}:00.000`;
      this.$emit('datepickerDate', date);
    },

    defineLeadZero(number) {
      return number.toString().padStart(2, '0');
    },
  }

}
</script>

<style src="../../assets/style/datepicker/dp.css"></style>
