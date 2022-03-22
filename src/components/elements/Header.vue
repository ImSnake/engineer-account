<template>

  <div class="elz elizeUI p-fixed p-T w100p fn12 fn-roboto fn fn-primary-t">
    <div class="elz elizeEP p-rel d-flex h56 bg bg-EP fn fn-EP-t visHovOut5">
      <div class="elz d-grid dir-y gap8 pH8 or2 grow"></div>
      <div class="elz d-grid dir-y gap8 pH8 or2">
        <div class="elz p-rel d-flex a-X opAct07 cur-pointer fnHov fnHovL15">
          <div class="elz d-flex a-X s40 rCircle oH">
            <div class="elz p-rel d-block p-rel mskBef s16 cFillBef bgBef-CC" title="Заявки в работе" style="--elzMsk: url('/style/icons/briefcase.svg');">
              <div class="elz p-abs p-EC d-flex a-X rRound smn12 pH4 mEC-6 bold fn8 tsh-itext1 bg bg-error fn fn-error-t">{{ iconCase }}</div>
            </div>
          </div>
        </div>
        <div class="elz p-rel d-flex a-X opAct07 cur-pointer fnHov fnHovL15">
          <div class="elz d-flex a-X s40 rCircle oH">
            <div class="elz p-rel d-block p-rel mskBef s16 cFillBef bgBef-CC" title="Просроченные заявки" style="--elzMsk: url('/style/icons/clock.svg');">
              <div class="elz p-abs p-EC d-flex a-X rRound smn12 pH4 mEC-6 bold fn8 tsh-itext1 bg bg-danger fn fn-danger-t">{{ iconClock }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="elz elizeTaskbar d-grid dir-y gap8 pH8 or1">
        <div @click="toggleMenu" class="elz elizeAction p-rel d-flex a-X elizeOverMenuToggler cur-pointer opAct07">
          <div class="elz p-rel d-flex a-X s40 rCircle oH noShrink">
            <img alt="" class="elz d-block s100p" src="/style/icons/avatar.svg" />
            <div class="elz p-abs d-grid gap4 a-X p-F trns visHovIn5">
              <div class="elz d-block bg bg-white w20 h2 r2 bshD bsh-itext1"></div>
              <div class="elz d-block bg bg-white w20 h2 r2 bshD bsh-itext1"></div>
              <div class="elz d-block bg bg-white w20 h2 r2 bshD bsh-itext1"></div>
            </div>
          </div>
          <div class="elz d-block mL8 lh15">
            <div class="elz d-block bold">{{ userNameMin }}</div>
            <div class="elz d-block fn11">{{ userPosition }}</div>
          </div>
        </div>
      </div>
    </div>
    <div ref="menuWrapper" class="elz elizeOverMenu p-fixed">
      <div @click="toggleMenu" class="elz elizeOverMenuOverlay elizeOverMenuToggler p-fixed d-block p-F cur-alias bg bg-black bgA50 trns4"></div>
      <div class="elz elizeMenu uniScroll scrollSimple d-grid p-fixed h100p p-V pi-R bg bg-primary fn fn-primary-t" data-watchtime="450">
        <div class="elz uniScrollIn oAuto p-rel d-flex dir-y h100p scrollHide">
          <div class="elz elizeProfileWrap p-sticky d-block p-T noShrink opHovOut bg bg-primary z2">
            <div class="elz p-rel d-block hmn120">
              <div class="elz p-abs d-block p-F avHeadCutMask l120 bg bg-primary bgL-10 bgLInvD"></div>
              <div class="elz p-abs p-EB d-flex a-X smn56 op025 opHovIn10 trns z5">
                <div @click="toggleMenu" class="elz elizeOverMenuToggler d-flex a-X s32 cur-pointer rCircle bg bg-black bgA50 bgHovA80 fn fn-white fnL-10 fnHovL0 opAct07 trns trnsStyle" title="Закрыть">
                  <div class="elz d-block p-rel mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/cross1.svg');"></div>
                </div>
              </div>
              <div class="p-abs d-flex a-ED p-F pH16">
                <div class="p-rel d-flex grow a-H pH4">
                  <div class="elz uAvatar d-block p-abs s120">
                    <div class="elz d-flex a-X avCutMask p-abs p-F oH rCircle fn24">
                      <!-- Если есть аватар - выводить аватар -->
                      <img class="elz d-block s100p rCircle" alt="" src="/style/icons/avatar.svg"/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="elz p-abs p-AB d-block lh12">
                <div class="elz p-abs p-AB d-block pL128 fn16">
                  <div class="elz d-block pL24 pAR16">{{ userNameFull }}</div>
                </div>
                <div class="elz p-abs p-AT d-block pL128 fn11">
                  <div class="elz d-block pL24 pAR16 bold"> {{ userDepartment }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="elz elizeMenuWrap p-rel d-block grow">
            <div class="elz elizeMenuList z1 p-abs p-AT d-block hmn100p bg bg-primary">
              <div class="elz d-block elizeMenuItem">
                <div class="elz p-rel d-block elizeItemInner">
                  <div class="elz p-rel d-flex hmn56 bgHov bgHov-primary bgHovL-5 bgHovLInvD cHovOut opHovOut">
                    <div class="elz d-flex a-H growX cur-pointer opAct07">
                      <div class="d-flex a-X s56 mH8">
                        <div class="d-flex a-X s40 rCircle bg bg-blue fn fn-white fnL-10 fnHovInL0" title="Галочка на иконке типа">
                          <div class="elz d-flex a-X dsh-text3">
                            <div class="elz d-block p-rel mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/checkmark.svg');"></div>
                          </div>
                        </div>
                      </div>
                      <div class="elz d-block growX lh12 fnHovIn fnHovIn-primary-t fnHovInL-10 fnHovInLInvD">
                        <div class="elz d-block pV2 fn14">Пункт меню скрыт</div>
                        <div class="elz d-block pV2 fn11">Первый уровень меню</div>
                      </div>
                    </div>
                    <div @click="toNextLevel" class="elz elzItemNext p-rel d-flex a-X s56 borL1 mL8 cur-pointer op025 opHov10 opAct07 trns">
                      <div class="elz p-abs p-H d-flex h24 borL1 br br-CC trns op0 opHovIn10"></div>
                      <div class="elz d-block p-rel mskBef s12 cFillBef bgBef-CC deg90" style="--elzMsk: url('/style/icons/arrow2.svg');"></div>
                    </div>
                  </div>
                </div>
                <div class="elz elizeMenuList z1 p-abs p-AT d-block hmn100p bg bg-primary">
                  <div class="elz d-block elizeMenuItem">
                    <div class="elz p-rel d-block elizeItemInner">
                      <div @click="toPreviousLevel" class="elz elzItemBack p-rel d-flex hmn56 bg bgL-8 bgHovL-12 bgLInvD cHovOut opHovOut showHovOut hideHovOut">
                        <div class="elz p-rel d-flex a-H growX cur-pointer opAct07">
                          <div class="d-flex a-X s56 mH8">
                            <div class="d-flex a-X s40 rCircle bg bg-blue fn fn-white fnL-10 fnHovInL0" title="Галочка на иконке типа">
                              <div class="elz d-flex a-X dsh-text3">
                                <div class="elz d-block p-rel mskBef s16 cFillBef bgBef-CC hideHovIn" style="--elzMsk: url('/style/icons/checkmark.svg');"></div>
                                <div class="elz d-block p-rel mskBef s16 cFillBef bgBef-CC deg270 showHovIn" style="--elzMsk: url('/style/icons/arrow2.svg');"></div>
                              </div>
                            </div>
                          </div>
                          <div class="elz d-block growX lh12 fnHovIn fnHovIn-primary-t fnHovInL-10 fnHovInLInvD">
                            <div class="elz d-block pV2 fn14">Пункт меню открыт</div>
                            <div class="elz d-block pV2 fn11 hideHovIn">Второй уровень меню</div>
                            <div class="elz d-block pV2 fn11 bold showHovIn">Вернуться назад</div>
                          </div>
                        </div>
                        <div class="elz p-rel d-flex a-X s56 borL1 mL8 cur-pointer op025 opHov10 opAct07 trns">
                          <div class="elz p-abs p-H d-flex h24 borL1 br br-CC trns op0 opHovIn10"></div>
                          <div class="elz d-block p-rel mskBef s12 cFillBef bgBef-CC deg90" style="--elzMsk: url('/style/icons/cross1.svg');"></div>
                        </div>
                        <div class="elz p-abs p-F borV1 br br-primary brL-12 brLInvD evNone"></div>
                      </div>
                    </div>
                  </div>
                  <div class="elz d-block elizeMenuItem">
                    <div class="elz p-rel d-block elizeItemInner">
                      <div class="elz p-rel d-flex hmn56 bgHov bgHov-primary bgHovL-5 bgHovLInvD cHovOut opHovOut">
                        <div class="elz d-flex a-H growX cur-pointer opAct07">
                          <div class="d-flex a-X s56 mH8">
                            <div class="d-flex a-X s40 rCircle bg bg-primary bgL-10 bgLInvD fn fn-white fnL-5 fnHovInL0" title="Галочка на иконке типа">
                              <div class="elz d-flex a-X dsh-text3">
                                <div class="elz d-block p-rel mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/checkmark.svg');"></div>
                              </div>
                            </div>
                          </div>
                          <div class="elz d-block growX lh12 fnHovIn fnHovIn-primary-t fnHovInL-10 fnHovInLInvD">
                            <div class="elz d-block pV2 fn14">Пункт меню 1</div>
                            <div class="elz d-block pV2 fn11">Второй уровень меню</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="elz d-block elizeMenuItem">
                    <div class="elz p-rel d-block elizeItemInner">
                      <div class="elz p-rel d-flex hmn56 bgHov bgHov-primary bgHovL-5 bgHovLInvD cHovOut opHovOut">
                        <div class="elz d-flex a-H growX cur-pointer opAct07">
                          <div class="d-flex a-X s56 mH8">
                            <div class="d-flex a-X s40 rCircle bg bg-primary bgL-10 bgLInvD fn fn-white fnL-5 fnHovInL0" title="Галочка на иконке типа">
                              <div class="elz d-flex a-X dsh-text3">
                                <div class="elz d-block p-rel mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/checkmark.svg');"></div>
                              </div>
                            </div>
                          </div>
                          <div class="elz d-block growX lh12 fnHovIn fnHovIn-primary-t fnHovInL-10 fnHovInLInvD">
                            <div class="elz d-block pV2 fn14">Пункт меню 2</div>
                            <div class="elz d-block pV2 fn11">Второй уровень меню</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="elz d-block elizeMenuItem">
                    <div class="elz p-rel d-block elizeItemInner">
                      <div class="elz p-rel d-flex hmn56 bgHov bgHov-primary bgHovL-5 bgHovLInvD cHovOut opHovOut">
                        <div class="elz d-flex a-H growX cur-pointer opAct07">
                          <div class="d-flex a-X s56 mH8">
                            <div class="d-flex a-X s40 rCircle bg bg-green fn fn-white fnL-10 fnHovInL0" title="Галочка на иконке типа">
                              <div class="elz d-flex a-X dsh-text3">
                                <div class="elz d-block p-rel mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/checkmark.svg');"></div>
                              </div>
                            </div>
                          </div>
                          <div class="elz d-block growX lh12 fnHovIn fnHovIn-primary-t fnHovInL-10 fnHovInLInvD">
                            <div class="elz d-block pV2 fn14">Пункт меню скрыт</div>
                            <div class="elz d-block pV2 fn11">Второй уровень меню</div>
                          </div>
                        </div>
                        <div @click="toNextLevel" class="elz elzItemNext p-rel d-flex a-X s56 borL1 mL8 cur-pointer op025 opHov10 opAct07 trns">
                          <div class="elz p-abs p-H d-flex h24 borL1 br br-CC trns op0 opHovIn10"></div>
                          <div class="elz d-block p-rel mskBef s12 cFillBef bgBef-CC deg90" style="--elzMsk: url('/style/icons/arrow2.svg');"></div>
                        </div>
                      </div>
                    </div>
                    <div class="elz elizeMenuList z1 p-abs p-AT d-block hmn100p bg bg-primary">
                      <div class="elz d-block elizeMenuItem">
                        <div class="elz p-rel d-block elizeItemInner">
                          <div @click="toPreviousLevel" class="elz elzItemBack p-rel d-flex hmn56 bg bgL-8 bgHovL-12 bgLInvD cHovOut opHovOut showHovOut hideHovOut">
                            <div class="elz p-rel d-flex a-H growX cur-pointer opAct07">
                              <div class="d-flex a-X s56 mH8">
                                <div class="d-flex a-X s40 rCircle bg bg-green fn fn-white fnL-10 fnHovInL0" title="Галочка на иконке типа">
                                  <div class="elz d-flex a-X dsh-text3">
                                    <div class="elz d-block p-rel mskBef s16 cFillBef bgBef-CC hideHovIn" style="--elzMsk: url('/style/icons/checkmark.svg');"></div>
                                    <div class="elz d-block p-rel mskBef s16 cFillBef bgBef-CC deg270 showHovIn" style="--elzMsk: url('/style/icons/arrow2.svg');"></div>
                                  </div>
                                </div>
                              </div>
                              <div class="elz d-block growX lh12 fnHovIn fnHovIn-primary-t fnHovInL-10 fnHovInLInvD">
                                <div class="elz d-block pV2 fn14">Пункт меню открыт</div>
                                <div class="elz d-block pV2 fn11 hideHovIn">Третий уровень меню</div>
                                <div class="elz d-block pV2 fn11 bold showHovIn">Вернуться назад</div>
                              </div>
                            </div>
                            <div class="elz p-rel d-flex a-X s56 borL1 mL8 cur-pointer op025 opHov10 opAct07 trns">
                              <div class="elz p-abs p-H d-flex h24 borL1 br br-CC trns op0 opHovIn10"></div>
                              <div class="elz d-block p-rel mskBef s12 cFillBef bgBef-CC deg90" style="--elzMsk: url('/style/icons/cross1.svg');"></div>
                            </div>
                            <div class="elz p-abs p-F borV1 br br-primary brL-12 brLInvD evNone"></div>
                          </div>
                        </div>
                      </div>
                      <div class="elz d-block elizeMenuItem">
                        <div class="elz p-rel d-block elizeItemInner">
                          <div class="elz p-rel d-flex hmn56 bgHov bgHov-primary bgHovL-5 bgHovLInvD cHovOut opHovOut">
                            <div class="elz d-flex a-H growX cur-pointer opAct07">
                              <div class="d-flex a-X s56 mH8">
                                <div class="d-flex a-X s40 rCircle bg bg-primary bgL-10 bgLInvD fn fn-white fnL-5 fnHovInL0" title="Галочка на иконке типа">
                                  <div class="elz d-flex a-X dsh-text3">
                                    <div class="elz d-block p-rel mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/checkmark.svg');"></div>
                                  </div>
                                </div>
                              </div>
                              <div class="elz d-block growX lh12 fnHovIn fnHovIn-primary-t fnHovInL-10 fnHovInLInvD">
                                <div class="elz d-block pV2 fn14">Пункт меню 1</div>
                                <div class="elz d-block pV2 fn11">Третий уровень меню</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="elz d-block elizeMenuItem">
                        <div class="elz p-rel d-block elizeItemInner">
                          <div class="elz p-rel d-flex hmn56 bgHov bgHov-primary bgHovL-5 bgHovLInvD cHovOut opHovOut">
                            <div class="elz d-flex a-H growX cur-pointer opAct07">
                              <div class="d-flex a-X s56 mH8">
                                <div class="d-flex a-X s40 rCircle bg bg-primary bgL-10 bgLInvD fn fn-white fnL-5 fnHovInL0" title="Галочка на иконке типа">
                                  <div class="elz d-flex a-X dsh-text3">
                                    <div class="elz d-block p-rel mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/checkmark.svg');"></div>
                                  </div>
                                </div>
                              </div>
                              <div class="elz d-block growX lh12 fnHovIn fnHovIn-primary-t fnHovInL-10 fnHovInLInvD">
                                <div class="elz d-block pV2 fn14">Пункт меню 2</div>
                                <div class="elz d-block pV2 fn11">Третий уровень меню</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="elz d-block elizeMenuItem">
                    <div class="elz p-rel d-block elizeItemInner">
                      <div class="elz d-block pH16 pV12 fn10 uppercase bold bg bg-primary bgL-10 bgLInvD">Подкатегория</div>
                    </div>
                  </div>
                  <div class="elz d-block elizeMenuItem">
                    <div class="elz p-rel d-block elizeItemInner">
                      <div class="elz p-rel d-flex hmn56 bgHov bgHov-primary bgHovL-5 bgHovLInvD cHovOut opHovOut">
                        <div class="elz d-flex a-H growX cur-pointer opAct07">
                          <div class="d-flex a-X s56 mH8">
                            <div class="d-flex a-X s40 rCircle bg bg-primary bgL-10 bgLInvD fn fn-white fnL-5 fnHovInL0" title="Галочка на иконке типа">
                              <div class="elz d-flex a-X dsh-text3">
                                <div class="elz d-block p-rel mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/checkmark.svg');"></div>
                              </div>
                            </div>
                          </div>
                          <div class="elz d-block growX lh12 fnHovIn fnHovIn-primary-t fnHovInL-10 fnHovInLInvD">
                            <div class="elz d-block pV2 fn14">Пункт меню 4</div>
                            <div class="elz d-block pV2 fn11">Второй уровень меню</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="elz d-block elizeMenuItem">
                <div class="elz p-rel d-block elizeItemInner">
                  <div class="elz d-block pH16 pV12 fn10 uppercase bold bg bg-primary bgL-10 bgLInvD">Настройки</div>
                </div>
              </div>
              <div class="elz d-block elizeMenuItem">
                <div class="elz p-rel d-block elizeItemInner">
                  <div class="elz p-rel d-flex hmn56 bgHov bgHov-primary bgHovL-5 bgHovLInvD cHovOut opHovOut">
                    <div @click="toggleTheme" class="elz d-flex a-H growX cur-pointer opAct07">
                      <div class="d-flex a-X s56 mH8">
                        <div class="d-flex a-X s40 rCircle bg bg-primary bgL-10 bgLInvD fn fn-white fnL-5 fnHovInL0" title="Галочка на иконке типа">
                          <div class="elz d-flex a-X dsh-text3">
                            <div class="elz d-block p-rel mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/brightnesshalf.svg');"></div>
                          </div>
                        </div>
                      </div>
                      <div class="elz d-block growX lh12 fnHovIn fnHovIn-primary-t fnHovInL-10 fnHovInLInvD">
                        <div ref="themeTitle" :class="activeTheme.name" class="elz d-block pV2 fn14">{{ activeTheme.title }}</div>
                        <div class="elz d-block pV2 fn11">Сменить тему</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="elz d-block elizeMenuItem">
                <div class="elz p-rel d-block elizeItemInner">
                  <div class="elz p-rel d-flex hmn56 bgHov bgHov-primary bgHovL-5 bgHovLInvD cHovOut opHovOut">
                    <div @click="$emit('logOutApp')" class="elz d-flex a-H growX cur-pointer opAct07">
                      <div class="d-flex a-X s56 mH8">
                        <div class="d-flex a-X s40 rCircle bg bg-primary bgL-10 bgLInvD fn fn-white fnL-5 fnHovInL0" title="Галочка на иконке типа">
                          <div class="elz d-flex a-X dsh-text3">
                            <div class="elz d-block p-rel mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/exit.svg');"></div>
                          </div>
                        </div>
                      </div>
                      <div class="elz d-block growX lh12 fnHovIn fnHovIn-primary-t fnHovInL-10 fnHovInLInvD">
                        <div class="elz d-block pV2 fn14">Выход</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Header",

  _theme: [{
      name: 'darkMode',
      title: 'Темная тема',
      class: 'elzTheme-dark'
    }, {
      name: 'lightMode',
      title: 'Светлая тема',
      class: 'elzTheme-light'
  }],

  emits: [ 'logOutApp' ],

  data() {
    return {
      activeTheme: this.$options._theme[0]
    }
  },

  computed: {
    iconCase() {
      return this.$store.state.headerIcons.case;
    },
    iconClock() {
      return this.$store.state.headerIcons.clock;
    },
    userDepartment() {
      return this.$store.state.static.user.departmentName;
    },
    userNameFull() {
      return `${this.$store.state.static.user.surname} ${this.$store.state.static.user.name} ${this.$store.state.static.user.patronymic}`;
    },
    userNameMin() {
      return `${this.$store.state.static.user.surname} ${this.$store.state.static.user.name[0].toUpperCase()}. ${this.$store.state.static.user.patronymic[0].toUpperCase()}.`;
    },
    userPosition() {
      return this.$store.state.static.user.position;
    }
  },

  methods: {
    toNextLevel(e) {
      this.toggleLevel(e, '.elizeMenuItem');
      this.toggleLevel(e, '.elizeMenuList');
    },

    toPreviousLevel(e) {
      this.toggleLevel(e, '.elizeMenuItem.listActive');
      this.toggleLevel(e, '.elizeMenuList.listActive');
    },

    toggleLevel(elem, className) {
      elem.target.closest(className).classList.toggle('listActive');
    },

    toggleMenu() {
      this.$refs.menuWrapper.classList.toggle('menuShow');
    },

    toggleTheme() {
      const loader = document.getElementById('engineer-account');
      loader.classList.remove(this.$options._theme.find(el => el.name === this.activeTheme.name).class);
      this.activeTheme = this.$options._theme.filter(el => el.name !== this.activeTheme.name)[0];
      loader.classList.add(this.activeTheme.class);
    }
  }
}
</script>

<style scoped>

</style>
