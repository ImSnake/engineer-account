<template>
  <div v-if="isOpen" class="elz p-rel h0 an-opShow anCount-once anim2 animit">
    <div class="elz p-abs p-AB">
      <div class="elz p-rel d-flex dir-y a-X">
        <div :class="options.classBody" class="elz d-block r3 fn11 bold p8 bg fn bor1 br br-black brA10 bgp bsh-default"><slot></slot></div>
        <div v-if="hasTail" :class="options.classTail" class="elz elzTriangle bordered pad1 tr-B p-rel borBef8 borAft8 brBef br-black brA10 fn"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { tooltipOptions } from "@/helpers/elements_options";

export default {
  name: "Tooltip",

  props: {
    type: { required: true, type: String },
    hasTail: { required: false, type: Boolean },
    duration: { required: false, type: Number }
  },

  setup(props) {
    return { options: tooltipOptions(props.type) }
  },

  data() {
    return {
      isOpen: false
    }
  },

  watch:{
    isOpen: function() {
      setTimeout(() => this.isOpen = false, this.duration || 5000);
    }
  }
}
</script>
