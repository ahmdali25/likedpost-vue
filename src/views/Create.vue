<template>
    <q-dialog v-model="getModal">
      <q-card>
          <q-toolbar class="card-header">
            <q-toolbar-title>
              <span class="text-weight-bold text-h6 text-white">Create Post</span>
            </q-toolbar-title>

            <q-btn @click="$router.go(-1)" flat round dense icon="close" color="white" v-close-popup />
          </q-toolbar>

          <q-card-section class="q-pl-xl q-pr-xl">
            <q-form
          ref="myForm"
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md">
            <q-card-section style="max-height: 50vh" class="scroll">
            <q-input
              v-model="post.title"
              label="Title"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Title harus diisi']"
            />

            <q-input
              v-model="post.body"
              type="textarea"
              label="Body"
              autogrow
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Body harus diisi']"
            />
            </q-card-section>

            <q-card-actions align="right">
              <q-btn type="reset" @click="$router.go(-1)" label="Cancel" color="white" text-color="black" padding="xs lg" no-caps v-close-popup />
              <q-btn type="submit" label="Save" color="primary" padding="xs lg" no-caps v-close-popup />
            </q-card-actions>
            </q-form>
          </q-card-section>
      </q-card>
    </q-dialog>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: "Edit",
    data: () => ({
      post: {
        title: "",
        body: "",
      },
    }),
    computed: {
        ...mapGetters(["getModal"]),
    },
    methods: {
      onSubmit() {
        let post = {
          title: this.post.title,
          body: this.post.body,
          userId: parseInt(localStorage.getItem("userId")),
        }
        this.$store.dispatch("addPost", post);
      },
      onReset() {
        this.post = {}
      }
    },
}
</script>

<style lang="scss" scoped>
@import '../styles/quasar.scss';

.card-header {
  background-color: $primary;
}
</style>