<template>
  <q-page>
    <div class="container">
      <div v-for="list in getListsById" :key="list.id" bordered separator>
        <div class="list-card">
          <div class="list-wrapper">
            <p class="list-title" overline>{{ list.title }}</p>
            <p class="list-body">{{ list.body }}</p>
          </div>
          <div class="icon-wrapper">
            <q-icon @click="editItem(list)" color="yellow" :name="matEdit" class="fav-icon" />
            <q-icon @click="deleteItem(list)" color="red" :name="matDelete" class="fav-icon" />
          </div>
        </div>
      </div>

      <q-dialog-delete :data="data"></q-dialog-delete>

      <q-page-sticky position="bottom-right" :offset="[18, 40]">
        <q-btn @click="showModalAdd" fab icon="add" color="accent" />
      </q-page-sticky>
    </div>
    <router-view></router-view>
  </q-page>
</template>

<script>
import QDialogDelete from "../components/QDialogDelete.vue";
import { mapActions, mapGetters } from "vuex";
import { matDelete, matEdit } from '@quasar/extras/material-icons'

export default {
  name: 'Admin',
  components: { QDialogDelete },
  data: () => ({
    data: {}
  }),
  computed: {
    ...mapGetters(["getListsById"]),
  },
  methods: {
    ...mapActions(["getListsPostById"]),
    editItem(data) {
      this.$store.dispatch("showModalEdit", data);
    },
    deleteItem(data) {
      this.data = data;
      this.$store.dispatch("showModalDelete", data);
    },
    showModalAdd() {
      this.$store.dispatch("showModalAdd");
    }
  },
  created() {
    this.matDelete = matDelete;
    this.matEdit = matEdit;
    this.getListsPostById(localStorage.getItem("userId"));
  }
}
</script>

style <style lang="scss" scoped>
.container {
  .list-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 25vh;
    padding: 2.5rem 4rem;

    .list-wrapper {
      .list-title {
        font-size: 18px;
        color: #000;
        
        &::first-letter {
          text-transform: capitalize;
        }
      }

      .list-body::first-letter {
        text-transform: capitalize;
      }
    }

    .icon-wrapper {
      display: flex;

      .fav-icon {
        font-size: 2rem;
        cursor: pointer;
      }
    }
  }
}
</style>
