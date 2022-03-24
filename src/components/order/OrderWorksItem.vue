<template>

    <div :class="isClosed ? '' : 'sel'" class="elz d-block bor1 r3 bg bg-primary bgL5 br br-primary brL-10 brLInvD hideSelOut showSelOut">

      <div @click="isClosed = !isClosed" class="elz d-flex gap8 a-H p16 opAct07 cur-pointer">
        <div class="elz d-flex f-wrap a-H grow gap8">
          <div class="elz d-block grow fb320 lh12">
            <div class="elz d-block">Работа #{{ work.workId }}</div>
            <div class="elz d-flex f-wrap gapH16 gapV4 fn11 mT4 nowrap">
              <div class="elz d-block">Начато: <b class="elz bold">{{ setDateTime(work.startDate) }}</b></div>
              <div class="elz d-block">Завершено: <b class="elz bold">{{ setDateTime(work.finishDate) }}</b></div>
            </div>
          </div>
          <div class="elz d-flex f-wrap fn12 gapH16 gapV8">
            <div class="elz d-flex a-H gap8 wmn64 cur-help" :title="`Участников: ${work.participants.length}`">
              <div class="elz p-rel d-block p-rel mskBef s16 cFillBef bgBef-CC msk-contain" style="--elzMsk: url('/style/icons/user.svg');"></div>
              <div class="elz d-block bold">{{ work.participants.length }}</div>
            </div>
            <div class="elz d-flex a-H gap8 wmn64 cur-help" :title="`Работ выполняется: ${work.workList.length}`">
              <div class="elz p-rel d-block p-rel mskBef w20 h16 cFillBef bgBef-CC msk-contain" style="--elzMsk: url('/style/icons/hammer-wrench.svg');"></div>
              <div class="elz d-block bold">{{ work.workList.length }}</div>
            </div>
            <div class="elz d-flex a-H gap8 wmn64 cur-help" :title="`Баллов начислено: ${work.points}`">
              <div class="elz p-rel d-block p-rel mskBef s16 cFillBef bgBef-CC msk-contain" style="--elzMsk: url('/style/icons/star3.svg');"></div>
              <div class="elz d-block bold">{{ work.points }}</div>
            </div>
          </div>
        </div>
        <div class="elz p-rel d-block noShrink p-rel mskBef s8 deg180 cFillBef bgBef-CC hideSelIn" style="--elzMsk: url('/style/icons/arrow1.svg');"></div>
        <div class="elz p-rel d-block noShrink p-rel mskBef s8 cFillBef bgBef-CC showSelIn" style="--elzMsk: url('/style/icons/arrow1.svg');"></div>
      </div>

      <div class="elz d-block borT1 br br-primary brL-10 brLInvD fn12 showSelIn">

        <div class="elz p-sticky p-TEP pH16 pV8 mV8 z10 bg bg-primary bgL5">
          <div class="elz p-rel d-flex pH36 f-wrap a-X gap8">

          <template v-if="workStatus === 0">
            <BaseButton @onButtonClick="workStart"
                :classList="'hmn36 bg-ok bgHovL10 fn-ok-t'"
                :title="'Начать работу'"   />
          </template>

          <template v-else-if="workStatus === 1" >
            <BaseButton @onButtonClick="workFinish"
                :classList="'hmn36 bg-success bgHovL10 fn-success-t'"
                :title="'Завершить работу'"   />
          </template>

            <template v-else>
              <BaseButton
                  :classList="'hmn36 bg-primary bgL-5 bgLInvD bgHovL-10 uDisabled'"
                  :title="'Работы завершены'"   />
            </template>

            <template v-if="workStatus === 0">
              <DeleteElement   />
            </template>

<!--            <div v-if="workStatus === 0" @click="deleteWorkItem" class="elz p-abs p-R d-flex gap8 a-X al-center r3 s36 cur-pointer opAct07 bg bg-error bgHovL10 fn fn-error-t">
              <div ref="delete" class="cross elz p-rel d-block p-rel mskBef s16 cFillBef bgBef-CC" style="&#45;&#45;elzMsk: url('/style/icons/cross1.svg');"></div>
            </div>-->

          </div>
        </div>

        <div class="elz d-grid gap8 grH200 pH16">
          <label class="elz d-flex a-H r3 bor1 pH16 pV10 opAct07 cur-pointer bg bg-primary br br-primary brL-10 brHovL-15 brLInvD">
            <input type="checkbox" checked="" class="elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s24 p4 r2
                                                                     cLInvD bg bg-primary bgL10
                                                                     br br-primary brL-10 brHovL-20
                                                                     fn fn-primary-t fnHovL-5
                                                                     bshAct-inset1">
            <span class="elz d-block growX mL16">
                            <span class="elz d-block bold lh12 oH ellipsis nowrap">Пустовит Д. В. dlkfgj hlkdj lfgkjh ldkfgh</span>
                            <span class="elz d-block fn11 mT8">09.03.2022 в 16:27</span>
                        </span>
          </label>



          <label class="elz d-flex a-H r3 bor1 pH16 pV10 opAct07 cur-pointer bg bg-primary br br-primary brL-10 brHovL-15 brLInvD">
            <input type="checkbox" class="elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s24 p4 r2
                                                                     cLInvD bg bg-primary bgL10
                                                                     br br-primary brL-10 brHovL-20
                                                                     fn fn-primary-t fnHovL-5
                                                                     bshAct-inset1">
            <span class="elz d-block growX mL16">
                            <span class="elz d-block bold lh12 oH ellipsis nowrap">Пустовит Д. В. dlkfgj hlkdj lfgkjh ldkfgh</span>
                            <span class="elz d-block fn11 mT8 op05">Время не задано</span>
                        </span>
          </label>
          <label class="elz d-flex a-H r3 bor1 pH16 pV10 opAct07 cur-pointer bg bg-primary br br-primary brL-10 brHovL-15 brLInvD">
            <input type="checkbox" class="elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s24 p4 r2
                                                                     cLInvD bg bg-primary bgL10
                                                                     br br-primary brL-10 brHovL-20
                                                                     fn fn-primary-t fnHovL-5
                                                                     bshAct-inset1">
            <span class="elz d-block growX mL16">
                            <span class="elz d-block bold lh12 oH ellipsis nowrap">Пустовит Д. В. dlkfgj hlkdj lfgkjh ldkfgh</span>
                            <span class="elz d-block fn11 mT8 op05">Время не задано</span>
                        </span>
          </label>
          <label class="elz d-flex a-H r3 bor1 pH16 pV10 opAct07 cur-pointer bg bg-primary br br-primary brL-10 brHovL-15 brLInvD">
            <input type="checkbox" class="elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s24 p4 r2
                                                                     cLInvD bg bg-primary bgL10
                                                                     br br-primary brL-10 brHovL-20
                                                                     fn fn-primary-t fnHovL-5
                                                                     bshAct-inset1">
            <span class="elz d-block growX mL16">
                            <span class="elz d-block bold lh12 oH ellipsis nowrap">Пустовит Д. В. dlkfgj hlkdj lfgkjh ldkfgh</span>
                            <span class="elz d-block fn11 mT8 op05">Время не задано</span>
                        </span>
          </label>
          <label class="elz d-flex a-H r3 bor1 pH16 pV10 opAct07 cur-pointer bg bg-primary br br-primary brL-10 brHovL-15 brLInvD">
            <input type="checkbox" class="elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s24 p4 r2
                                                                     cLInvD bg bg-primary bgL10
                                                                     br br-primary brL-10 brHovL-20
                                                                     fn fn-primary-t fnHovL-5
                                                                     bshAct-inset1">
            <span class="elz d-block growX mL16">
                            <span class="elz d-block bold lh12 oH ellipsis nowrap">Пустовит Д. В. dlkfgj hlkdj lfgkjh ldkfgh</span>
                            <span class="elz d-block fn11 mT8 op05">Время не задано</span>
                        </span>
          </label>
          <label class="elz d-flex a-H r3 bor1 pH16 pV10 opAct07 cur-pointer bg bg-primary br br-primary brL-10 brHovL-15 brLInvD">
            <input type="checkbox" class="elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s24 p4 r2
                                                                     cLInvD bg bg-primary bgL10
                                                                     br br-primary brL-10 brHovL-20
                                                                     fn fn-primary-t fnHovL-5
                                                                     bshAct-inset1">
            <span class="elz d-block growX mL16">
                            <span class="elz d-block bold lh12 oH ellipsis nowrap">Пустовит Д. В. dlkfgj hlkdj lfgkjh ldkfgh</span>
                            <span class="elz d-block fn11 mT8 op05">Время не задано</span>
                        </span>
          </label>
          <label class="elz d-flex a-H r3 bor1 pH16 pV10 opAct07 cur-pointer bg bg-primary br br-primary brL-10 brHovL-15 brLInvD">
            <input type="checkbox" class="elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s24 p4 r2
                                                                     cLInvD bg bg-primary bgL10
                                                                     br br-primary brL-10 brHovL-20
                                                                     fn fn-primary-t fnHovL-5
                                                                     bshAct-inset1">
            <span class="elz d-block growX mL16">
                            <span class="elz d-block bold lh12 oH ellipsis nowrap">Пустовит Д. В. dlkfgj hlkdj lfgkjh ldkfgh</span>
                            <span class="elz d-block fn11 mT8 op05">Время не задано</span>
                        </span>
          </label>
          <label class="elz d-flex a-H r3 bor1 pH16 pV10 opAct07 cur-pointer bg bg-primary br br-primary brL-10 brHovL-15 brLInvD">
            <input type="checkbox" class="elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s24 p4 r2
                                                                     cLInvD bg bg-primary bgL10
                                                                     br br-primary brL-10 brHovL-20
                                                                     fn fn-primary-t fnHovL-5
                                                                     bshAct-inset1">
            <span class="elz d-block growX mL16">
                            <span class="elz d-block bold lh12 oH ellipsis nowrap">Пустовит Д. В. dlkfgj hlkdj lfgkjh ldkfgh</span>
                            <span class="elz d-block fn11 mT8 op05">Время не задано</span>
                        </span>
          </label>

        </div>

        <div class="elz d-block mT16 r3 oH">
          <div class="elz d-block showSelOut1 hideSelOut1 sel">
            <div class="elz d-flex a-H borV1 pH16 gap16 pV10 lh12 opAct07 cur-pointer bg bg-primary br br-primary brL-10 brHovL-15 brLInvD">
              <div class="elz d-block growX bold">Типовые работы по заявкам</div>
              <div class="elz d-block p4 al-center wmn24 r3 fn11 bold bg bg-primary bgL-10">16</div>
              <div class="elz p-rel d-block noShrink p-rel mskBef s8 cFillBef bgBef-CC showSelIn1" style="--elzMsk: url('https://lelouch.ru/uploads/icons/arrow1.svg');"></div>
              <div class="elz p-rel d-block noShrink p-rel mskBef s8 deg180 cFillBef bgBef-CC hideSelIn1" style="--elzMsk: url('https://lelouch.ru/uploads/icons/arrow1.svg');"></div>
            </div>
            <div class="elz d-block showSelIn lh15 uStrip stripEven stripHover stripLD strip005 showSelIn1">



              <div class="elz d-flex f-wrap a-H uStripIn pR16">
                <label class="elz d-flex a-H gap16 growMax fb280 pL16 pV8 cur-pointer">
                  <input type="checkbox" checked="" class="elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s18 p3 r2
                                                                     cLInvD bg bg-primary bgL10
                                                                     br br-primary brL-10 brHovL-20
                                                                     fn fn-primary-t fnHovL-5
                                                                     bshAct-inset1">
                  <span class="elz d-block grow">Выполнение проработки</span>
                </label>
                <form class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb280">
                  <div class="elz d-block al-right grow bold growMax">за 1 заявку</div>
                  <label class="elz d-grid grow w64 noShrink grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0">
                    <input type="text" value="" placeholder="" class="elz elzInput d-block grPin grY2 w100p bor1 r3 h24 pL20 fn12 ellipsis trns2 invPssSib
                                                                                        bg bg-primary bgL10 bgLInvD
                                                                                        br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                        fn fn-primary-t">
                    <span class="elz d-flex grPin grY2 a-H pH8 z6 evNone">
                                                <span class="elz p-rel a-H d-flex trns2">×</span>
                                        </span>
                  </label>
                  <input type="submit" class="elz hide"/>
                </form>
              </div>
              <div class="elz d-flex f-wrap a-H uStripIn pR16">
                <label class="elz d-flex a-H gap16 growMax fb280 pL16 pV8 cur-pointer">
                  <input type="checkbox" checked="" class="elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s18 p3 r2
                                                                     cLInvD bg bg-primary bgL10
                                                                     br br-primary brL-10 brHovL-20
                                                                     fn fn-primary-t fnHovL-5
                                                                     bshAct-inset1">
                  <span class="elz d-block grow">Выполнение подключения (Физические лица или юридические лица на объектах с развитой инфраструктурой)</span>
                </label>
                <form class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb280">
                  <div class="elz d-block al-right grow bold growMax">за 1 заявку</div>
                  <label class="elz d-grid grow w64 noShrink grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0">
                    <input type="text" value="" placeholder="" class="elz elzInput d-block grPin grY2 w100p bor1 r3 h24 pL20 fn12 ellipsis trns2 invPssSib
                                                                                        bg bg-primary bgL10 bgLInvD
                                                                                        br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                        fn fn-primary-t">
                    <span class="elz d-flex grPin grY2 a-H pH8 z6 evNone">
                                                <span class="elz p-rel a-H d-flex trns2">×</span>
                                        </span>
                  </label>
                  <input type="submit" class="elz hide"/>
                </form>
              </div>
              <div class="elz d-flex f-wrap a-H uStripIn pR16">
                <label class="elz d-flex a-H gap16 growMax fb280 pL16 pV8 cur-pointer">
                  <input type="checkbox" checked="" class="elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s18 p3 r2
                                                                     cLInvD bg bg-primary bgL10
                                                                     br br-primary brL-10 brHovL-20
                                                                     fn fn-primary-t fnHovL-5
                                                                     bshAct-inset1">
                  <span class="elz d-block grow">Выполнение подключения без проработки  (Физические лица или юридические лица на объектах с развитой инфраструктурой)</span>
                </label>
                <form class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb280">
                  <div class="elz d-block al-right grow bold growMax">за 1 заявку</div>
                  <label class="elz d-grid grow w64 noShrink grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0">
                    <input type="text" value="" placeholder="" class="elz elzInput d-block grPin grY2 w100p bor1 r3 h24 pL20 fn12 ellipsis trns2 invPssSib
                                                                                        bg bg-primary bgL10 bgLInvD
                                                                                        br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                        fn fn-primary-t">
                    <span class="elz d-flex grPin grY2 a-H pH8 z6 evNone">
                                                <span class="elz p-rel a-H d-flex trns2">×</span>
                                        </span>
                  </label>
                  <input type="submit" class="elz hide"/>
                </form>
              </div>
              <div class="elz d-flex f-wrap a-H uStripIn pR16">
                <label class="elz d-flex a-H gap16 growMax fb280 pL16 pV8 cur-pointer">
                  <input type="checkbox" checked="" class="elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s18 p3 r2
                                                                     cLInvD bg bg-primary bgL10
                                                                     br br-primary brL-10 brHovL-20
                                                                     fn fn-primary-t fnHovL-5
                                                                     bshAct-inset1">
                  <span class="elz d-block grow">Монтаж\демонтаж оборудования по отдельной заявке</span>
                </label>
                <form class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb280">
                  <div class="elz d-block al-right grow bold growMax">за 1 ед.</div>
                  <label class="elz d-grid grow w64 noShrink grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0">
                    <input type="text" value="" placeholder="" class="elz elzInput d-block grPin grY2 w100p bor1 r3 h24 pL20 fn12 ellipsis trns2 invPssSib
                                                                                        bg bg-primary bgL10 bgLInvD
                                                                                        br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                        fn fn-primary-t">
                    <span class="elz d-flex grPin grY2 a-H pH8 z6 evNone">
                                                <span class="elz p-rel a-H d-flex trns2">×</span>
                                        </span>
                  </label>
                  <input type="submit" class="elz hide"/>
                </form>
              </div>
              <div class="elz d-flex f-wrap a-H uStripIn pR16">
                <label class="elz d-flex a-H gap16 growMax fb280 pL16 pV8 cur-pointer">
                  <input type="checkbox" checked="" class="elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s18 p3 r2
                                                                     cLInvD bg bg-primary bgL10
                                                                     br br-primary brL-10 brHovL-20
                                                                     fn fn-primary-t fnHovL-5
                                                                     bshAct-inset1">
                  <span class="elz d-block grow">Мелокие работы по отдельным заявкам (установка розетки, удлинение кабеля, настройка роутера или ПК у клиента, настройка регистратора СВН и т.п.)</span>
                </label>
                <form class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb280">
                  <div class="elz d-block al-right grow bold growMax">за 1 заявку</div>
                  <label class="elz d-grid grow w64 noShrink grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0">
                    <input type="text" value="" placeholder="" class="elz elzInput d-block grPin grY2 w100p bor1 r3 h24 pL20 fn12 ellipsis trns2 invPssSib
                                                                                        bg bg-primary bgL10 bgLInvD
                                                                                        br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                        fn fn-primary-t">
                    <span class="elz d-flex grPin grY2 a-H pH8 z6 evNone">
                                                <span class="elz p-rel a-H d-flex trns2">×</span>
                                        </span>
                  </label>
                  <input type="submit" class="elz hide"/>
                </form>
              </div>
              <div class="elz d-flex f-wrap a-H uStripIn pR16">
                <label class="elz d-flex a-H gap16 growMax fb280 pL16 pV8 cur-pointer">
                  <input type="checkbox" checked="" class="elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s18 p3 r2
                                                                     cLInvD bg bg-primary bgL10
                                                                     br br-primary brL-10 brHovL-20
                                                                     fn fn-primary-t fnHovL-5
                                                                     bshAct-inset1">
                  <span class="elz d-block grow">Не типовые задачи по заявке (оценивается на усмотрение)</span>
                </label>
                <form class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb280">
                  <div class="elz d-block al-right grow bold growMax">за 1 заявку</div>
                  <label class="elz d-grid grow w64 noShrink grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0">
                    <input type="text" value="" placeholder="" class="elz elzInput d-block grPin grY2 w100p bor1 r3 h24 pL20 fn12 ellipsis trns2 invPssSib
                                                                                        bg bg-primary bgL10 bgLInvD
                                                                                        br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                        fn fn-primary-t">
                    <span class="elz d-flex grPin grY2 a-H pH8 z6 evNone">
                                                <span class="elz p-rel a-H d-flex trns2">×</span>
                                        </span>
                  </label>
                  <input type="submit" class="elz hide"/>
                </form>
              </div>





            </div>
          </div>
          <div class="elz d-block showSelOut1 hideSelOut1 sel">
            <div class="elz d-flex a-H borV1 pH16 gap16 pV10 lh12 opAct07 cur-pointer bg bg-primary br br-primary brL-10 brHovL-15 brLInvD">
              <div class="elz d-block growX bold">Типовые работы по заявкам</div>
              <div class="elz d-block p4 al-center wmn24 r3 fn11 bold bg bg-primary bgL-10">16</div>
              <div class="elz p-rel d-block noShrink p-rel mskBef s8 cFillBef bgBef-CC showSelIn1" style="--elzMsk: url('https://lelouch.ru/uploads/icons/arrow1.svg');"></div>
              <div class="elz p-rel d-block noShrink p-rel mskBef s8 deg180 cFillBef bgBef-CC hideSelIn1" style="--elzMsk: url('https://lelouch.ru/uploads/icons/arrow1.svg');"></div>
            </div>
            <div class="elz d-block showSelIn lh15 uStrip stripEven stripHover stripLD strip005 showSelIn1">


              <div class="elz d-flex f-wrap a-H uStripIn pR16">
                <label class="elz d-flex a-H gap16 growMax fb280 pL16 pV8 cur-pointer">
                  <input type="checkbox" checked="" class="elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s18 p3 r2
                                                                     cLInvD bg bg-primary bgL10
                                                                     br br-primary brL-10 brHovL-20
                                                                     fn fn-primary-t fnHovL-5
                                                                     bshAct-inset1">
                  <span class="elz d-block grow">Монтаж кабеля внутри помещения, по лоткам либо подвязка к существующей трассе (UTP, ВОК, ЭП)</span>
                </label>
                <form class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb280">
                  <div class="elz d-block al-right grow bold growMax">за 100 метров</div>
                  <label class="elz d-grid grow w64 noShrink grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0">
                    <input type="text" value="" placeholder="" class="elz elzInput d-block grPin grY2 w100p bor1 r3 h24 pL20 fn12 ellipsis trns2 invPssSib
                                                                                        bg bg-primary bgL10 bgLInvD
                                                                                        br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                        fn fn-primary-t">
                    <span class="elz d-flex grPin grY2 a-H pH8 z6 evNone">
                                                <span class="elz p-rel a-H d-flex trns2">×</span>
                                        </span>
                  </label>
                  <input type="submit" class="elz hide"/>
                </form>
              </div>
              <div class="elz d-flex f-wrap a-H uStripIn pR16">
                <label class="elz d-flex a-H gap16 growMax fb280 pL16 pV8 cur-pointer">
                  <input type="checkbox" checked="" class="elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s18 p3 r2
                                                                     cLInvD bg bg-primary bgL10
                                                                     br br-primary brL-10 brHovL-20
                                                                     fn fn-primary-t fnHovL-5
                                                                     bshAct-inset1">
                  <span class="elz d-block grow">Укладка кабеля в гофру или кабель-канал, </span>
                </label>
                <form class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb280">
                  <div class="elz d-block al-right grow bold growMax">за 100 метров</div>
                  <label class="elz d-grid grow w64 noShrink grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0">
                    <input type="text" value="" placeholder="" class="elz elzInput d-block grPin grY2 w100p bor1 r3 h24 pL20 fn12 ellipsis trns2 invPssSib
                                                                                        bg bg-primary bgL10 bgLInvD
                                                                                        br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                        fn fn-primary-t">
                    <span class="elz d-flex grPin grY2 a-H pH8 z6 evNone">
                                                <span class="elz p-rel a-H d-flex trns2">×</span>
                                        </span>
                  </label>
                  <input type="submit" class="elz hide"/>
                </form>
              </div>
              <div class="elz d-flex f-wrap a-H uStripIn pR16">
                <label class="elz d-flex a-H gap16 growMax fb280 pL16 pV8 cur-pointer">
                  <input type="checkbox" checked="" class="elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s18 p3 r2
                                                                     cLInvD bg bg-primary bgL10
                                                                     br br-primary brL-10 brHovL-20
                                                                     fn fn-primary-t fnHovL-5
                                                                     bshAct-inset1">
                  <span class="elz d-block grow">Монтаж кабеля в кабельной канализации, подвес кабеля к тросу (UTP, ВОК, ЭП), подвес кабеля на опоры с монтажем крюков на опоры</span>
                </label>
                <form class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb280">
                  <div class="elz d-block al-right grow bold growMax">за 100 метров</div>
                  <label class="elz d-grid grow w64 noShrink grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0">
                    <input type="text" value="" placeholder="" class="elz elzInput d-block grPin grY2 w100p bor1 r3 h24 pL20 fn12 ellipsis trns2 invPssSib
                                                                                        bg bg-primary bgL10 bgLInvD
                                                                                        br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                        fn fn-primary-t">
                    <span class="elz d-flex grPin grY2 a-H pH8 z6 evNone">
                                                <span class="elz p-rel a-H d-flex trns2">×</span>
                                        </span>
                  </label>
                  <input type="submit" class="elz hide"/>
                </form>
              </div>
              <div class="elz d-flex f-wrap a-H uStripIn pR16">
                <label class="elz d-flex a-H gap16 growMax fb280 pL16 pV8 cur-pointer">
                  <input type="checkbox" checked="" class="elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s18 p3 r2
                                                                     cLInvD bg bg-primary bgL10
                                                                     br br-primary brL-10 brHovL-20
                                                                     fn fn-primary-t fnHovL-5
                                                                     bshAct-inset1">
                  <span class="elz d-block grow">Монтаж кабель каналов до 100 мм</span>
                </label>
                <form class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb280">
                  <div class="elz d-block al-right grow bold growMax">за 20 метров</div>
                  <label class="elz d-grid grow w64 noShrink grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0">
                    <input type="text" value="" placeholder="" class="elz elzInput d-block grPin grY2 w100p bor1 r3 h24 pL20 fn12 ellipsis trns2 invPssSib
                                                                                        bg bg-primary bgL10 bgLInvD
                                                                                        br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                        fn fn-primary-t">
                    <span class="elz d-flex grPin grY2 a-H pH8 z6 evNone">
                                                <span class="elz p-rel a-H d-flex trns2">×</span>
                                        </span>
                  </label>
                  <input type="submit" class="elz hide"/>
                </form>
              </div>
              <div class="elz d-flex f-wrap a-H uStripIn pR16">
                <label class="elz d-flex a-H gap16 growMax fb280 pL16 pV8 cur-pointer">
                  <input type="checkbox" checked="" class="elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s18 p3 r2
                                                                     cLInvD bg bg-primary bgL10
                                                                     br br-primary brL-10 brHovL-20
                                                                     fn fn-primary-t fnHovL-5
                                                                     bshAct-inset1">
                  <span class="elz d-block grow">Монтаж лотков ( со шпильками)</span>
                </label>
                <form class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb280">
                  <div class="elz d-block al-right grow bold growMax">за 20 метров</div>
                  <label class="elz d-grid grow w64 noShrink grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0">
                    <input type="text" value="" placeholder="" class="elz elzInput d-block grPin grY2 w100p bor1 r3 h24 pL20 fn12 ellipsis trns2 invPssSib
                                                                                        bg bg-primary bgL10 bgLInvD
                                                                                        br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                        fn fn-primary-t">
                    <span class="elz d-flex grPin grY2 a-H pH8 z6 evNone">
                                                <span class="elz p-rel a-H d-flex trns2">×</span>
                                        </span>
                  </label>
                  <input type="submit" class="elz hide"/>
                </form>
              </div>




            </div>
          </div>
          <div class="elz d-block showSelOut1 hideSelOut1 sel">
            <div class="elz d-flex a-H borV1 pH16 gap16 pV10 lh12 opAct07 cur-pointer bg bg-primary br br-primary brL-10 brHovL-15 brLInvD">
              <div class="elz d-block growX bold">Типовые работы по заявкам</div>
              <div class="elz d-block p4 al-center wmn24 r3 fn11 bold bg bg-primary bgL-10">16</div>
              <div class="elz p-rel d-block noShrink p-rel mskBef s8 cFillBef bgBef-CC showSelIn1" style="--elzMsk: url('https://lelouch.ru/uploads/icons/arrow1.svg');"></div>
              <div class="elz p-rel d-block noShrink p-rel mskBef s8 deg180 cFillBef bgBef-CC hideSelIn1" style="--elzMsk: url('https://lelouch.ru/uploads/icons/arrow1.svg');"></div>
            </div>
            <div class="elz d-block showSelIn lh15 uStrip stripEven stripHover stripLD strip005 showSelIn1">



              <div class="elz d-flex f-wrap a-H uStripIn pR16">
                <label class="elz d-flex a-H gap16 growMax fb280 pL16 pV8 cur-pointer">
                  <input type="checkbox" checked="" class="elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s18 p3 r2
                                                                     cLInvD bg bg-primary bgL10
                                                                     br br-primary brL-10 brHovL-20
                                                                     fn fn-primary-t fnHovL-5
                                                                     bshAct-inset1">
                  <span class="elz d-block grow">	Разделка муфты или кросса	</span>
                </label>
                <form class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb280">
                  <div class="elz d-block al-right grow bold growMax">	за 1 заведенный кабель	</div>
                  <label class="elz d-grid grow w64 noShrink grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0">
                    <input type="text" value="" placeholder="" class="elz elzInput d-block grPin grY2 w100p bor1 r3 h24 pL20 fn12 ellipsis trns2 invPssSib
                                                                                        bg bg-primary bgL10 bgLInvD
                                                                                        br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                        fn fn-primary-t">
                    <span class="elz d-flex grPin grY2 a-H pH8 z6 evNone">
                                                <span class="elz p-rel a-H d-flex trns2">×</span>
                                        </span>
                  </label>
                  <input type="submit" class="elz hide"/>
                </form>
              </div>
              <div class="elz d-flex f-wrap a-H uStripIn pR16">
                <label class="elz d-flex a-H gap16 growMax fb280 pL16 pV8 cur-pointer">
                  <input type="checkbox" checked="" class="elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s18 p3 r2
                                                                     cLInvD bg bg-primary bgL10
                                                                     br br-primary brL-10 brHovL-20
                                                                     fn fn-primary-t fnHovL-5
                                                                     bshAct-inset1">
                  <span class="elz d-block grow">	Разварка волокон	</span>
                </label>
                <form class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb280">
                  <div class="elz d-block al-right grow bold growMax">	за 1 волокно	</div>
                  <label class="elz d-grid grow w64 noShrink grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0">
                    <input type="text" value="" placeholder="" class="elz elzInput d-block grPin grY2 w100p bor1 r3 h24 pL20 fn12 ellipsis trns2 invPssSib
                                                                                        bg bg-primary bgL10 bgLInvD
                                                                                        br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                        fn fn-primary-t">
                    <span class="elz d-flex grPin grY2 a-H pH8 z6 evNone">
                                                <span class="elz p-rel a-H d-flex trns2">×</span>
                                        </span>
                  </label>
                  <input type="submit" class="elz hide"/>
                </form>
              </div>
              <div class="elz d-flex f-wrap a-H uStripIn pR16">
                <label class="elz d-flex a-H gap16 growMax fb280 pL16 pV8 cur-pointer">
                  <input type="checkbox" checked="" class="elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s18 p3 r2
                                                                     cLInvD bg bg-primary bgL10
                                                                     br br-primary brL-10 brHovL-20
                                                                     fn fn-primary-t fnHovL-5
                                                                     bshAct-inset1">
                  <span class="elz d-block grow">	Расшивка патчпанели, каждый 1 порта	</span>
                </label>
                <form class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb280">
                  <div class="elz d-block al-right grow bold growMax">	за 1 порт	</div>
                  <label class="elz d-grid grow w64 noShrink grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0">
                    <input type="text" value="" placeholder="" class="elz elzInput d-block grPin grY2 w100p bor1 r3 h24 pL20 fn12 ellipsis trns2 invPssSib
                                                                                        bg bg-primary bgL10 bgLInvD
                                                                                        br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                        fn fn-primary-t">
                    <span class="elz d-flex grPin grY2 a-H pH8 z6 evNone">
                                                <span class="elz p-rel a-H d-flex trns2">×</span>
                                        </span>
                  </label>
                  <input type="submit" class="elz hide"/>
                </form>
              </div>




            </div>
          </div>
          <div class="elz d-block showSelOut1 hideSelOut1 sel">
            <div class="elz d-flex a-H borV1 pH16 gap16 pV10 lh12 opAct07 cur-pointer bg bg-primary br br-primary brL-10 brHovL-15 brLInvD">
              <div class="elz d-block growX bold">Типовые работы по заявкам</div>
              <div class="elz d-block p4 al-center wmn24 r3 fn11 bold bg bg-primary bgL-10">16</div>
              <div class="elz p-rel d-block noShrink p-rel mskBef s8 cFillBef bgBef-CC showSelIn1" style="--elzMsk: url('https://lelouch.ru/uploads/icons/arrow1.svg');"></div>
              <div class="elz p-rel d-block noShrink p-rel mskBef s8 deg180 cFillBef bgBef-CC hideSelIn1" style="--elzMsk: url('https://lelouch.ru/uploads/icons/arrow1.svg');"></div>
            </div>
            <div class="elz d-block showSelIn lh15 uStrip stripEven stripHover stripLD strip005 showSelIn1">


              <div class="elz d-flex f-wrap a-H uStripIn pR16">
                <label class="elz d-flex a-H gap16 growMax fb280 pL16 pV8 cur-pointer">
                  <input type="checkbox" checked="" class="elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s18 p3 r2
                                                                     cLInvD bg bg-primary bgL10
                                                                     br br-primary brL-10 brHovL-20
                                                                     fn fn-primary-t fnHovL-5
                                                                     bshAct-inset1">
                  <span class="elz d-block grow">Монтаж LTE комплекта под ключ</span>
                </label>
                <form class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb280">
                  <div class="elz d-block al-right grow bold growMax">за 1 комплект</div>
                  <label class="elz d-grid grow w64 noShrink grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0">
                    <input type="text" value="" placeholder="" class="elz elzInput d-block grPin grY2 w100p bor1 r3 h24 pL20 fn12 ellipsis trns2 invPssSib
                                                                                        bg bg-primary bgL10 bgLInvD
                                                                                        br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                        fn fn-primary-t">
                    <span class="elz d-flex grPin grY2 a-H pH8 z6 evNone">
                                                <span class="elz p-rel a-H d-flex trns2">×</span>
                                        </span>
                  </label>
                  <input type="submit" class="elz hide"/>
                </form>
              </div>
              <div class="elz d-flex f-wrap a-H uStripIn pR16">
                <label class="elz d-flex a-H gap16 growMax fb280 pL16 pV8 cur-pointer">
                  <input type="checkbox" checked="" class="elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s18 p3 r2
                                                                     cLInvD bg bg-primary bgL10
                                                                     br br-primary brL-10 brHovL-20
                                                                     fn fn-primary-t fnHovL-5
                                                                     bshAct-inset1">
                  <span class="elz d-block grow">Демонтаж LTE комплекта под ключ</span>
                </label>
                <form class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb280">
                  <div class="elz d-block al-right grow bold growMax">за 1 комплект</div>
                  <label class="elz d-grid grow w64 noShrink grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0">
                    <input type="text" value="" placeholder="" class="elz elzInput d-block grPin grY2 w100p bor1 r3 h24 pL20 fn12 ellipsis trns2 invPssSib
                                                                                        bg bg-primary bgL10 bgLInvD
                                                                                        br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                        fn fn-primary-t">
                    <span class="elz d-flex grPin grY2 a-H pH8 z6 evNone">
                                                <span class="elz p-rel a-H d-flex trns2">×</span>
                                        </span>
                  </label>
                  <input type="submit" class="elz hide"/>
                </form>
              </div>
              <div class="elz d-flex f-wrap a-H uStripIn pR16">
                <label class="elz d-flex a-H gap16 growMax fb280 pL16 pV8 cur-pointer">
                  <input type="checkbox" checked="" class="elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s18 p3 r2
                                                                     cLInvD bg bg-primary bgL10
                                                                     br br-primary brL-10 brHovL-20
                                                                     fn fn-primary-t fnHovL-5
                                                                     bshAct-inset1">
                  <span class="elz d-block grow">Монтаж радиомоста</span>
                </label>
                <form class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb280">
                  <div class="elz d-block al-right grow bold growMax">за 1 точку</div>
                  <label class="elz d-grid grow w64 noShrink grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0">
                    <input type="text" value="" placeholder="" class="elz elzInput d-block grPin grY2 w100p bor1 r3 h24 pL20 fn12 ellipsis trns2 invPssSib
                                                                                        bg bg-primary bgL10 bgLInvD
                                                                                        br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                        fn fn-primary-t">
                    <span class="elz d-flex grPin grY2 a-H pH8 z6 evNone">
                                                <span class="elz p-rel a-H d-flex trns2">×</span>
                                        </span>
                  </label>
                  <input type="submit" class="elz hide"/>
                </form>
              </div>
              <div class="elz d-flex f-wrap a-H uStripIn pR16">
                <label class="elz d-flex a-H gap16 growMax fb280 pL16 pV8 cur-pointer">
                  <input type="checkbox" checked="" class="elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s18 p3 r2
                                                                     cLInvD bg bg-primary bgL10
                                                                     br br-primary brL-10 brHovL-20
                                                                     fn fn-primary-t fnHovL-5
                                                                     bshAct-inset1">
                  <span class="elz d-block grow">Демонтаж радиомоста</span>
                </label>
                <form class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb280">
                  <div class="elz d-block al-right grow bold growMax">за 1 точку</div>
                  <label class="elz d-grid grow w64 noShrink grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0">
                    <input type="text" value="" placeholder="" class="elz elzInput d-block grPin grY2 w100p bor1 r3 h24 pL20 fn12 ellipsis trns2 invPssSib
                                                                                        bg bg-primary bgL10 bgLInvD
                                                                                        br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                        fn fn-primary-t">
                    <span class="elz d-flex grPin grY2 a-H pH8 z6 evNone">
                                                <span class="elz p-rel a-H d-flex trns2">×</span>
                                        </span>
                  </label>
                  <input type="submit" class="elz hide"/>
                </form>
              </div>
              <div class="elz d-flex f-wrap a-H uStripIn pR16">
                <label class="elz d-flex a-H gap16 growMax fb280 pL16 pV8 cur-pointer">
                  <input type="checkbox" checked="" class="elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s18 p3 r2
                                                                     cLInvD bg bg-primary bgL10
                                                                     br br-primary brL-10 brHovL-20
                                                                     fn fn-primary-t fnHovL-5
                                                                     bshAct-inset1">
                  <span class="elz d-block grow">Монтаж/демонтаж камеры СВН</span>
                </label>
                <form class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb280">
                  <div class="elz d-block al-right grow bold growMax">за 1 камеру</div>
                  <label class="elz d-grid grow w64 noShrink grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0">
                    <input type="text" value="" placeholder="" class="elz elzInput d-block grPin grY2 w100p bor1 r3 h24 pL20 fn12 ellipsis trns2 invPssSib
                                                                                        bg bg-primary bgL10 bgLInvD
                                                                                        br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                        fn fn-primary-t">
                    <span class="elz d-flex grPin grY2 a-H pH8 z6 evNone">
                                                <span class="elz p-rel a-H d-flex trns2">×</span>
                                        </span>
                  </label>
                  <input type="submit" class="elz hide"/>
                </form>
              </div>
              <div class="elz d-flex f-wrap a-H uStripIn pR16">
                <label class="elz d-flex a-H gap16 growMax fb280 pL16 pV8 cur-pointer">
                  <input type="checkbox" checked="" class="elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s18 p3 r2
                                                                     cLInvD bg bg-primary bgL10
                                                                     br br-primary brL-10 brHovL-20
                                                                     fn fn-primary-t fnHovL-5
                                                                     bshAct-inset1">
                  <span class="elz d-block grow">Юстировка камеры</span>
                </label>
                <form class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb280">
                  <div class="elz d-block al-right grow bold growMax">за 1 камеру</div>
                  <label class="elz d-grid grow w64 noShrink grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0">
                    <input type="text" value="" placeholder="" class="elz elzInput d-block grPin grY2 w100p bor1 r3 h24 pL20 fn12 ellipsis trns2 invPssSib
                                                                                        bg bg-primary bgL10 bgLInvD
                                                                                        br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                        fn fn-primary-t">
                    <span class="elz d-flex grPin grY2 a-H pH8 z6 evNone">
                                                <span class="elz p-rel a-H d-flex trns2">×</span>
                                        </span>
                  </label>
                  <input type="submit" class="elz hide"/>
                </form>
              </div>
              <div class="elz d-flex f-wrap a-H uStripIn pR16">
                <label class="elz d-flex a-H gap16 growMax fb280 pL16 pV8 cur-pointer">
                  <input type="checkbox" checked="" class="elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s18 p3 r2
                                                                     cLInvD bg bg-primary bgL10
                                                                     br br-primary brL-10 brHovL-20
                                                                     fn fn-primary-t fnHovL-5
                                                                     bshAct-inset1">
                  <span class="elz d-block grow">Настройка камеры</span>
                </label>
                <form class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb280">
                  <div class="elz d-block al-right grow bold growMax">за 1 камеру</div>
                  <label class="elz d-grid grow w64 noShrink grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0">
                    <input type="text" value="" placeholder="" class="elz elzInput d-block grPin grY2 w100p bor1 r3 h24 pL20 fn12 ellipsis trns2 invPssSib
                                                                                        bg bg-primary bgL10 bgLInvD
                                                                                        br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                        fn fn-primary-t">
                    <span class="elz d-flex grPin grY2 a-H pH8 z6 evNone">
                                                <span class="elz p-rel a-H d-flex trns2">×</span>
                                        </span>
                  </label>
                  <input type="submit" class="elz hide"/>
                </form>
              </div>
              <div class="elz d-flex f-wrap a-H uStripIn pR16">
                <label class="elz d-flex a-H gap16 growMax fb280 pL16 pV8 cur-pointer">
                  <input type="checkbox" checked="" class="elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s18 p3 r2
                                                                     cLInvD bg bg-primary bgL10
                                                                     br br-primary brL-10 brHovL-20
                                                                     fn fn-primary-t fnHovL-5
                                                                     bshAct-inset1">
                  <span class="elz d-block grow">Устранение проблем в картинке камеры (кронировать деревья, убрать провода)</span>
                </label>
                <form class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb280">
                  <div class="elz d-block al-right grow bold growMax">за 1 камеру</div>
                  <label class="elz d-grid grow w64 noShrink grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0">
                    <input type="text" value="" placeholder="" class="elz elzInput d-block grPin grY2 w100p bor1 r3 h24 pL20 fn12 ellipsis trns2 invPssSib
                                                                                        bg bg-primary bgL10 bgLInvD
                                                                                        br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                        fn fn-primary-t">
                    <span class="elz d-flex grPin grY2 a-H pH8 z6 evNone">
                                                <span class="elz p-rel a-H d-flex trns2">×</span>
                                        </span>
                  </label>
                  <input type="submit" class="elz hide"/>
                </form>
              </div>
              <div class="elz d-flex f-wrap a-H uStripIn pR16">
                <label class="elz d-flex a-H gap16 growMax fb280 pL16 pV8 cur-pointer">
                  <input type="checkbox" checked="" class="elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s18 p3 r2
                                                                     cLInvD bg bg-primary bgL10
                                                                     br br-primary brL-10 brHovL-20
                                                                     fn fn-primary-t fnHovL-5
                                                                     bshAct-inset1">
                  <span class="elz d-block grow">Обслуживание камеры СВН</span>
                </label>
                <form class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb280">
                  <div class="elz d-block al-right grow bold growMax">за 1 камеру</div>
                  <label class="elz d-grid grow w64 noShrink grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0">
                    <input type="text" value="" placeholder="" class="elz elzInput d-block grPin grY2 w100p bor1 r3 h24 pL20 fn12 ellipsis trns2 invPssSib
                                                                                        bg bg-primary bgL10 bgLInvD
                                                                                        br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                        fn fn-primary-t">
                    <span class="elz d-flex grPin grY2 a-H pH8 z6 evNone">
                                                <span class="elz p-rel a-H d-flex trns2">×</span>
                                        </span>
                  </label>
                  <input type="submit" class="elz hide"/>
                </form>
              </div>
              <div class="elz d-flex f-wrap a-H uStripIn pR16">
                <label class="elz d-flex a-H gap16 growMax fb280 pL16 pV8 cur-pointer">
                  <input type="checkbox" checked="" class="elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s18 p3 r2
                                                                     cLInvD bg bg-primary bgL10
                                                                     br br-primary brL-10 brHovL-20
                                                                     fn fn-primary-t fnHovL-5
                                                                     bshAct-inset1">
                  <span class="elz d-block grow">Фотографирование обьекта (кабель на доме, камера место размещения, эталонное фото)</span>
                </label>
                <form class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb280">
                  <div class="elz d-block al-right grow bold growMax">за 1 обьект</div>
                  <label class="elz d-grid grow w64 noShrink grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0">
                    <input type="text" value="" placeholder="" class="elz elzInput d-block grPin grY2 w100p bor1 r3 h24 pL20 fn12 ellipsis trns2 invPssSib
                                                                                        bg bg-primary bgL10 bgLInvD
                                                                                        br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                        fn fn-primary-t">
                    <span class="elz d-flex grPin grY2 a-H pH8 z6 evNone">
                                                <span class="elz p-rel a-H d-flex trns2">×</span>
                                        </span>
                  </label>
                  <input type="submit" class="elz hide"/>
                </form>
              </div>
              <div class="elz d-flex f-wrap a-H uStripIn pR16">
                <label class="elz d-flex a-H gap16 growMax fb280 pL16 pV8 cur-pointer">
                  <input type="checkbox" checked="" class="elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s18 p3 r2
                                                                     cLInvD bg bg-primary bgL10
                                                                     br br-primary brL-10 brHovL-20
                                                                     fn fn-primary-t fnHovL-5
                                                                     bshAct-inset1">
                  <span class="elz d-block grow">Установка ТКШ</span>
                </label>
                <form class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb280">
                  <div class="elz d-block al-right grow bold growMax">за 1 ТКШ</div>
                  <label class="elz d-grid grow w64 noShrink grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0">
                    <input type="text" value="" placeholder="" class="elz elzInput d-block grPin grY2 w100p bor1 r3 h24 pL20 fn12 ellipsis trns2 invPssSib
                                                                                        bg bg-primary bgL10 bgLInvD
                                                                                        br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                        fn fn-primary-t">
                    <span class="elz d-flex grPin grY2 a-H pH8 z6 evNone">
                                                <span class="elz p-rel a-H d-flex trns2">×</span>
                                        </span>
                  </label>
                  <input type="submit" class="elz hide"/>
                </form>
              </div>
              <div class="elz d-flex f-wrap a-H uStripIn pR16">
                <label class="elz d-flex a-H gap16 growMax fb280 pL16 pV8 cur-pointer">
                  <input type="checkbox" checked="" class="elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s18 p3 r2
                                                                     cLInvD bg bg-primary bgL10
                                                                     br br-primary brL-10 brHovL-20
                                                                     fn fn-primary-t fnHovL-5
                                                                     bshAct-inset1">
                  <span class="elz d-block grow">Монтаж и подключение ЭП в ТКШ</span>
                </label>
                <form class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb280">
                  <div class="elz d-block al-right grow bold growMax">за 1 ТКШ</div>
                  <label class="elz d-grid grow w64 noShrink grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0">
                    <input type="text" value="" placeholder="" class="elz elzInput d-block grPin grY2 w100p bor1 r3 h24 pL20 fn12 ellipsis trns2 invPssSib
                                                                                        bg bg-primary bgL10 bgLInvD
                                                                                        br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                        fn fn-primary-t">
                    <span class="elz d-flex grPin grY2 a-H pH8 z6 evNone">
                                                <span class="elz p-rel a-H d-flex trns2">×</span>
                                        </span>
                  </label>
                  <input type="submit" class="elz hide"/>
                </form>
              </div>




            </div>
          </div>
          <div class="elz d-block showSelOut1 hideSelOut1 sel">
            <div class="elz d-flex a-H borV1 pH16 gap16 pV10 lh12 opAct07 cur-pointer bg bg-primary br br-primary brL-10 brHovL-15 brLInvD">
              <div class="elz d-block growX bold">Типовые работы по заявкам</div>
              <div class="elz d-block p4 al-center wmn24 r3 fn11 bold bg bg-primary bgL-10">16</div>
              <div class="elz p-rel d-block noShrink p-rel mskBef s8 cFillBef bgBef-CC showSelIn1" style="--elzMsk: url('https://lelouch.ru/uploads/icons/arrow1.svg');"></div>
              <div class="elz p-rel d-block noShrink p-rel mskBef s8 deg180 cFillBef bgBef-CC hideSelIn1" style="--elzMsk: url('https://lelouch.ru/uploads/icons/arrow1.svg');"></div>
            </div>
            <div class="elz d-block showSelIn lh15 uStrip stripEven stripHover stripLD strip005 showSelIn1">



              <div class="elz d-flex f-wrap a-H uStripIn pR16">
                <label class="elz d-flex a-H gap16 growMax fb280 pL16 pV8 cur-pointer">
                  <input type="checkbox" checked="" class="elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s18 p3 r2
                                                                     cLInvD bg bg-primary bgL10
                                                                     br br-primary brL-10 brHovL-20
                                                                     fn fn-primary-t fnHovL-5
                                                                     bshAct-inset1">
                  <span class="elz d-block grow">	Доставка оборудования (как отдельный элемент работ, не входит при работе по основным задачам)	</span>
                </label>
                <form class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb280">
                  <div class="elz d-block al-right grow bold growMax">	за 1 заявку	</div>
                  <label class="elz d-grid grow w64 noShrink grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0">
                    <input type="text" value="" placeholder="" class="elz elzInput d-block grPin grY2 w100p bor1 r3 h24 pL20 fn12 ellipsis trns2 invPssSib
                                                                                        bg bg-primary bgL10 bgLInvD
                                                                                        br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                        fn fn-primary-t">
                    <span class="elz d-flex grPin grY2 a-H pH8 z6 evNone">
                                                <span class="elz p-rel a-H d-flex trns2">×</span>
                                        </span>
                  </label>
                  <input type="submit" class="elz hide"/>
                </form>
              </div>
              <div class="elz d-flex f-wrap a-H uStripIn pR16">
                <label class="elz d-flex a-H gap16 growMax fb280 pL16 pV8 cur-pointer">
                  <input type="checkbox" checked="" class="elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s18 p3 r2
                                                                     cLInvD bg bg-primary bgL10
                                                                     br br-primary brL-10 brHovL-20
                                                                     fn fn-primary-t fnHovL-5
                                                                     bshAct-inset1">
                  <span class="elz d-block grow">	Дежурство в выходной день без выезда на инцидент	</span>
                </label>
                <form class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb280">
                  <div class="elz d-block al-right grow bold growMax">	за 1 день	</div>
                  <label class="elz d-grid grow w64 noShrink grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0">
                    <input type="text" value="" placeholder="" class="elz elzInput d-block grPin grY2 w100p bor1 r3 h24 pL20 fn12 ellipsis trns2 invPssSib
                                                                                        bg bg-primary bgL10 bgLInvD
                                                                                        br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                        fn fn-primary-t">
                    <span class="elz d-flex grPin grY2 a-H pH8 z6 evNone">
                                                <span class="elz p-rel a-H d-flex trns2">×</span>
                                        </span>
                  </label>
                  <input type="submit" class="elz hide"/>
                </form>
              </div>
              <div class="elz d-flex f-wrap a-H uStripIn pR16">
                <label class="elz d-flex a-H gap16 growMax fb280 pL16 pV8 cur-pointer">
                  <input type="checkbox" checked="" class="elz elzCheck checkbox p-rel d-flex noShrink cur-pointer bor1 s18 p3 r2
                                                                     cLInvD bg bg-primary bgL10
                                                                     br br-primary brL-10 brHovL-20
                                                                     fn fn-primary-t fnHovL-5
                                                                     bshAct-inset1">
                  <span class="elz d-block grow">	Решение инцидента (базовая оценка без кабельных работ)	</span>
                </label>
                <form class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb280">
                  <div class="elz d-block al-right grow bold growMax">	за 1 инцидент	</div>
                  <label class="elz d-grid grow w64 noShrink grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0">
                    <input type="text" value="" placeholder="" class="elz elzInput d-block grPin grY2 w100p bor1 r3 h24 pL20 fn12 ellipsis trns2 invPssSib
                                                                                        bg bg-primary bgL10 bgLInvD
                                                                                        br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0
                                                                                        fn fn-primary-t">
                    <span class="elz d-flex grPin grY2 a-H pH8 z6 evNone">
                                                <span class="elz p-rel a-H d-flex trns2">×</span>
                                        </span>
                  </label>
                  <input type="submit" class="elz hide"/>
                </form>
              </div>




            </div>
          </div>
        </div>

      </div>
    </div>
</template>

<script>
import BaseButton    from "@/components/elements/BaseButton";
import DeleteElement from "@/components/elements/DeleteElement";

import {dateFormatDdMmYyyy, dateTimeFormatHHMM} from "@/helpers/formating";

export default {
  name: "OrderWorksItem",

  components: {
    BaseButton,
    DeleteElement
  },

  props: {
    work: { required: true,  type: Object }
  },

  data() {
    return {
      isClosed: true,
      //deleteItem: false,
      workStatus: 0
    }
  },

  mounted() {
    /*console.log(this.work);*/
  },


  methods: {
/*
    deleteWorkItem() {
      if (this.deleteItem) {
        console.log('confirm delete item!');
      } else if (this.$refs.delete.classList.contains('cross')) {
        console.log('delete item?');
        this.$refs.delete.classList.remove('cross');
        this.$refs.delete.classList.add('trash');
        this.deleteItem = true;
        this.$refs.delete.style = "--elzMsk: url('/style/icons/trash.svg');";
        //const clickOut = this.deleteWorkItemClickOut;
        //addEventListener("click", clickOut);


      }
    },

    deleteWorkItemClickOut() {
      document.body.addEventListener("click", this.deleteWorkItemClickOut,{once: true});
      console.log('click out');
      console.log(this.$refs.delete.classList.contains('trash'));

      removeEventListener("click", this.deleteWorkItemClickOut);
      this.$refs.delete.style = "--elzMsk: url('/style/icons/cross1.svg');";
      this.deleteItem = false;
      this.$refs.delete.classList.add('cross');
    },*/

    setDateTime(date) {
      return (date) ? `${dateFormatDdMmYyyy(date)} в ${dateTimeFormatHHMM(date)}` : 'Время не задано';
    },

    workStart() {
      console.log('start work');
      this.workStatus = 1;
    },

    workFinish() {
      console.log('finish work');
      this.workStatus = 2;
    },

    workDelete() {
      console.log('delete work');
    }
  }
}
</script>

<style scoped>

</style>
