<template>
    <q-dialog v-model="getModal">
      <q-card class="q-pt-lg q-pb-lg q-pl-xl q-pr-xl">
          <q-card-section>
            <div class="text-h6">Edit Post</div>
          </q-card-section>

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
              <q-btn type="submit" label="Submit" color="primary" padding="xs lg" no-caps v-close-popup />
            </q-card-actions>
          </q-form>
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
        ...mapGetters(["getModal", "getEditedPost"]),
    },
    methods: {
      onSubmit() {
        let post = {
          userId: this.getEditedPost.userId,
          id: this.getEditedPost.id,
          title: this.post.title,
          body: this.post.body
        }
        this.$store.dispatch("editPostById", post);
      }
    },
    created() {
      this.post.title = this.getEditedPost.title;
      this.post.body = this.getEditedPost.body;
    }
}
</script>