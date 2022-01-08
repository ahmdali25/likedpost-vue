import axiosEngine from "@/axios/engine";

const homeModule = {
  state: {
		posts: [],
	},
	getters: {
    getLists(state) {
      return state.posts;
    },
  },
  mutations: {
		setListsPost(state, payload) {
      state.posts = payload;
    },
	},
  actions: {
		async getListPosts({commit}) {
      try {
        let res = await axiosEngine.get("/posts");
        commit("setListsPost", res.data);
      } catch (err) {
        console.log(err);
      }
    },
	},
};

export default homeModule;
