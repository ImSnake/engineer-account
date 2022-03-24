<template >

  <router-view @logEvent="defineLogAction"  />

</template>

<script>


export default {
  name: 'App',

  setup() {
    const loader = document.getElementById('engineer-account');
    return { loader }
  },

  created() {
    if (localStorage.engineerAccountAppToken && localStorage.engineerAccountAppUserData && localStorage.engineerAccountAppFilters) {
      console.log('USER HAS TOKEN!');
      this.$store.dispatch('static/fetchAuthUserToken');
      console.log(this.$store.state);
    }
    this.definePageView();
  },

  methods: {
    defineLogAction(logData) {
      (logData) ? this.logInn(logData) : this.logOut();
    },

    definePageView() {
      (!this.$store.state.static.user.userId) ? this.toAuth() : this.showAppPage();
    },

    async logInn(authData) {
      console.log('LOG INN APP');
      //await this.$store.dispatch('static/TESTFetchAuthUser', { login: this.login, password: this.password });
      await this.$store.dispatch('static/fetchAuthUser', authData);
      this.definePageView();
    },

    logOut() {
      console.log('LOG OUT APP');
      this.toAuth();
      setTimeout(()=> {
        this.$store.state.static.user = {};
      }, 500);
      this.$store.state.static.filters = {};
      localStorage.removeItem('engineerAccountAppUserData');
      localStorage.removeItem('engineerAccountAppFilters');
      localStorage.removeItem('engineerAccountAppToken');
    },

    showAppPage() {
      this.loader.classList.remove('hydraLoader', 'authReady');
      const path = window.location.pathname;
      if (path.includes('order')) {
        const pathArr = path.split('/');
        this.toOrderPage(pathArr.slice(-1)[0]);
      } else {
        this.toHomePage();
      }
    },

    toAuth() {
      console.log('TO AUTH PAGE');
      this.loader.classList.add('hydraLoader');
      setTimeout(()=> this.loader.classList.add('authReady'), 1100);
      this.$router.push({name: 'Auth'});
    },

    toHomePage() {
      console.log('TO HOME PAGE');
      this.$router.push({name: 'Home'});
    },

    toOrderPage(orderId) {
      console.log('TO ORDER PAGE');
      console.log(orderId);
      this.$router.push({
        name: 'Order',
        params: { orderId: orderId }
      });
    },

  }
}
</script>

<style src="./assets/style/_compilation.css"></style>


