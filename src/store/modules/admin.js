import axiosEngine from "@/axios/engine";
import router from "../../router/index";

const adminModule = {
  state: {
		postsById: [],
		editedPost: {},
    readPost: {},
    comments: [],
	},
	getters: {
		getListsById(state) {
      return state.postsById;
    },
		getEditedPost(state) {
      return state.editedPost;
    },
    getReadPost(state) {
      return state.readPost;
    },
    getComments(state) {
      return state.comments;
    }
  },
  mutations: {
		setListsPostById(state, payload) {
      state.postsById = payload;
    },
		setEditPostById(state, payload) {
      state.editedPost = payload;
    },
    setReadPostById(state, payload) {
      state.readPost = payload;
    },
    setComments(state, payload) {
      state.comments = payload;
    }
	},
  actions: {
		async getListsPostById({commit}, id) {
      try {
        let res = await axiosEngine.get(`/posts?userId=${id}`);
        commit("setListsPostById", res.data);
      } catch (err) {
        console.log(err);
      }
    },
    async editPostById(commit, payload) {
      try {
        let res = await axiosEngine.put(`/posts/${payload.id}`, payload);
        if (res.status === 200) {
          console.log(res.data);
          alert("Edit post berhasil!, cek console.log")
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getCommentsById({commit}, id) {
      try {
        let res = await axiosEngine.get(`/posts/${id}/comments`);
        commit("setComments", res.data);
      } catch (err) {
        console.log(err);
      }
    },
    async addPost({commit}, payload) {
      try {
        let res = await axiosEngine.post("/posts", payload);
        console.log(res);
        alert("Add post berhasil!, cek console.log");
        commit("setModal", false);
      } catch (err) {
        console.log(err);
      }
    },
    async deletePostById(commit, id) {
      try {
        let res = await axiosEngine.delete(`/posts/${id}`);
        if (res.status === 200) {
          console.log(res);
          alert("Delete post berhasil!, cek console.log")
        }
      } catch (err) {
        console.log(err);
      }
    },
		showModalEdit({commit}, payload) {
      commit("setModal", true);
      commit("setEditPostById", payload)
      router.push({ name: "Edit", params: { id: payload.id} });
    },
    showModalRead({commit, dispatch}, payload) {
      commit("setModal", true);
      commit("setReadPostById", payload)
      dispatch("getCommentsById", payload.id);
      router.push({ name: "Read", params: { id: payload.id} });
    },
    showModalDelete({commit}) {
      commit("setModalDelete", true);
    },
    showModalAdd({commit}) {
      commit("setModal", true);
      router.push({ name: "Create" });
    },
	},
};

export default adminModule;
