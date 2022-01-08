<template>
  <q-layout class="main" view="lHh Lpr lFf">
    <q-header></q-header>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions } from 'vuex';
import QHeader from "./components/QHeader.vue";

export default {
  name: 'App',
  components: {
    QHeader
  },
  methods: {
    ...mapActions(["getListUsers"]),
  },
  created() {
    this.getListUsers();
  }
}
</script>

<style lang="scss" scoped>
.main {
  font-family: 'Nunito', sans-serif;
}
</style>
