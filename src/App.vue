<template >

  <router-view @logEvent="defineLogAction"  />

</template>

<script>
import { useStore }  from 'vuex';

export default {
  name: 'App',

  setup() {
    const store = useStore();
    store.state.static.currentPage = window.location.pathname;
    store.state.static.theme = localStorage.getItem('engineerAccountAppThemeSettings');

    if (!store.state.static.theme) {
      localStorage.setItem('engineerAccountAppThemeSettings', 'elzTheme-dark');
      store.state.static.theme = 'elzTheme-dark';
    }

    const loader = document.getElementById('engineer-account');
    loader.classList.add(store.state.static.theme);

    return { loader }
  },

  created() {
    if (localStorage.engineerAccountAppToken && localStorage.engineerAccountAppUserData && localStorage.engineerAccountAppFilters) {
      console.log('USER HAS TOKEN!');
      this.$store.dispatch('static/fetchAuthUserToken');
    }
    this.definePageView();
  },

  computed: {
    currentPage() {
      return this.$store.state.static.currentPage;
    }
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
      await this.$store.dispatch('static/fetchAuthUser', authData);
      this.definePageView();
    },

    logOut() {
      console.log('LOG OUT APP');
      this.toAuth();
      setTimeout(()=> this.$store.state.static.user = {}, 500);
      this.$store.state.static.filters = {};

      localStorage.removeItem('engineerAccountAppUserData');
      localStorage.removeItem('engineerAccountAppFilters');
      localStorage.removeItem('engineerAccountAppToken');
    },

    showAppPage() {
      this.loader.classList.remove('hydraLoader', 'authReady');
      if (this.currentPage.includes('order')) {
        const pathArr = this.currentPage.split('/');
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
      this.$store.commit('static/SET_CURRENT_PAGE', '/');
    },

    async toHomePage() {
      console.log('TO HOME PAGE');
      await this.$router.push({name: 'Home'});
      this.$store.commit('static/SET_CURRENT_PAGE', window.location.pathname);
    },

    async toOrderPage(orderId) {
      console.log('TO ORDER PAGE');
      await this.$router.push({
        name: 'Order',
        params: { orderId: orderId }
      });
      this.$store.commit('static/SET_CURRENT_PAGE', window.location.pathname);
    },

  }
}
</script>

<style src="./assets/style/_compilation.css"></style>


