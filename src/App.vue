<template >

  <router-view @logEvent="defineLogAction"  />

</template>

<script>
import { useStore }  from 'vuex';

export default {
  name: 'App',

  setup() {
    const store = useStore();
    store.commit('static/STATE_SET');

    const loader = document.getElementById('engineer-account');
    loader.classList.add(store.state.static.theme);

    let path = window.location.pathname;
    let hash = window.location.hash;

    return { loader, path, hash }
  },

  created() {
    this.$store.dispatch('static/fetchAuthUserToken');
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
      await this.$store.dispatch('static/fetchAuthUser', authData);
      this.definePageView();
    },

    logOut() {
      this.toAuth();
      setTimeout(()=> this.$store.commit('static/STATE_CLEAR'), 500);
    },

    showAppPage() {
      this.loader.classList.remove('hydraLoader', 'authReady');
      if (this.path.includes('order')) {
        const pathArr = this.path.split('/');
        this.toOrderPage(pathArr.slice(-1)[0], this.hash);
      } else {
        this.toHomePage();
      }
    },

    toAuth() {
      this.loader.classList.add('hydraLoader');
      setTimeout(()=> this.loader.classList.add('authReady'), 1100);
      this.$router.push({name: 'Auth'});
    },

    async toHomePage() {
      await this.$router.push({name: 'Home'});
    },

    async toOrderPage(orderId, hash) {
      await this.$router.push({
        name: 'Order',
        params: { orderId: orderId },
        hash: hash
      });
    },

  }
}
</script>

<style src="./assets/style/_compilation.css"></style>


