<template>
    <base-dialog :title="getReadPost.title">
      <template #cardSection>
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
      </template>
    </base-dialog>
</template>

<script>
import BaseDialog from "../components/BaseDialog.vue";
import { mapGetters } from 'vuex';

export default {
    name: "Edit",
    components: { BaseDialog },
    computed: {
      ...mapGetters(["getReadPost", "getComments"]),
    },
}
</script>

<style lang="scss" scoped>
@import '../styles/quasar.scss';

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