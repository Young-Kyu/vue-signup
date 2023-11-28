import type { GetterTree, Module, MutationTree } from "vuex";
import type { Commit, Mutation } from "vuex/types/index.js";

interface UserState {
  name: string;
};
type MutationsName = 'setName';
interface actionType {
  commit: (mutation: MutationsName, payload: any) => void;
}

// initial state
const state: UserState = () => ({
  name: 'sss',
});

// getter
const getters: GetterTree<UserState, any> = {
  getName: (state: UserState): string => state.name,
}

// 비동기 요청 로직
const actions = {
  setName({ commit }: actionType, payload: string) {
    // commit 함수에 전달되는 type을 MutationType으로 제한
    commit('setName', payload);
  },
}

// state 상태 변경 로직
const mutations: MutationTree<UserState> = {
  setName(state: UserState, name: string) {
    console.log(name);
    state.name = name;
  }
};

const User: Module<UserState, any> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

export default User;