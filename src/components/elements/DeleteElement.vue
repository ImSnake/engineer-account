<template>
  <div @click="deleteItem" class="elz p-abs p-R d-flex gap8 a-X al-center r3 s36 cur-pointer opAct07 bg bg-error bgHovL10 fn fn-error-t">
    <div ref="delete" class="cross elz p-rel d-block p-rel mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/cross1.svg');"></div>
  </div>
</template>

<script>
export default {
  name: "DeleteElement",

  emits: [ 'deleteElement' ],

  data() {
    return {
      deleteItem: false
    }
  },

  deleteItem() {
    if (this.deleteItem) {
      console.log('confirm delete item!');
    } else if (this.$refs.delete.classList.contains('cross')) {
      console.log('delete item?');
      this.$refs.delete.classList.remove('cross');
      this.$refs.delete.classList.add('trash');
      this.deleteItem = true;
      this.$refs.delete.style = "--elzMsk: url('/style/icons/trash.svg');";
      //const clickOut = this.deleteWorkItemClickOut;
      //addEventListener("click", clickOut);


    }
  },

  deleteWorkItemClickOut() {
    document.body.addEventListener("click", this.deleteWorkItemClickOut,{once: true});
    console.log('click out');
    console.log(this.$refs.delete.classList.contains('trash'));

    removeEventListener("click", this.deleteWorkItemClickOut);
    this.$refs.delete.style = "--elzMsk: url('/style/icons/cross1.svg');";
    this.deleteItem = false;
    this.$refs.delete.classList.add('cross');
  },
}
</script>

<style scoped>

</style>
