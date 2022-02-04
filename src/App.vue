<template>

  <AuthPage v-if="!isAuthorized && isReady" />

  <HomePage v-if="isAuthorized && isReady" />

</template>

<script>
import AuthPage from "@/views/AuthPage";
import HomePage from "@/views/HomePage";

export default {
  name: 'App',

  components: {
    AuthPage,
    HomePage
  },

  setup() {
    const loader = document.getElementById('engineer-account');
    return {loader}
  },

  data() {
    return {
      isReady: false
    }
  },

  computed: {
    isAuthorized() {
      if (!this.$store.state.user.isAuthorized) {
        this.showAuth();
        return false;
      } else {
        this.showHomePage();
        return true;
      }
    }
  },

  methods: {
    showAuth() {
      this.isReady = false;
      this.loader.classList.add('hydraLoader');
      setTimeout(()=> this.isReady = true, 1000);
      setTimeout(()=> this.loader.classList.add('authReady'), 1100);
    },

    async showHomePage() {
      this.isReady = true;
      this.loader.classList.remove('hydraLoader', 'authReady');
    }
  }
}
</script>

<style src="./assets/style/_compilation.css"></style>


