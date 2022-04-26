<template>
  <div :class="isClosed ? '' : 'sel'" class="elz d-block showSelOut1 hideSelOut1">
    <div @click="isClosed = !isClosed" class="elz d-flex a-H borV1 pH16 gap16 pV10 lh12 opAct07 cur-pointer bg bg-primary br br-primary brL-10 brHovL-15 brLInvD">
      <div class="elz p-rel d-block noShrink p-rel mskBef s8 cFillBef bgBef-CC showSelIn1" style="--elzMsk: url('/style/icons/arrow1.svg');margin-left: 5px;margin-right: 4px;"></div>
      <div class="elz p-rel d-block noShrink p-rel mskBef s8 deg180 cFillBef bgBef-CC hideSelIn1" style="--elzMsk: url('/style/icons/arrow1.svg');margin-left: 5px;margin-right: 4px;"></div>
      <div class="elz d-block growX bold">{{ itemsList.name }}</div>
      <div class="elz d-flex a-H gap8 wmn56 cur-help" :title="`Количество баллов: ${sumItems}`">
        <div class="elz p-rel d-block p-rel mskBef s14 cFillBef bgBef-CC msk-contain" style="--elzMsk: url('/style/icons/star3.svg');margin-right: 3px"></div>
        <div class="elz d-block p4 al-center wmn24 r3 fn11 bold bg bg-primary bgL-10">{{ sumItems }}</div>
      </div>
      <div class="elz d-flex a-H gap8 wmn56 cur-help" :title="`Работ выполняется: ${countItems}`">
        <div class="elz p-rel d-block p-rel mskBef w18 h14 cFillBef bgBef-CC msk-contain" style="--elzMsk: url('/style/icons/hammer-wrench.svg');margin-right: 3px"></div>
        <div class="elz d-block p4 al-center wmn24 r3 fn11 bold bg bg-primary bgL-10">{{ countItems }}</div>
      </div>

    </div>
    <div class="elz d-block showSelIn lh15 uStrip stripEven stripHover stripLD strip005 showSelIn1">
      <template v-for="(field, index) in itemsList.list" :key="index">
        <CheckboxInputField
            @toggleCheckbox="(id, state) => this.$emit('updateWorkList', id, state)"
            @updateCount="(id, count) => this.$emit('updateWorkCount', id, count)"
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

  emits: [ 'updateWorkList', 'updateWorkCount' ],

  props: {
    isDisabled: { required: true, type: Boolean },
    itemsList: { required: true, type: Object },
    itemsSelected: { required: false, type: Array }
  },

  data() {
    return {
      isClosed: true
    }
  },

  computed: {
    countItems() {
      let count = 0;
      this.itemsSelected.forEach(parEl => {
       if (this.itemsList.list.find(chEl => +chEl.id === +parEl.id)) {
          count ++;
        }
      });
      return count;
    },

    sumItems() {
      let summary = 0;
      this.itemsSelected.forEach(parEl => {
        if (this.itemsList.list.find(chEl => +chEl.id === +parEl.id)) {
          summary += +parEl.count * this.itemsList.list.find(chEl => +chEl.id === +parEl.id).sum;
        }
      });
      return summary.toFixed(2);
      //return summary;
    },
  },

  methods: {
    setParams(id) {
      return (this.itemsSelected.length && !!this.itemsSelected.find(el => +el.id === +id))
          ? {isChecked: true,  count: this.itemsSelected.find(el => +el.id === +id).count}
          : {isChecked: false, count: 0}
    }
  }
}
</script>

<style scoped>

</style>
