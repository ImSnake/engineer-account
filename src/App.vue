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

/*  data() {
    return {
      isReady: false
    }
  },*/

  computed: {
    isAuthorized() {
      return this.$store.state.user.isAuthorized;
    }
  },

  watch: {
    isAuthorized() {
     this.definePageView();
    }
  },

  methods: {
    definePageView() {
      console.log('define Page View');
      (!this.isAuthorized) ?  this.showAuth() : this.showHomePage();
    },

    showAuth() {
      //this.isReady = false;
      this.loader.classList.add('hydraLoader');
      setTimeout(()=> this.isReady = true, 1000);
      setTimeout(()=> this.loader.classList.add('authReady'), 1100);
      this.$router.push({name: 'Auth'});
    },

    async showHomePage() {
      this.loader.classList.remove('hydraLoader', 'authReady');
      this.$router.push({name: 'Home'});
      //this.isReady = true;
    }
  }
}
</script>

<style src="./assets/style/_compilation.css"></style>


