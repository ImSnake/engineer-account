<template>
  <div :class="viewSettings" class="elz p-F d-flex a-X">
    <div :class="circleSize" class="elz d-block an-spinner anim8 animit">
      <svg class="elz d-block s100p oV deg270" viewBox="0 0 31.831 31.831">
        <g :stroke-width="circleSize" stroke-linecap="round" fill="none" stroke="currentColor">
          <circle class="fn fn-primary-t" stroke-dasharray="40, 100" cx="50%" cy="50%" r="50%"></circle>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "Uploader",

  props: {
    circleSize:   { required: true, type: String },
    circleWidth:  { required: true, type: String },
    viewSettings: { required: true, type: String }
  }
}
</script>
