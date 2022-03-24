<template>

  <template v-if="isActive">

    <div @click="toggleTableView" class="elz d-block r3 bor1 fn12 mB32 oAuto opAct07 cur-pointer br br-ok bg bg-ok bgA10 showSelOut hideSelOut">
      <div class="elz d-flex gap8 a-H p16 fn16">
        <div class="elz d-block grow bold">Услуги по сделке: #{{ $store.state.orderPage.order.details.DealID }}</div>
        <div class="elz p-rel d-block noShrink p-rel mskBef s8 deg180 cFillBef bgBef-CC hideSelIn" style="--elzMsk: url('/style/icons/arrow1.svg');"></div>
        <div class="elz p-rel d-block noShrink p-rel mskBef s8 cFillBef bgBef-CC showSelIn" style="--elzMsk: url('/style/icons/arrow1.svg');"></div>
      </div>
      <table class="elz elzTable w100p showSelIn">
        <thead class="tbody bor borB1 br br-ok">
        <tr class="tr bold pad pV10 pH16 nowrap">
          <td class="td">Бизнес-услуга</td>
          <td class="td">Наименование в счете</td>
          <td class="td">Вид начисления</td>
          <td class="td">Сумма по сделке</td>
        </tr>
        </thead>
        <tbody class="tbody pad pV10 pH16 fn16 uStrip stripEven strip005 stripHover stripLD">
        <tr v-for="(service,index) in $store.state.orderPage.order.services" :key="index" class="tr">
          <td class="td">{{service.businessName}}</td>
          <td class="td">{{ service.billName }}</td>
          <td class="td">{{ service.incomingType }}</td>
          <td class="td nowrap">{{ service.sum }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div v-if="!customerInHydra" class="elz d-flex a-X mB32">
      <BaseButton @onButtonClick="customerInHydra = true"
          :classList="'hmn48 bg-ok bgHovL10 fn-ok-t'"
          :title="'Создать клиента в Гидре'"    />
    </div>

    <div v-if="customerInHydra" class="elz d-flex dir-y gap16">

      <div class="serviceBox elz d-block bor1 r3 bg bg-primary bgL5 br br-primary brL-10 brLInvD hideSelOut showSelOut">
        <div @click="testService" class="elz d-flex gap8 a-H p16 opAct07 cur-pointer">
          <div class="elz d-flex f-wrap a-H grow gap8">
            <div class="elz d-block grow fb320 lh12">
              <div class="elz d-block bold">Телевидение</div>
            </div>
          </div>
          <div @click="createService" class="elz d-block p8 r3 fn11 bold bg cur-pointer opAct07 bg-success fn fn-success-t">Создать договор</div>
          <div class="elz p-rel d-block noShrink p-rel mskBef s8 deg180 cFillBef bgBef-CC hideSelIn hide" style="--elzMsk: url('/style/icons/arrow1.svg');"></div>
          <div class="elz p-rel d-block noShrink p-rel mskBef s8 cFillBef bgBef-CC showSelIn hide" style="--elzMsk: url('/style/icons/arrow1.svg');"></div>
        </div>
        <div class="elz d-block borT1 br br-primary brL-10 brLInvD fn12 showSelIn">


          <div class="elz d-flex a-H f-wrap fn16 pAT16 gap8">
            <div class="elz d-block fb320">Тарифный план:</div>
            <div class="elz d-flex f-wrap gap8 fb480 grow">
              <div class="elz d-block fb320 growMax">
                <div class="elz d-grid w100p grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0 cHovOut">

                  <div class="elz elzInput d-flex grPin a-H grY2 w100p bor1 r3 h40 pL16 pR24 ellipsis trns2 invPssSib
                                          bg bg-primary bgL10 bgLInvD
                                          br brLInvD br-primary brL-10 brHovInL-20 brFoc-focus brFocL0
                                          fn fn-primary-t">
                    <div class="elz growX pV8 oH nowrap ellipsis">Интернет 100мбит/с</div>
                  </div>

                  <span class="elz d-flex grPin grY2 a-H bor1 pH7 z6 evNone">

                                  <span class="elz p-rel growX d-flex a-PR">
                                      <span class="elz p-rel d-flex a-X s24 r2 trns2">
                                          <span class="elz p-rel d-block mskBef s8 cFillBef bgBef-CC deg180" style="--elzMsk: url('https://lelouch.ru/uploads/icons/arrow2.svg');"></span>
                                      </span>
                                  </span>

                              </span>

                  <select class="elz d-block grPin grY2 p-EA s100p op0 pH16 z7 cur-pointer fn12 bg bg-primary bgL10 bgLInvD fn fn-primary-t">
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                    <option>Option 4</option>
                    <option>Option 5</option>
                  </select>

                </div>
              </div>
              <div class="elz d-block fb120 grow wmn160">
                <div class="elz d-flex a-X bor1 r3 h40 pH16 bold al-center bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10">700 руб.</div>
              </div>
            </div>
          </div>


          <div class="elz d-block mT16 r3 oH">
            <div class="elz d-block showSelOut1 hideSelOut1 sel">
              <div class="elz d-flex a-H borV1 pH16 gap16 pV10 lh12 opAct07 cur-pointer bg bg-primary br br-primary brL-10 brHovL-15 brLInvD">
                <div class="elz d-block growX bold">Опции</div>
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
                  <div class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb160">
                    <div class="elz d-flex grow a-X bor1 r3 h24 pH16 bold al-center bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10">700 руб.</div>
                  </div>
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
                  <div class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb160">
                    <div class="elz d-flex grow a-X bor1 r3 h24 pH16 bold al-center bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10">700 руб.</div>
                  </div>
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
                  <div class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb160">
                    <div class="elz d-flex grow a-X bor1 r3 h24 pH16 bold al-center bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10">700 руб.</div>
                  </div>
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
                  <div class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb160">
                    <div class="elz d-flex grow a-X bor1 r3 h24 pH16 bold al-center bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10">700 руб.</div>
                  </div>
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
                  <div class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb160">
                    <div class="elz d-flex grow a-X bor1 r3 h24 pH16 bold al-center bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10">700 руб.</div>
                  </div>
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
                  <div class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb160">
                    <div class="elz d-flex grow a-X bor1 r3 h24 pH16 bold al-center bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10">700 руб.</div>
                  </div>
                </div>





              </div>
            </div>
            <div class="elz d-block showSelOut1 hideSelOut1 sel">
              <div class="elz d-flex a-H borV1 pH16 gap16 pV10 lh12 opAct07 cur-pointer bg bg-primary br br-primary brL-10 brHovL-15 brLInvD">
                <div class="elz d-block growX bold">Дополнительно</div>
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
          </div>

          <div class="elz p-rel d-flex f-wrap a-X gap8 pV8 borT1 br br-primary brL-10 brLInvD">
            <div class="elz d-flex gap8 a-X al-center r3 hmn36 pH24 cur-pointer opAct07 bg bg-ok bgHovL10 fn fn-ok-t">
              <div class="elz d-block">Сохранить</div>
            </div>
          </div>


        </div>
      </div>


      <div class="serviceBox elz d-block bor1 r3 bg bg-primary bgL5 br br-primary brL-10 brLInvD hideSelOut showSelOut">
        <div @click="testService" class="elz d-flex gap8 a-H p16 opAct07 cur-pointer">
          <div class="elz d-flex f-wrap a-H grow gap8">
            <div class="elz d-block grow fb320 lh12">
              <div class="elz d-block bold">Интернет</div>
            </div>
          </div>
          <div @click="createService" class="elz d-block p8 r3 fn11 bold bg cur-pointer opAct07 bg-success fn fn-success-t">Создать договор</div>
          <div class="elz p-rel d-block noShrink p-rel mskBef s8 deg180 cFillBef bgBef-CC hideSelIn hide" style="--elzMsk: url('/style/icons/arrow1.svg');"></div>
          <div class="elz p-rel d-block noShrink p-rel mskBef s8 cFillBef bgBef-CC showSelIn hide" style="--elzMsk: url('/style/icons/arrow1.svg');"></div>
        </div>
        <div class="elz d-block borT1 br br-primary brL-10 brLInvD fn12 showSelIn">


          <div class="elz d-flex a-H f-wrap fn16 pAT16 gap8">
            <div class="elz d-block fb320">Тарифный план:</div>
            <div class="elz d-flex f-wrap gap8 fb480 grow">
              <div class="elz d-block fb320 growMax">
                <div class="elz d-grid w100p grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0 cHovOut">

                  <div class="elz elzInput d-flex grPin a-H grY2 w100p bor1 r3 h40 pL16 pR24 ellipsis trns2 invPssSib
                                          bg bg-primary bgL10 bgLInvD
                                          br brLInvD br-primary brL-10 brHovInL-20 brFoc-focus brFocL0
                                          fn fn-primary-t">
                    <div class="elz growX pV8 oH nowrap ellipsis">Интернет 100мбит/с</div>
                  </div>

                  <span class="elz d-flex grPin grY2 a-H bor1 pH7 z6 evNone">

                                  <span class="elz p-rel growX d-flex a-PR">
                                      <span class="elz p-rel d-flex a-X s24 r2 trns2">
                                          <span class="elz p-rel d-block mskBef s8 cFillBef bgBef-CC deg180" style="--elzMsk: url('https://lelouch.ru/uploads/icons/arrow2.svg');"></span>
                                      </span>
                                  </span>

                              </span>

                  <select class="elz d-block grPin grY2 p-EA s100p op0 pH16 z7 cur-pointer fn12 bg bg-primary bgL10 bgLInvD fn fn-primary-t">
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                    <option>Option 4</option>
                    <option>Option 5</option>
                  </select>

                </div>
              </div>
              <div class="elz d-block fb120 grow wmn160">
                <div class="elz d-flex a-X bor1 r3 h40 pH16 bold al-center bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10">700 руб.</div>
              </div>
            </div>
          </div>


          <div class="elz d-block mT16 r3 oH">
            <div class="elz d-block showSelOut1 hideSelOut1 sel">
              <div class="elz d-flex a-H borV1 pH16 gap16 pV10 lh12 opAct07 cur-pointer bg bg-primary br br-primary brL-10 brHovL-15 brLInvD">
                <div class="elz d-block growX bold">Опции</div>
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
                  <div class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb160">
                    <div class="elz d-flex grow a-X bor1 r3 h24 pH16 bold al-center bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10">700 руб.</div>
                  </div>
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
                  <div class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb160">
                    <div class="elz d-flex grow a-X bor1 r3 h24 pH16 bold al-center bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10">700 руб.</div>
                  </div>
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
                  <div class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb160">
                    <div class="elz d-flex grow a-X bor1 r3 h24 pH16 bold al-center bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10">700 руб.</div>
                  </div>
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
                  <div class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb160">
                    <div class="elz d-flex grow a-X bor1 r3 h24 pH16 bold al-center bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10">700 руб.</div>
                  </div>
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
                  <div class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb160">
                    <div class="elz d-flex grow a-X bor1 r3 h24 pH16 bold al-center bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10">700 руб.</div>
                  </div>
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
                  <div class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb160">
                    <div class="elz d-flex grow a-X bor1 r3 h24 pH16 bold al-center bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10">700 руб.</div>
                  </div>
                </div>





              </div>
            </div>
            <div class="elz d-block showSelOut1 hideSelOut1 sel">
              <div class="elz d-flex a-H borV1 pH16 gap16 pV10 lh12 opAct07 cur-pointer bg bg-primary br br-primary brL-10 brHovL-15 brLInvD">
                <div class="elz d-block growX bold">Дополнительно</div>
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
          </div>

          <div class="elz p-rel d-flex f-wrap a-X gap8 pV8 borT1 br br-primary brL-10 brLInvD">
            <div class="elz d-flex gap8 a-X al-center r3 hmn36 pH24 cur-pointer opAct07 bg bg-ok bgHovL10 fn fn-ok-t">
              <div class="elz d-block">Сохранить</div>
            </div>
          </div>


        </div>
      </div>

<!--      <div class="elz d-block bor1 r3 bg bg-primary bgL5 br br-primary brL-10 brLInvD hideSelOut showSelOut">
        <div class="elz d-flex gap8 a-H p16 opAct07 cur-pointer">
          <div class="elz d-flex f-wrap a-H grow gap8">
            <div class="elz d-block grow fb320 lh12">
              <div class="elz d-block bold">Интернет</div>
            </div>
          </div>
          <div class="elz p-rel d-block noShrink p-rel mskBef s8 deg180 cFillBef bgBef-CC hideSelIn" style="&#45;&#45;elzMsk: url('https://lelouch.ru/uploads/icons/arrow1.svg');"></div>
          <div class="elz p-rel d-block noShrink p-rel mskBef s8 cFillBef bgBef-CC showSelIn" style="&#45;&#45;elzMsk: url('https://lelouch.ru/uploads/icons/arrow1.svg');"></div>
        </div>
        <div class="elz d-block borT1 br br-primary brL-10 brLInvD fn12 showSelIn">


          <div class="elz d-flex a-H f-wrap fn16 pAT16 gap8">
            <div class="elz d-block fb320">Тарифный план:</div>
            <div class="elz d-flex f-wrap gap8 fb480 grow">
              <div class="elz d-block fb320 growMax">
                <div class="elz d-grid w100p grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0 cHovOut">

                  <div class="elz elzInput d-flex grPin a-H grY2 w100p bor1 r3 h40 pL16 pR24 ellipsis trns2 invPssSib
                                          bg bg-primary bgL10 bgLInvD
                                          br brLInvD br-primary brL-10 brHovInL-20 brFoc-focus brFocL0
                                          fn fn-primary-t">
                    <div class="elz growX pV8 oH nowrap ellipsis">Интернет 100мбит/с</div>
                  </div>

                  <span class="elz d-flex grPin grY2 a-H bor1 pH7 z6 evNone">

                                  <span class="elz p-rel growX d-flex a-PR">
                                      <span class="elz p-rel d-flex a-X s24 r2 trns2">
                                          <span class="elz p-rel d-block mskBef s8 cFillBef bgBef-CC deg180" style="&#45;&#45;elzMsk: url('https://lelouch.ru/uploads/icons/arrow2.svg');"></span>
                                      </span>
                                  </span>

                              </span>

                  <select class="elz d-block grPin grY2 p-EA s100p op0 pH16 z7 cur-pointer fn12 bg bg-primary bgL10 bgLInvD fn fn-primary-t">
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                    <option>Option 4</option>
                    <option>Option 5</option>
                  </select>

                </div>
              </div>
              <div class="elz d-block fb120 grow wmn160">
                <div class="elz d-flex a-X bor1 r3 h40 pH16 bold al-center bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10">700 руб.</div>
              </div>
            </div>
          </div>


          <div class="elz d-block mT16 r3 oH">
            <div class="elz d-block showSelOut1 hideSelOut1 sel">
              <div class="elz d-flex a-H borV1 pH16 gap16 pV10 lh12 opAct07 cur-pointer bg bg-primary br br-primary brL-10 brHovL-15 brLInvD">
                <div class="elz d-block growX bold">Опции</div>
                <div class="elz d-block p4 al-center wmn24 r3 fn11 bold bg bg-primary bgL-10">16</div>
                <div class="elz p-rel d-block noShrink p-rel mskBef s8 cFillBef bgBef-CC showSelIn1" style="&#45;&#45;elzMsk: url('https://lelouch.ru/uploads/icons/arrow1.svg');"></div>
                <div class="elz p-rel d-block noShrink p-rel mskBef s8 deg180 cFillBef bgBef-CC hideSelIn1" style="&#45;&#45;elzMsk: url('https://lelouch.ru/uploads/icons/arrow1.svg');"></div>
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
                  <div class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb160">
                    <div class="elz d-flex grow a-X bor1 r3 h24 pH16 bold al-center bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10">700 руб.</div>
                  </div>
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
                  <div class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb160">
                    <div class="elz d-flex grow a-X bor1 r3 h24 pH16 bold al-center bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10">700 руб.</div>
                  </div>
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
                  <div class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb160">
                    <div class="elz d-flex grow a-X bor1 r3 h24 pH16 bold al-center bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10">700 руб.</div>
                  </div>
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
                  <div class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb160">
                    <div class="elz d-flex grow a-X bor1 r3 h24 pH16 bold al-center bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10">700 руб.</div>
                  </div>
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
                  <div class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb160">
                    <div class="elz d-flex grow a-X bor1 r3 h24 pH16 bold al-center bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10">700 руб.</div>
                  </div>
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
                  <div class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb160">
                    <div class="elz d-flex grow a-X bor1 r3 h24 pH16 bold al-center bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10">700 руб.</div>
                  </div>
                </div>





              </div>
            </div>
            <div class="elz d-block showSelOut1 hideSelOut1 sel">
              <div class="elz d-flex a-H borV1 pH16 gap16 pV10 lh12 opAct07 cur-pointer bg bg-primary br br-primary brL-10 brHovL-15 brLInvD">
                <div class="elz d-block growX bold">Дополнительно</div>
                <div class="elz d-block p4 al-center wmn24 r3 fn11 bold bg bg-primary bgL-10">16</div>
                <div class="elz p-rel d-block noShrink p-rel mskBef s8 cFillBef bgBef-CC showSelIn1" style="&#45;&#45;elzMsk: url('https://lelouch.ru/uploads/icons/arrow1.svg');"></div>
                <div class="elz p-rel d-block noShrink p-rel mskBef s8 deg180 cFillBef bgBef-CC hideSelIn1" style="&#45;&#45;elzMsk: url('https://lelouch.ru/uploads/icons/arrow1.svg');"></div>
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
          </div>



          <div class="elz p-rel d-flex f-wrap a-X gap8 pV8 borT1 br br-primary brL-10 brLInvD">
            <div class="elz d-flex gap8 a-X al-center r3 hmn36 pH24 cur-pointer opAct07 bg bg-ok bgHovL10 fn fn-ok-t">
              <div class="elz d-block">Сохранить</div>
            </div>
          </div>


        </div>
      </div>-->

<!--      <div class="elz d-block bor1 r3 bg bg-primary bgL5 br br-primary brL-10 brLInvD hideSelOut showSelOut sel">
        <div class="elz d-flex gap8 a-H p16 opAct07 cur-pointer">
          <div class="elz d-flex f-wrap a-H grow gap8">
            <div class="elz d-block grow fb320 lh12">
              <div class="elz d-block bold">Телефония</div>
            </div>
          </div>
          <div class="elz p-rel d-block noShrink p-rel mskBef s8 deg180 cFillBef bgBef-CC hideSelIn" style="&#45;&#45;elzMsk: url('https://lelouch.ru/uploads/icons/arrow1.svg');"></div>
          <div class="elz p-rel d-block noShrink p-rel mskBef s8 cFillBef bgBef-CC showSelIn" style="&#45;&#45;elzMsk: url('https://lelouch.ru/uploads/icons/arrow1.svg');"></div>
        </div>
        <div class="elz d-block borT1 br br-primary brL-10 brLInvD fn12 showSelIn">


          <div class="elz d-flex a-H f-wrap fn16 pAT16 gap8">
            <div class="elz d-block fb320">Тарифный план:</div>
            <div class="elz d-flex f-wrap gap8 fb480 grow">
              <div class="elz d-block fb320 growMax">
                <div class="elz d-grid w100p grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0 cHovOut">

                  <div class="elz elzInput d-flex grPin a-H grY2 w100p bor1 r3 h40 pL16 pR24 ellipsis trns2 invPssSib
                                          bg bg-primary bgL10 bgLInvD
                                          br brLInvD br-primary brL-10 brHovInL-20 brFoc-focus brFocL0
                                          fn fn-primary-t">
                    <div class="elz growX pV8 oH nowrap ellipsis">Интернет 100мбит/с</div>
                  </div>

                  <span class="elz d-flex grPin grY2 a-H bor1 pH7 z6 evNone">

                                  <span class="elz p-rel growX d-flex a-PR">
                                      <span class="elz p-rel d-flex a-X s24 r2 trns2">
                                          <span class="elz p-rel d-block mskBef s8 cFillBef bgBef-CC deg180" style="&#45;&#45;elzMsk: url('https://lelouch.ru/uploads/icons/arrow2.svg');"></span>
                                      </span>
                                  </span>

                              </span>

                  <select class="elz d-block grPin grY2 p-EA s100p op0 pH16 z7 cur-pointer fn12 bg bg-primary bgL10 bgLInvD fn fn-primary-t">
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                    <option>Option 4</option>
                    <option>Option 5</option>
                  </select>

                </div>
              </div>
              <div class="elz d-block fb120 grow wmn160">
                <div class="elz d-flex a-X bor1 r3 h40 pH16 bold al-center bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10">700 руб.</div>
              </div>
            </div>
          </div>


          <div class="elz d-block mT16 r3 oH">
            <div class="elz d-block showSelOut1 hideSelOut1 sel">
              <div class="elz d-flex a-H borV1 pH16 gap16 pV10 lh12 opAct07 cur-pointer bg bg-primary br br-primary brL-10 brHovL-15 brLInvD">
                <div class="elz d-block growX bold">Опции</div>
                <div class="elz d-block p4 al-center wmn24 r3 fn11 bold bg bg-primary bgL-10">16</div>
                <div class="elz p-rel d-block noShrink p-rel mskBef s8 cFillBef bgBef-CC showSelIn1" style="&#45;&#45;elzMsk: url('https://lelouch.ru/uploads/icons/arrow1.svg');"></div>
                <div class="elz p-rel d-block noShrink p-rel mskBef s8 deg180 cFillBef bgBef-CC hideSelIn1" style="&#45;&#45;elzMsk: url('https://lelouch.ru/uploads/icons/arrow1.svg');"></div>
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
                  <div class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb160">
                    <div class="elz d-flex grow a-X bor1 r3 h24 pH16 bold al-center bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10">700 руб.</div>
                  </div>
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
                  <div class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb160">
                    <div class="elz d-flex grow a-X bor1 r3 h24 pH16 bold al-center bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10">700 руб.</div>
                  </div>
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
                  <div class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb160">
                    <div class="elz d-flex grow a-X bor1 r3 h24 pH16 bold al-center bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10">700 руб.</div>
                  </div>
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
                  <div class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb160">
                    <div class="elz d-flex grow a-X bor1 r3 h24 pH16 bold al-center bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10">700 руб.</div>
                  </div>
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
                  <div class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb160">
                    <div class="elz d-flex grow a-X bor1 r3 h24 pH16 bold al-center bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10">700 руб.</div>
                  </div>
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
                  <div class="elz d-flex f-wrap a-X gap8 pL16 pV8 grow fb160">
                    <div class="elz d-flex grow a-X bor1 r3 h24 pH16 bold al-center bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10">700 руб.</div>
                  </div>
                </div>





              </div>
            </div>
            <div class="elz d-block showSelOut1 hideSelOut1 sel">
              <div class="elz d-flex a-H borV1 pH16 gap16 pV10 lh12 opAct07 cur-pointer bg bg-primary br br-primary brL-10 brHovL-15 brLInvD">
                <div class="elz d-block growX bold">Дополнительно</div>
                <div class="elz d-block p4 al-center wmn24 r3 fn11 bold bg bg-primary bgL-10">16</div>
                <div class="elz p-rel d-block noShrink p-rel mskBef s8 cFillBef bgBef-CC showSelIn1" style="&#45;&#45;elzMsk: url('https://lelouch.ru/uploads/icons/arrow1.svg');"></div>
                <div class="elz p-rel d-block noShrink p-rel mskBef s8 deg180 cFillBef bgBef-CC hideSelIn1" style="&#45;&#45;elzMsk: url('https://lelouch.ru/uploads/icons/arrow1.svg');"></div>
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
          </div>



          <div class="elz p-rel d-flex f-wrap a-X gap8 pV8 borT1 br br-primary brL-10 brLInvD">
            <div class="elz d-flex gap8 a-X al-center r3 hmn36 pH24 cur-pointer opAct07 bg bg-ok bgHovL10 fn fn-ok-t">
              <div class="elz d-block">Сохранить</div>
            </div>
          </div>


        </div>
      </div>-->

    </div>

   </template>

</template>

<script>
import BaseButton from "@/components/elements/BaseButton";
import { useStore } from "vuex";


export default {
  name: "OrderServices",

  components: {
    BaseButton
  },

  setup() {
    const store = useStore();

    if (!store.state.orderPage.services) {
      store.dispatch('orderPage/fetchDealServices', store.state.orderPage.order.details.DealID);
    }

  },

  data() {
    return {
      isActive: false,
      customerInHydra: false,
    }
  },

  computed: {
  },

  methods: {
    toggleTableView(e){
      const elem = e.currentTarget;
      elem.classList.contains('sel') ? elem.classList.remove('sel') :  elem.classList.add('sel');
    },

    createService(e) {
      const elem = e.currentTarget;
      elem.classList.add('hide');
      elem.nextSibling.classList.remove('hide');
      elem.nextSibling.nextSibling.classList.remove('hide');
      elem.parentNode.classList.add('serviceIsCreated');
    },

    testService(e) {
      if (e.currentTarget.classList.contains('serviceIsCreated')) {
        const elem = e.currentTarget.parentNode;
        elem.classList.contains('sel') ? elem.classList.remove('sel') :  elem.classList.add('sel');
      }
    }
  }

}
</script>

<style scoped>

</style>
