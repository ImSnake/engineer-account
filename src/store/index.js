import { createStore }  from 'vuex';
import { ModuleStatic } from "@/store/ModuleStatic";
import { ModuleHome }   from "@/store/ModuleHome";
import { ModuleOrder } from "@/store/ModuleOrder";
import { ModuleWorks } from "@/store/ModuleWorks";

export default createStore({
  modules: {

    static: ModuleStatic(),

    homePage: ModuleHome(),

    orderPage: ModuleOrder(),

    scoreWorks: ModuleWorks(),
  }
});
