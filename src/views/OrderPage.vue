<template>
  <Header  />
<div>TEST!!!</div>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: "OrderPage",

  components: {
    Header
  },

  props: {
    orderId: {required: true, type: String}
  },

  mounted() {
    console.log(this.orderId);
  }
}
</script>

<style scoped>

</style>
