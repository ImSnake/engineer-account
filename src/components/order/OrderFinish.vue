<template>
  <template v-if="isActive">

    <div class="elz d-flex a-X mB32">
      <div class="elz d-flex a-X al-center r3 h48 pH32 wmn240 cur-pointer opAct07 bg bg-ok fn fn-ok-t uDisabled">
        Требуется загрузить сканы документов
      </div>
    </div>

    <div class="elz d-flex gapH16 gapV32 f-wrap">

      <div class="elz d-block grow fb480">

        <div class="elz p-rel d-block r3 p16 bor1 cur-pointer opAct07 bg bg-primary bgL-5 bgHovL-10 bgLInvD br br-primary brL-10 brLInvD">
          <div class="elz p-abs p-F m8 bor1 br-dashed br br-primary brLF-30 brFInvD brLInvD"></div>
          <div class="elz p-rel d-block al-center lh15">
            <div class="elz p-rel d-block p-rel mHAuto mB8 mskBef s32 cFillBef bgBef-CC" style="--elzMsk: url('https://lelouch.ru/uploads/icons/rules.svg');"></div>
            <div class="elz d-block">Загрузить акт</div>
            <div class="elz d-block fn12">Нажмите или перетащите файл сюда</div>
          </div>
        </div>

        <div class="elz d-flex dir-y gap8 mT8 fn12 lh15">

          <div class="elz d-flex r3 p8 gap8 bor1 bg bg-primary bgL5 bgLInvD br br-primary brL-10 brLInvD">
            <a class="elz d-flex f-wrap m-8 p8 a-H growX gap8 cur-pointer opAct07" href="#">
              <div class="elz d-block growX wbreak">
                <div class="elz d-block">Акт приема и передачи работ</div>
                <div class="elz d-block fn11">22.03.2022 в 16:45</div>
              </div>
            </a>
            <div title="Идет загрузка" class="elz d-flex s-H a-X cur-pointer opAct07 s32 rRound bgHov bgHov-primary bgHovL-5 bgHovLInvD">
              <div class="mskIcon elz d-block p-rel noShrink mskBef s16 cFillBef bgBef-CC anim5 an-spinner animit" style="--elzMsk: url('https://lelouch.ru/uploads/icons/spinner.svg');"></div>
            </div>
          </div>

          <div class="elz d-flex r3 p8 gap8 bor1 bg bg-primary bgL5 bgLInvD br br-primary brL-10 brLInvD">
            <a class="elz d-flex f-wrap m-8 p8 a-H growX gap8 cur-pointer opAct07" href="#">
              <div class="elz d-block growX wbreak">
                <div class="elz d-block">Акт приема и передачи работ стр. 2</div>
                <div class="elz d-block fn11">22.03.2022 в 16:45</div>
              </div>
            </a>
            <div title="Удалить" class="elz d-flex s-H a-X cur-pointer opAct07 s32 rRound bgHov bgHov-primary bgHovL-5 bgHovLInvD">
              <div class="mskIcon elz d-block p-rel noShrink mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('https://lelouch.ru/uploads/icons/cross1.svg');"></div>
            </div>
          </div>

          <div class="elz d-flex r3 p8 gap8 bor1 bg bg-primary bgL5 bgLInvD br br-primary brL-10 brLInvD">
            <a class="elz d-flex f-wrap m-8 p8 a-H growX gap8 cur-pointer opAct07" href="#">
              <div class="elz d-block growX wbreak">
                <div class="elz d-block">Акт приема и передачи работ стр. 3</div>
                <div class="elz d-block fn11">22.03.2022 в 16:45</div>
              </div>
            </a>
            <div title="Удалить" class="elz d-flex s-H a-X cur-pointer opAct07 s32 rRound bgHov bgHov-primary bgHovL-5 bgHovLInvD">
              <div class="mskIcon elz d-block p-rel noShrink mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('https://lelouch.ru/uploads/icons/cross1.svg');"></div>
            </div>
          </div>

        </div>

      </div>

      <div class="elz d-block grow fb480">

        <div class="elz p-rel d-block r3 p16 bor1 cur-pointer opAct07 bg bg-primary bgL-5 bgHovL-10 bgLInvD br br-primary brL-10 brLInvD">
          <div class="elz p-abs p-F m8 bor1 br-dashed br br-primary brLF-30 brFInvD brLInvD"></div>
          <div class="elz p-rel d-block al-center lh15">
            <div class="elz p-rel d-block p-rel mHAuto mB8 mskBef s32 cFillBef bgBef-CC" style="--elzMsk: url('https://lelouch.ru/uploads/icons/file-presentation.svg');"></div>
            <div class="elz d-block">Загрузить бланк заказа</div>
            <div class="elz d-block fn12">Нажмите или перетащите файл сюда</div>
          </div>
        </div>

        <div class="elz d-flex dir-y gap8 mT8 fn12 lh15">

          <div class="elz d-flex r3 p8 gap8 bor1 bg bg-primary bgL5 bgLInvD br br-primary brL-10 brLInvD">
            <a class="elz d-flex f-wrap m-8 p8 a-H growX gap8 cur-pointer opAct07" href="#">
              <div class="elz d-block growX wbreak">
                <div class="elz d-block">Бланк заказа</div>
                <div class="elz d-block fn11">22.03.2022 в 16:45</div>
              </div>
            </a>
            <div title="Идет загрузка" class="elz d-flex s-H a-X cur-pointer opAct07 s32 rRound bgHov bgHov-primary bgHovL-5 bgHovLInvD">
              <div class="mskIcon elz d-block p-rel noShrink mskBef s16 cFillBef bgBef-CC anim5 an-spinner animit" style="--elzMsk: url('https://lelouch.ru/uploads/icons/spinner.svg');"></div>
            </div>
          </div>

        </div>

      </div>

      <div class="elz d-block grow fb480">

        <div class="elz p-rel d-block r3 p16 bor1 cur-pointer opAct07 bg bg-primary bgL-5 bgHovL-10 bgLInvD br br-primary brL-10 brLInvD">
          <div class="elz p-abs p-F m8 bor1 br-dashed br br-primary brLF-30 brFInvD brLInvD"></div>
          <div class="elz p-rel d-block al-center lh15">
            <div class="elz p-rel d-block p-rel mHAuto mB8 mskBef s32 cFillBef bgBef-CC" style="--elzMsk: url('https://lelouch.ru/uploads/icons/file-text.svg');"></div>
            <div class="elz d-block">Загрузить файл</div>
            <div class="elz d-block fn12">Нажмите или перетащите файл сюда</div>
          </div>
        </div>

        <div class="elz d-flex dir-y gap8 mT8 fn12 lh15">

          <div class="elz d-flex r3 p8 gap8 bor1 bg bg-primary bgL5 bgLInvD br br-primary brL-10 brLInvD">
            <a class="elz d-flex f-wrap m-8 p8 a-H growX gap8 cur-pointer opAct07" href="#">
              <div class="elz d-block growX wbreak">
                <div class="elz d-block">Прайс-лист с дополнительными услугами</div>
                <div class="elz d-block fn11">22.03.2022 в 22:07</div>
              </div>
            </a>
            <div title="Удалить" class="elz d-flex s-H a-X cur-pointer opAct07 s32 rRound bgHov bgHov-primary bgHovL-5 bgHovLInvD">
              <div class="mskIcon elz d-block p-rel noShrink mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('https://lelouch.ru/uploads/icons/cross1.svg');"></div>
            </div>
          </div>

          <div class="elz d-flex r3 p8 gap8 bor1 bg bg-primary bgL5 bgLInvD br br-primary brL-10 brLInvD">
            <a class="elz d-flex f-wrap m-8 p8 a-H growX gap8 cur-pointer opAct07" href="#">
              <div class="elz d-block growX wbreak">
                <div class="elz d-block">Прайс-лист с дополнительными услугами</div>
                <div class="elz d-block fn11">22.03.2022 в 22:07</div>
              </div>
            </a>
            <div title="Удалить" class="elz d-flex s-H a-X cur-pointer opAct07 s32 rRound bgHov bgHov-primary bgHovL-5 bgHovLInvD">
              <div class="mskIcon elz d-block p-rel noShrink mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('https://lelouch.ru/uploads/icons/cross1.svg');"></div>
            </div>
          </div>

        </div>

      </div>

    </div>
  </template>
</template>

<script>
export default {
  name: "OrderFinish",

  data() {
    return {
      isActive: false,
    }
  },
}
</script>

<style scoped>

</style>
