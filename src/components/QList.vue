<template>
  <q-page>
    <div class="container">
      <q-infinite-scroll @load="onLoadMenu" :offset="250" :scroll-target="scrollTargetRef">
        <div v-for="list in getLists" :key="list.id" bordered separator>
          <div class="list-card">
              <div class="list-wrapper">
                <q-item-label class="list-title" overline>{{ list.title }}</q-item-label>
                <q-item-label class="list-body">{{ list.body }}</q-item-label>
              </div>
              <div class="icon-wrapper">
                <q-icon @click="likedPost(list)" :name="matFavorite" class="fav-icon" />
              </div>
          </div>
        </div>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import { mapActions, mapGetters } from "vuex";
import { matFavorite } from '@quasar/extras/material-icons'

export default {
  name: 'List',
  data: () => ({
    scrollTargetRef: null,
    lists: [],
  }),
  computed: {
    ...mapGetters(["getLists"]),
  },
  methods: {
    ...mapActions(["getListPosts"]),
    likedPost(item) {
      this.$store.dispatch("likedPost", item);
    },
     onLoadMenu (index, done) {
        if (index > 1) {
          setTimeout(() => {
            this.getListPosts();
            done()
          }, 2000)
        }
        else {
          setTimeout(() => {
            done()
          }, 200)
        }
      }
  },
  created() {
    this.matFavorite = matFavorite;
    this.onLoadMenu();
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
       .fav-icon {
        font-size: 2rem;
        cursor: pointer;
      }
    }
  }
}
</style>
