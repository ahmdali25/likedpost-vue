<template>
    <base-dialog :title="dialogTitle">
      <template #cardSection>
        <q-form
            ref="myForm"
            @submit="onSubmit"
            class="q-gutter-md">
              <q-card-section style="max-height: 50vh" class="scroll">
                <BaseInput
                  v-model="post.title"
                  type="text"
                  label="Title"
                  :rules="titleRules"
                />
                <BaseInput
                  v-model="post.body"
                  type="textarea"
                  label="Body"
                  autogrow
                  :rules="bodyRules"
                />
              </q-card-section>

              <q-card-actions align="right">
                <q-btn
                  type="reset"
                  @click="$router.go(-1)"
                  label="Cancel"
                  color="white"
                  text-color="black"
                  padding="xs lg"
                  no-caps
                  v-close-popup
                />
                <q-btn
                  type="submit"
                  label="Submit"
                  color="primary"
                  padding="xs lg"
                  no-caps
                  v-close-popup
                />
              </q-card-actions>
          </q-form>
      </template>
    </base-dialog>
</template>

<script>
import BaseDialog from "../components/BaseDialog.vue";
import BaseInput from "../components/BaseInput.vue";
import { mapGetters } from 'vuex';

export default {
    name: "Edit",
    components: { BaseDialog, BaseInput },
    data: () => ({
      dialogTitle: "Edit Post",
      post: {
        title: "",
        body: "",
      },
      titleRules: [val => val && val.length > 0 || 'Title harus diisi'],
      bodyRules: [val => val && val.length > 0 || 'Body harus diisi']
    }),
    computed: {
      ...mapGetters(["getEditedPost"]),
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

<style lang="scss" scoped>
@import '../styles/quasar.scss';

.card-header {
  background-color: $primary;
}
</style>