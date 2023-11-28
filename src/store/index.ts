import user from './module/user';
import about from './module/about';
import Vuex from "vuex";

const store = Vuex.createStore({
  modules: {
    user,
    about
  },
});

export default store;