<template>

  <div  class="authWrap bg bg-primary">
    <form @keyup.enter="$emit('logEvent', { login: login, password: password })"  class="authFormWrap">
      <div class="elz authFormShow d-block h80">
        <label class="elz d-grid grPos fn fnLInvD fn-primary-t fnL20 fnHovL10 fnFow-focus fnFowL0">
          <input ref="login" @keyup="validationLogin" v-model="login" :class="login ? loginProps.classApproval : ''" type="text" placeholder="i.ivanov"
                 class="elz d-block grPin grY2 w100p borB2 h48 pH32 ellipsis trns2 invPssSib br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0 fn fn-primary-t" />
          <span class="elz d-flex grPin grY2 a-X borB2 evNone">
            <span class="elz p-rel d-flex a-X s24 trns2">
              <span class="elz p-rel d-block mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/user.svg');"></span>
            </span>
            <span class="elz p-rel growZ d-flex a-PR">
              <span :class="login ? loginProps.tooltip : ''" class="elz p-rel d-flex a-X r2 cur-help opHovOut">
                <span class="elz fn-8 bold al-right pH8 op0 opHovIn10 trns2 trnsVis oH ellipsis">{{ login ? loginProps.text : '' }}</span>
                <span class="elz p-rel d-flex a-X s24 r2 evAuto">
                  <span :class="login ? ' bgBef-CC' : ''" :style="login ? loginProps.icon : ''" class="elz p-rel d-block mskBef s16 cFillBef"></span>
                </span>
              </span>
            </span>
          </span>
          <span class="elz d-block fn-8 trns2 invPssLing">Ваш логин</span>
        </label>
      </div>

      <div class="elz authFormShow d-block h80">
        <label class="elz d-grid grPos fn fnLInvD fn-primary-t fnL20 fnHovL10 fnFow-focus fnFowL0">
          <input @keyup="validationPassword" v-model="password" :class="password ? passwordProps.classApproval : ''" ref="password" type="password" placeholder="Пароль"
                 class="elz d-block grPin grY2 w100p borB2 h48 pH32 ellipsis trns2 invPssSib br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0 fn fn-primary-t" />
          <span class="elz d-flex grPin grY2 a-X borB2 evNone">
            <span class="elz p-rel d-flex a-X s24 trns2">
              <span class="elz p-rel d-block mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/key.svg');"></span>
            </span>
            <span class="elz p-rel growZ d-flex a-PR">
              <span :class="password ? passwordProps.tooltip : ''" class="elz p-rel d-flex a-X r2 cur-help opHovOut">
                <span class="elz fn-8 bold al-right pH8 op0 opHovIn10 trns2 trnsVis oH ellipsis">{{ password ? passwordProps.text : '' }}</span>
                <span class="elz p-rel d-flex a-X s24 r2 evAuto">
                  <span :class="password ? ' bgBef-CC' : ''" :style="password ? passwordProps.icon : ''" class="elz p-rel d-block mskBef s16 cFillBef"></span>
                </span>
              </span>
            </span>
          </span>
          <span class="elz d-block fn-8 trns2 invPssLing">Пароль для входа в систему naukanet</span>
        </label>
      </div>

      <div class="elz authFormShow d-block h48">
        <div @click="$emit('logEvent', { login: login, password: password })" :class="dataIsValid ? '' : 'uDisabled'" class="mV16 elz buttonTest d-flex a-X al-center selNone r3 h48 w100p fn-11 cur-pointer
             bg bg-ok bgHovL3 bgActL-10 bgSelL-10 br brFD brLF-10 br-ok fn fn-ok-t fnHovL10 fnSelL10 trnsStyle trns">Авторизация
        </div>
      </div>

      <div class="elz authFormShow d-block al-center mT24">
        <a class="elz underlineHov cur-pointer fn fn-link-inline fnHovL-10 opAct07" href="#">Поддержка</a>
      </div>
    </form>
  </div>

</template>

<script>
export default {
  name: "AuthPage",

  emits: [ 'logEvent' ],

  setup() {
    return {
      props: {
        error: {
          classApproval: '',
          icon: "--elzMsk: url('/style/icons/info.svg');",
          tooltip: 'fn fn-error bgHov bgHov-error fnHov-error-t',
        },
        success: {
          classApproval: 'isValidValue',
          icon: "--elzMsk: url('/style/icons/checkcircle.svg')",
          tooltip: 'fn fn-success bgHov bgHov-success fnHov-success-t',
        }
      }
    }
  },

  data() {
    return {
      dataIsValid: false,
      login: '',
      loginProps: {
        icon: "--elzMsk: url('/style/icons/info.svg');",
        tooltip: 'fn fn-error bgHov bgHov-error fnHov-error-t'
      },
      password: '',
      passwordProps: {
        icon: "--elzMsk: url('/style/icons/info.svg');",
        tooltip: 'fn fn-error bgHov bgHov-error fnHov-error-t'
      }
    }
  },

  methods: {
    defineSendButtonState() {
      setTimeout(()=> this.dataIsValid = (this.$refs.login.classList.contains('isValidValue') && this.$refs.password.classList.contains('isValidValue')), 300);
    },


/*    async userAuth() {
      //await this.$store.dispatch('static/TESTFetchAuthUser', { login: this.login, password: this.password });
      await this.$store.dispatch('static/fetchAuthUser', { login: this.login, password: this.password });
      console.log('action after user auth');
      /!*(this.$store.state.static.user.isAuthorized) ? this.$router.push({name: 'Home'}) : this.$router.push({name: 'Auth'});*!/
    },*/

    validationDefineOptions(validation, successTxt, errorTxt) {
      return (validation) ? {
        classApproval: 'isValidValue',
        icon: this.props.success.icon,
        tooltip: this.props.success.tooltip,
        text: successTxt
      } : {
        classApproval: '',
        icon: this.props.error.icon,
        tooltip: this.props.error.tooltip,
        text: errorTxt
      }
    },

    validationLogin() {
      const pattern = /^[a-z0-9_.-]{4,}$/;
      //const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      let data = this.login.trim();
      this.loginProps = this.validationDefineOptions(data.match(pattern), 'Валидный логин', 'Логин введен не корректно');
      this.defineSendButtonState();
    },

    validationPassword() {
      const pattern = /^.{4,}$/;
      let data = this.password.trim();
      this.passwordProps = this.validationDefineOptions(data.match(pattern), 'Валидная длина пароля', 'Длина пароля должна быть 4 или более символов');
      this.defineSendButtonState();
    }
  }
}
</script>

<style scoped>

</style>
