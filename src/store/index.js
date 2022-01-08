import { createStore } from 'vuex'
import axiosEngine from "@/axios/engine";
import router from "../router/index";
import homeModule from './modules/home';
import adminModule from './modules/admin';

export default createStore({
  modules: {
    homeModule,
    adminModule
  },
  state: {
    likedPost: [],
    users: [],
    dialog: false,
    dialogDelete: false,
    userId: null,
    isLogin: false || JSON.parse(localStorage.getItem("isLogin")),
    isShowModalLogin: false,
  },
  getters: {
    getLikedPost() {
      let likedPost = JSON.parse(localStorage.getItem("likedPost"));
      return likedPost;
    },
    getModalLogin(state) {
      return state.isShowModalLogin;
    },
    isLoggedIn(state) {
      return state.isLogin;
    },
    getModal(state) {
      return state.dialog;
    },
    getDialogDelete(state) {
      return state.dialogDelete;
    },
  },
  mutations: {
    setModalLogin(state, payload) {
      state.isShowModalLogin = payload;
    },
    setUserId(state, payload) {
      state.userId = payload;
      localStorage.setItem("userId", payload);
    },
    setUsers(state, payload) {
      state.users = payload;
    },
    setLogin(state, payload) {
      state.isLogin = payload;
      localStorage.setItem("isLogin", true);
    },
    setLikedPost(state, payload) {
      state.likedPost.push(payload);
      localStorage.setItem("likedPost", JSON.stringify(state.likedPost));
    },
    setUnlikedPost(state, payload) {
      state.likedPost.splice(
        state.likedPost.findIndex((item) => item.id === payload.id),
        1
      );
      localStorage.setItem("likedPost", JSON.stringify(state.likedPost));
    },
    setModal(state, payload) {
      state.dialog = payload;
    },
    setModalDelete(state, payload) {
      state.dialogDelete = payload;
    },
  },
  actions: {
    async getListUsers({commit}) {
      try {
        let res = await axiosEngine.get("/users");
        let mapUser = res.data.map(data => ({
          userId: data.id,
          email: data.email,
        }));
        commit("setUsers", mapUser);
      } catch (err) {
        console.log(err);
      }
    },
    login ({commit, dispatch}, payload) {
      if (this.state.users.some(el => el.userId === payload.userId && el.email === payload.email)) {
        alert("Login berhasil!");
        commit("setLogin", true);
        commit("setUserId", payload.userId);
        dispatch("getListsPostById", payload.userId);
        router.push({ path: "/admin" });
      } else {
        alert("User Id atau email salah!");
      }
    },
    logout() {
      localStorage.removeItem("isLogin");
      location.reload();
      router.push({ path: "/login" });
    },
    likedPost({commit}, payload) {
      commit("setLikedPost", payload);
      alert("Post liked!")
    },
    unlikedPost({commit}, payload) {
      commit("setUnlikedPost", payload);
      if(confirm('Post unliked!')){
        window.location.reload();  
      }
    },
    showModalLogin({commit}, payload) {
      commit("setModalLogin", payload);
      router.push({ path: "/login" });
    },
  },
})
