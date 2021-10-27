interface IState {
  systemName: string;
}

const config = {
  state: {
    systemName: "vue3+ts",
  },
  getters: {
    getSystemName: (state: IState): string => state.systemName,
  },
};
export default {
  ...config,
  namespaced: true,
};
