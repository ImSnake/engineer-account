<template>
  <div  class="authWrap bg bg-primary">
    <form @keyup.enter="$emit('logEvent', { login: login, password: password })"  class="authFormWrap">
      <div class="elz authFormShow d-block h80">
        <label class="elz d-grid grPos fn fnLInvD fn-primary-t fnL20 fnHovL10 fnFow-focus fnFowL0">
          <input ref="login" v-model="login" type="text" placeholder="i.ivanov" class="elz d-block grPin grY2 w100p borB2 h48 pH32 ellipsis trns2 invPssSib br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0 fn fn-primary-t" />
          <span class="elz d-flex grPin grY2 a-X borB2 evNone">
            <span class="elz p-rel d-flex a-X s24 trns2">
              <span class="elz p-rel d-block mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/user.svg');"></span>
            </span>
            <span class="elz p-rel growZ d-flex a-PR"></span>
          </span>
          <span class="elz d-block fn11 trns2 invPssLing">Ваш логин</span>
        </label>
      </div>

      <div class="elz authFormShow d-block h80">
        <label class="elz d-grid grPos fn fnLInvD fn-primary-t fnL20 fnHovL10 fnFow-focus fnFowL0">
          <input v-model="password" ref="password" type="password" placeholder="Пароль" class="elz d-block grPin grY2 w100p borB2 h48 pH32 ellipsis trns2 invPssSib br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0 fn fn-primary-t" />
          <span class="elz d-flex grPin grY2 a-X borB2 evNone">
            <span class="elz p-rel d-flex a-X s24 trns2">
              <span class="elz p-rel d-block mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/key.svg');"></span>
            </span>
            <span class="elz p-rel growZ d-flex a-PR"></span>
          </span>
          <span class="elz d-block fn11 trns2 invPssLing">Пароль для входа в систему naukanet</span>
        </label>
      </div>

      <div class="elz authFormShow d-block h48">
        <div @click="$emit('logEvent', { login: login, password: password })" :class="hasData ? '' : 'uDisabled'" class="mV16 elz buttonTest d-flex a-X al-center selNone r3 h48 w100p fn14 cur-pointer bg bg-ok bgHovL3 bgActL-10 bgSelL-10 br brFD brLF-10 br-ok fn fn-ok-t fnHovL10 fnSelL10 trnsStyle trns">
          Авторизация
        </div>
      </div>

      <div v-if="authError" class="elz authFormShow d-block al-center r3 fn12 p16 lh15 mT24 bg bg-error fn fn-error-t">{{authError}}</div>

      <!--      <div class="elz authFormShow d-block al-center mT24">
        <a class="elz underlineHov cur-pointer fn fn-link-inline fnHovL-10 opAct07" href="#">Поддержка</a>
      </div>-->
    </form>
  </div>
</template>

<script>
export default {
  name: "AuthPage",

  emits: [ 'logEvent' ],

  data() {
    return {
      login: '',
      password: ''
    }
  },

  computed: {
    authError() {
      return this.$store.state.static.user.error;
    },

    hasData() {
      return this.login && this.password;
    }
  }
}
</script>
