<template>
  <div :class="isClosed ? '' : 'sel'" class="elz d-block showSelOut1 hideSelOut1">
    <div @click="isClosed = !isClosed" class="elz d-flex a-H borV1 pH16 gap16 pV10 lh12 opAct07 cur-pointer bg bg-primary br br-primary brL-10 brHovL-15 brLInvD">
      <div class="elz p-rel d-block noShrink p-rel mskBef s8 cFillBef bgBef-CC showSelIn1" style="--elzMsk: url('/style/icons/arrow1.svg');margin-left: 5px;margin-right: 4px;"></div>
      <div class="elz p-rel d-block noShrink p-rel mskBef s8 deg180 cFillBef bgBef-CC hideSelIn1" style="--elzMsk: url('/style/icons/arrow1.svg');margin-left: 5px;margin-right: 4px;"></div>
      <div class="elz d-block growX bold">{{ itemsList.name }}</div>
      <div class="elz d-flex a-H gap8 wmn80 cur-help" :title="`Количество баллов: ${total.summary}`">
        <div class="elz p-rel d-block p-rel mskBef s14 cFillBef bgBef-CC msk-contain" style="--elzMsk: url('/style/icons/star3.svg');margin-right: 3px"></div>
        <div class="elz d-block p4 al-center wmn24 r3 fn11 bold bg bg-primary bgL-10">{{ total.summary }}</div>
      </div>
      <div class="elz d-flex a-H gap8 wmn64 cur-help" :title="`Работ выполняется: ${total.count}`">
        <div class="elz p-rel d-block p-rel mskBef w18 h14 cFillBef bgBef-CC msk-contain" style="--elzMsk: url('/style/icons/hammer-wrench.svg');margin-right: 3px"></div>
        <div class="elz d-block p4 al-center wmn24 r3 fn11 bold bg bg-primary bgL-10">{{ total.count }}</div>
      </div>

    </div>
    <div class="elz d-block showSelIn lh15 uStrip stripEven stripHover stripLD strip005 showSelIn1">
      <template v-for="field in itemsList.list" :key="field.id">
        <CheckboxInputField
            @toggleCheckbox="(id, checked) => $emit('updateServicesList', id, checked)"
            @updateCount="(id, count) => $emit('updateServiceCount', id, count)"
            :field="field"
            :isDisabled="isDisabled"
            :params="setParams(field.id)"   />
      </template>
    </div>
  </div>
</template>

<script>
import CheckboxInputField from "@/components/elements/CheckboxInputField";

export default {
  name: "CheckboxInputFieldWrapper",

  components: {
    CheckboxInputField
  },

  emits: [ 'updateServicesList', 'updateServiceCount' ],

  props: {
    isDisabled: { required: true, type: Boolean },
    itemsList: { required: true, type: Object },
    itemsSelected: { required: false, type: Array }
  },

  data() {
    return {
      isClosed: !this.isDisabled,
      total: {
        summary: 0,
        count: 0,
      }
    }
  },

  created() {
    this.getTotal();
  },

  updated() {
    this.getTotal();
  },

  computed: {},

  methods: {
    getTotal() {
      let count = 0;
      let summary = 0;
      this.itemsSelected.forEach(parEl => {
        if (this.itemsList.list.find(chEl => +chEl.id === +parEl.scoreServiceId)) {
          count ++;
          summary += +parEl.serviceAmount * +parEl.serviceScore;
        }
      });
      this.total.count = count;
      this.total.summary = summary.toFixed(2);
    },

    setParams(id) {
      return (this.itemsSelected.length && !!this.itemsSelected.find(el => +el.scoreServiceId === +id))
          ? {isChecked: true,  count: this.itemsSelected.find(el => +el.scoreServiceId === +id).serviceAmount}
          : {isChecked: false, count: 0}
    }
  }
}
</script>

<style scoped>

</style>
