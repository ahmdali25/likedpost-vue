<template>
  <q-header elevated class="primary">
     <q-toolbar>
        <q-btn
          flat
          dense
          round
          to="/"
          icon="home"
        />

          <q-toolbar-title>
            {{ $route.name }}
          </q-toolbar-title>

          <div class="icon-wrapper">
            <q-icon @click="toLikedPost" :name="matFavorite" class="fav-icon" />
          </div>

          <div class="btn-admin">
            <q-button v-if="isLoggedIn" @click="toAdmin" label="Admin"></q-button>
          </div>

          <q-button v-if="!isLoggedIn" @click="showModalLogin" label="Login"></q-button>
          <q-button v-else @click="handleLogout" label="Logout"></q-button>
      </q-toolbar>
  </q-header>
</template>

<script>
import QButton from "@/components/QButton.vue";
import { matFavorite } from '@quasar/extras/material-icons'
import { mapGetters } from 'vuex';

export default {
  components: { QButton },
  name: 'Header',
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
  methods: {
    showModalLogin() {
      this.$store.dispatch("showModalLogin", true);
    },
    handleLogout() {
      this.$store.dispatch("logout");
    },
    toLikedPost() {
      this.$router.push("/liked-post");
    },
    toAdmin() {
      this.$router.push("/admin");
    }
  },
  created() {
    this.matFavorite = matFavorite;
  }
}
</script>

<style lang="scss" scoped>
.modal-card {
  width: 300px;
}

.btn-admin {
  margin-right: 4px;
}

.icon-wrapper {
  .fav-icon {
    font-size: 2rem;
    cursor: pointer;
    margin-right: 10px;
  }
}
</style>