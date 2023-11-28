import type { Commit } from "vuex/types/index.js";
type MutationsName = 'setName';
interface AboutState {
  name: string;
};

interface actionType {
  commit: Commit;
  state: AboutState;
}

// initial state
const state: AboutState = () => ({
  name: '',
});

// getter
const getters = {
  getName: (state: AboutState) => state.name,
}

// action
const actions = {
  setName: ({ commit, state }: actionType, name: string) => {

  }
}

const mutations = {};

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations,
}