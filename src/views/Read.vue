<template>
    <q-dialog v-model="getModal">
      <q-card class="card">
         <q-toolbar class="card-header">
          <q-toolbar-title>
            <span class="text-capitalize text-weight-bold text-h6 text-white">{{ getReadPost.title }}</span>
          </q-toolbar-title>
          <q-btn @click="$router.go(-1)" flat round dense icon="close" color="white" v-close-popup />
        </q-toolbar>

        <q-card-section>
          <p class="read-body">{{ getReadPost.body }}</p>
        </q-card-section>
        <q-card-section>
          <div class="title">Comments</div>
          <div class="list-card" v-for="comment in getComments" :key="comment.id">
            <div class="list-wrapper">
              <q-item-label class="list-title" overline>{{ comment.email }}</q-item-label>
              <q-item-label class="list-body">{{ comment.body }}</q-item-label>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: "Edit",
    computed: {
      ...mapGetters(["getReadPost", "getComments"]),
      getModal: {
        get() {
          return this.$store.state.dialog;
        },
        set(v) {
          this.$store.commit("setModal", v);
        },
      },
    },
}
</script>

<style lang="scss" scoped>
@import '../styles/quasar.scss';

.card-header {
    background-color: $primary;
}

.read-body {
  &::first-letter {
    text-transform: capitalize;
  }
}

.title {
  font-size: 1rem;
  padding: 0.5rem;
  border-top: 2px  solid #000;
  font-weight: 700;
  background-color: #ececec;
  width: 15rem;
}

.list-card {
  width: 100%;
  height: 12vh;
  padding-top: 1rem;

  .list-wrapper {
    .list-title {
      font-size: 18px;
      font-weight: 700;
      color: #000;
          
      &::first-letter {
        text-transform: capitalize;
        }
    }

    .list-body {
      font-size: 13px;
      font-weight: 700;
      color: #bdb8b8;
    }

    .list-body::first-letter {
      text-transform: capitalize;
    }
  }
}
</style>