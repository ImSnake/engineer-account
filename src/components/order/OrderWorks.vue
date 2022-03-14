<template>

  <div class="elz d-block p16 wmx1200 mAuto">

    <div class="elz d-flex a-X mB32">
      <input class="elz d-block al-center r3 h48 pH32 w240 cur-pointer opAct07 bg bg-ok fn fn-ok-t" type="submit" value="Создать работу"/>
    </div>

    <div class="elz d-flex dir-y gap16">


      <div class="elz d-block bor1 r3 bg bg-primary bgL5 br br-primary brL-10 brLInvD hideSelOut showSelOut sel">
        <div class="elz d-flex gap8 a-H p16 opAct07 cur-pointer">
          <div class="elz d-flex f-wrap a-H grow gap8">
            <div class="elz d-block grow fb320 lh12">
              <div class="elz d-block">Работа #666</div>
              <div class="elz d-flex f-wrap gapH16 gapV4 fn11 mT4 nowrap">
                <div class="elz d-block">Начато: <b class="elz bold">10.03.22 в 16:10</b></div>
                <div class="elz d-block">Завершено: <b class="elz bold">10.03.22 в 22:32</b></div>
              </div>
            </div>
            <div class="elz d-flex f-wrap fn12 gapH16 gapV8">
              <div class="elz d-flex a-H gap8 wmn64 cur-help" title="Участников: 16">
                <div class="elz p-rel d-block p-rel mskBef s16 cFillBef bgBef-CC msk-contain" style="--elzMsk: url('https://lelouch.ru/uploads/icons/user.svg');"></div>
                <div class="elz d-block bold">16</div>
              </div>
              <div class="elz d-flex a-H gap8 wmn64 cur-help" title="Работ выполняется: 24">
                <div class="elz p-rel d-block p-rel mskBef w20 h16 cFillBef bgBef-CC msk-contain" style="--elzMsk: url('https://lelouch.ru/uploads/icons/hammer-wrench.svg');"></div>
                <div class="elz d-block bold">24</div>
              </div>
              <div class="elz d-flex a-H gap8 wmn64 cur-help" title="Баллов начислено: 8000">
                <div class="elz p-rel d-block p-rel mskBef s16 cFillBef bgBef-CC msk-contain" style="--elzMsk: url('https://lelouch.ru/uploads/icons/star3.svg');"></div>
                <div class="elz d-block bold">8000</div>
              </div>
            </div>
          </div>
          <div class="elz p-rel d-block noShrink p-rel mskBef s8 deg180 cFillBef bgBef-CC hideSelIn" style="--elzMsk: url('https://lelouch.ru/uploads/icons/arrow1.svg');"></div>
          <div class="elz p-rel d-block noShrink p-rel mskBef s8 cFillBef bgBef-CC showSelIn" style="--elzMsk: url('https://lelouch.ru/uploads/icons/arrow1.svg');"></div>
        </div>
        <div class="elz d-block borT1 br br-primary brL-10 brLInvD fn12 showSelIn">

          <div class="elz p-sticky p-TEP pH16 pV8 mV8 z10 bg bg-primary bgL5">
            <div class="elz p-rel d-flex pH36 f-wrap a-X gap8">
              <div class="elz d-flex gap8 a-X al-center r3 hmn36 pH24 cur-pointer opAct07 bg bg-ok bgHovL10 fn fn-ok-t">
                <div class="elz d-block">Начать работу</div>
              </div>
              <div class="elz p-abs p-R d-flex gap8 a-X al-center r3 s36 cur-pointer opAct07 bg bg-error bgHovL10 fn fn-error-t">
                <div class="elz p-rel d-block p-rel mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('https://lelouch.ru/uploads/icons/cross1.svg');"></div>
              </div>
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




    </div>

  </div>

</template>

<script>
export default {
  name: "OrderWorks"
}
</script>

<style scoped>

</style>
