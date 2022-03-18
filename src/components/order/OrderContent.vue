<template>

  <OrderWorks />

  <OrderCustomer />

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

  props: {
    activeComponent: { required: true, type: String }
  },

  mounted() {
    //TODO написать метод, определяющий по переданному критерию какой компонент показать
  }

}
</script>

<style scoped>

</style>
