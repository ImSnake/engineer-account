<template>
  <div class="elz cnnFilterPanel p-sticky p-TEP d-flex p16 mB-16 gap16 ac-between f-wrap fn12 z10 bg bg-primary">
    <div class="elz cnnSelects d-flex f-wrap grow gap16">
      <label class="elz d-grid grow w100 grPos fn fn-primary-t fnL20 fnLInvD fnHovL10 fnFow-focus fnFowL0">
        <input @keyup="findByOrderId" @keyup.enter="getByOrderId" @change="getByOrderId" v-model="orderId" type="number" placeholder="ID Заявки" class="elz elzInput d-block grPin grY2 w100p bor1 r3 h40 pL32 pR8 ellipsis trns2 bg bg-primary bgL10 bgLInvD br brLInvD br-primary brL-10 brHovL-20 brFoc-focus brFocL0 fn fn-primary-t" />
        <span class="elz d-flex grPin grY2 a-H bor1 pH7 z6 evNone">
          <span class="elz p-rel d-flex a-X s24 trns2">
            <span class="elz p-rel d-flex a-X mskBef s1 bold fn16">#</span>
          </span>
          <span v-if="orderSearchIcon" @click="getByOrderId" class="elz p-rel growX d-flex a-PR">
            <span class="elz p-rel d-flex a-H cur-pointer opAct07 fn fn-ok fnHovL10" title="Искать заявку">
              <span class="elz p-rel d-flex a-X s24 r2 evAuto">
                <span class="elz p-rel d-block mskBef s16 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/search.svg');"></span>
              </span>
            </span>
          </span>
        </span>
      </label>

      <SelectFilter
          v-model="prioritySelected"
          @update:modelValue="changePriority"
          :options="priorities"
          :title="'Приоритет'"  />

      <SelectFilter
          v-model="roleSelected"
          @update:modelValue="changeRole"
          :options="roles"
          :title="'Роль'"  />

      <SelectFilter
          v-model="statusSelected"
          @update:modelValue="changeStatus"
          :options="statuses"
          :title="'Статус'"  />

      <SelectFilter
          v-model="departmentSelected"
          @update:modelValue="changeDepartment"
          :options="department"
          :title="'Подразделение'"  />

      <SelectFilter
          v-model="typeSelected"
          @update:modelValue="changeType"
          :options="types"
          :title="'Тип заявки'"  />

    </div>

    <div class="elz cnnFilters d-flex f-wrap gap16">
      <div @click="toggleSortFilter" class="elz d-flex grow a-H pH16 w150 h40 r3 cur-pointer opAct07 bg bg-primary bgL-10
           bgHovL-15 bgLInvD bgSel bgSel-secondary fnSel fnSel-secondary-t">
        <div class="elz d-block grow bold">Срок</div>
        <div class="elz p-rel d-block s16 noShrink">
          <div class="elz d-block p-abs mskBef s16 mL4 cFillBef bgBef-CC op02" style="--elzMsk: url('/style/icons/sort.svg');"></div>
          <div class="sortIcon default elz hide d-block p-abs mskBef s16 mL4 cFillBef bgBef-CC" style="--elzMsk: url('/style/icons/sort-decrease.svg');"></div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import SelectFilter from "@/components/elements/SelectFilter";

export default {
  name: "OrdersFilters",

  components: {
    SelectFilter
  },

  setup() {
    return {
      sortIcons: {
        default:  "",
        decrease: "--elzMsk: url('/style/icons/sort-decrease.svg')",
        increase: "--elzMsk: url('/style/icons/sort-increase.svg')"
      }
    }
  },

  data() {
    return {
      orderId: '',
      orderSearchIcon: false,
      departmentSelected: '',
      prioritySelected: '',
      roleSelected: '',
      statusSelected: '',
      typeSelected: ''
    }
  },

  computed: {
    department() {
      return this.$store.state.static.filters.department;
    },

    orders() {
      return this.$store.state.homePage.orders;
    },

    priorities() {
      return this.$store.state.static.filters.priorities;
    },

    roles() {
      return this.$store.state.static.filters.roles;
    },

    statuses() {
      return this.$store.state.static.filters.statuses;
    },

    types() {
      return this.$store.state.static.filters.types;
    }
  },

  methods: {
    changeDepartment() {
      //let depArr = [+this.departmentSelected];
      //let depId = this.department.find(el => +el.departmentId === +this.departmentSelected)?.headDepId;
      //console.log(depId);
      //while (depId !== 2 && depId !== undefined) {
        //depArr.push(depId);
        //depId = this.department.find(el => +el.departmentId === +depId).headDepId;
      //}
      //console.log(depArr);

      this.orders.forEach(order => {
        order.showInList.byDepartment = (+order.DepartmentID === +this.departmentSelected || +this.departmentSelected === 0);
      });
    },

    changePriority() {
      let temp = +this.prioritySelected;
      if (temp === 4) {
        temp = 0;   // priority 4 (низкий) = 0 (по TTS)
      }
      this.orders.forEach(order => {
        order.showInList.byPriority = (+order.Priority === temp || +this.prioritySelected === 0);
      });
    },

    changeRole() {
      if (+this.roleSelected === 1) {
        this.orders.forEach(order => order.showInList.byRole = (+order.is_executer === 1));
      } else if (+this.roleSelected === 2) {
        this.orders.forEach(order => order.showInList.byRole = (+order.ResponsibleID === +this.$store.state.static.user.userId));
      } else {
        this.orders.forEach(order => order.showInList.byRole = true);
      }
    },

    changeStatus() {
      this.orders.forEach(order => {
        order.showInList.byStatus = (+order.TroubleStatusID === +this.statusSelected || +this.statusSelected === 0);
      });
    },

    changeType() {
      this.orders.forEach(order => {
        order.showInList.byType = (+order.OrderTypeID === +this.typeSelected || +this.typeSelected === 0);
      });
    },

    findByOrderId() {
      const pattern = this.orderId.toString();
      this.orders.forEach(order => {
        const value = order.OrderID.toString();
        order.showInList.byNumber = (value.search(pattern) > -1);
      });
      this.orderSearchIcon = !this.orders.find(el => el.showInList.byNumber === true);
    },

    getByOrderId() {
      this.$store.dispatch('homePage/fetchOrderSingleSearch', this.orderId.toString());
    },

    toggleSortFilter(e) {
      const $icon = e.currentTarget.querySelector('.sortIcon');
      if ($icon.classList.contains('default')) {
        $icon.style = this.sortIcons.increase;
        $icon.classList.add('increase');
        $icon.classList.remove('default', 'hide');
        this.orders.sort((a, b) => a.overdueSummary > b.overdueSummary ? 1 : -1);
      }
      else if ($icon.classList.contains('increase')) {
        $icon.classList.remove('increase');
        $icon.classList.add('decrease');
        $icon.style = this.sortIcons.decrease;
        this.orders.sort((a, b) => a.overdueSummary < b.overdueSummary ? 1 : -1);
      }
      else if ($icon.classList.contains('decrease')) {
        $icon.classList.remove('decrease');
        $icon.classList.add('default', 'hide');
        this.orders.sort((a, b) => a.OrderID < b.OrderID ? 1 : -1);
      }
    }
  }
}
</script>

