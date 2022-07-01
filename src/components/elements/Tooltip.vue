<template>
  <div class="elz p-rel h0 an-opShow anCount-once anim2 animit">
    <div class="elz p-abs p-AB">
      <div class="elz p-rel d-flex dir-y a-X">
        <div class="elz d-block r3 fn11 bold p8 bg bg-success fn fn-success-t bor1 br br-black brA10 bgp bsh-default">Скопировано</div>
        <div class="elz elzTriangle bordered pad1 tr-B p-rel borBef8 borAft8 brBef br-black brA10 fn fn-success"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tooltip",

  props: {
    options: { required: true, type: Object }
  }
}
</script>

<style scoped>

</style>
