// import { Store } from 'vuex';

// declare module '@vue/runtime-core' {
//   interface User {
//     userName: string;
//     phoneNumber: string;
//   };

//   interface ComponentCustomProperties {
//     $userStore: Store<User>;
//   }
// }

declare module "vuex" {
  export * from "vuex/types/index.d.ts";
  export * from "vuex/types/helpers.d.ts";
  export * from "vuex/types/logger.d.ts";
  export * from "vuex/types/vue.d.ts";
}