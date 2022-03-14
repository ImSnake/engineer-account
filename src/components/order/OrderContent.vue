<template>

  <OrderCustomer />

  <OrderWorks />

</template>

<script>
import OrderWorks  from "@/components/order/OrderWorks";
import OrderCustomer from "@/components/order/OrderCustomer";

export default {
  name: "OrderContent",

  components: {
    OrderWorks,
    OrderCustomer
  },

}
</script>

<style scoped>

</style>
