<template>
  <q-page>
    <div class="container">
      <div v-if="getLikedPost">
        <div v-if="getLikedPost.length > 0">
          <div v-for="list in getLikedPost" :key="list.id" bordered separator>
              <div class="list-card">
                <div class="list-wrapper">
                  <p class="list-title" overline>{{ list.title }}</p>
                  <p class="list-body">{{ list.body }}</p>
                </div>

                <div class="icon-wrapper">
                  <q-icon @click="unLikedPost(list)" :name="matFavorite" class="fav-icon" />
                </div>
              </div>
          </div>
        </div>

        <div v-else-if="getLikedPost.length === 0" class="no-list-card">
          <div class="no-list">You haven't liked any posts yet</div>
        </div>
      </div>

      <div v-else class="no-list-card">
        <div class="no-list">You haven't liked any posts yet</div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { matFavorite } from '@quasar/extras/material-icons'
import { mapGetters } from "vuex";

export default {
  name: 'LikedPost',
  computed: {
    ...mapGetters(["getLikedPost"]),
  },
   methods: {
    unLikedPost(item) {
      this.$store.dispatch("unlikedPost", item);
    }
  },
  created() {
    this.matFavorite = matFavorite;
  },
}
</script>

<style lang="scss" scoped>
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

  .no-list-card {
    display: flex;
    justify-content: center;
    padding: 15rem 15rem;
    .no-list {
      font-size: 1.5rem;
    }
  }
}
</style>
