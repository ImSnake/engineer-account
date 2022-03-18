<template>

  <router-view />

</template>

<script>
export default {
  name: 'App',

  setup() {
    const loader = document.getElementById('engineer-account');
    return { loader }
  },

  created() {
    this.definePageView();
  },

  computed: {
    isAuthorized() {
      return this.$store.state.static.user.isAuthorized;
    }
  },

  watch: {
    isAuthorized() {
     this.definePageView();
    }
  },

  methods: {
    definePageView() {
      (!this.isAuthorized) ?  this.showAuth() : this.showHomePage();
    },

    showAuth() {
      this.loader.classList.add('hydraLoader');
      setTimeout(()=> this.loader.classList.add('authReady'), 1100);
      this.$router.push({name: 'Auth'});
    },

    showHomePage() {
      this.loader.classList.remove('hydraLoader', 'authReady');
      this.$router.push({name: 'Home'});
    }
  }
}
</script>

<style src="./assets/style/_compilation.css"></style>


