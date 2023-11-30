import type { GetterTree, Module, MutationTree } from "vuex";

interface UserSignUpDTO {
  email: string
  password: string
  name: string
  phoneNumber: string
  address: string
  addressDetail: string
  cardNumber: string
}
interface UserState {
  name: string;
  signUpProcess: Array<Array<Partial<UserSignUpDTO>>>;
};
type MutationsName = 'setName' | 'setSignupProcess' | 'cleanupSignProcess';

// commit 함수에 전달되는 type을 MutationsNameType으로 제한
interface actionType {
  commit: (mutation: MutationsName, payload: any) => void;
  state: UserState;
}

// initial state
const state: UserState = {
  name: 'userModule',
  signUpProcess: [
    [{
      email: '',
      password: '',
    }],
    [{
      name: '',
      phoneNumber: '',
      address: '',
      addressDetail: '',
    }],
    [{
      cardNumber: '',
    }]
  ]
};

// getter
const getters: GetterTree<UserState, any> = {
  getName: (state: UserState): string => state.name,
  getSignProcess: (state: UserState) => state.signUpProcess,
}

// 비동기 요청 로직
const actions = {
  async postUserSignUp({ commit, state }: actionType) {
    const requestData = state.signUpProcess;
    console.log(requestData);
    /* 
      회원가입 요청 서버 api 요청 로직
      예상 flow
      1. 사용자 입력 값 서버전송
      2. DB Insert 이 후 회원가입 한 유저를 특정할 수 있는 string 리턴
      3. 특정 string return
    */
    return 'user-profile-info-token';
  },
  async getUserInfo({ commit, state }: actionType, userToken: string) {
    // userToken을 기반으로 api에 유저 정보 획득 후 리턴
    const info = state.signUpProcess.flat();
    return {
      email: info[0].email ?? '',
      userName: info[1].name ?? '',
      address: `${info[1].address ?? ''} - ${info[1].addressDetail ?? ''}`,
      phoneNumber: info[1].phoneNumber ?? '',
    };
  }
}

// state 상태 변경 로직
const mutations: MutationTree<UserState> = {
  setName(state: UserState, name: string) {
    state.name = name;
  },
  setSignupProcess(state: UserState, { data, step }) {
    state.signUpProcess[step] = data;
  },
  cleanupSignProcess(state: UserState) {
    state.signUpProcess = [
      [{
        email: '',
        password: '',
      }],
      [{
        name: '',
        phoneNumber: '',
        address: '',
        addressDetail: '',
      }],
      [{
        cardNumber: ''
      }]
    ];
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