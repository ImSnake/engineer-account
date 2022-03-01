<template>
  <Header  />

  <ClientForm :orderId="orderId"/>

  <div>TEST!!!</div>

</template>

<script>
import Header from "@/components/Header";
import ClientForm from "@/components/ClientForm";

export default {
  name: "OrderPage",

  components: {
    Header,
    ClientForm
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
