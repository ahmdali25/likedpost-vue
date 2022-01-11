<template>
    <base-dialog :title="dialogTitle">
      <template #cardSection>
         <q-form
            ref="myForm"
            @submit="onSubmit"
            @reset="onReset"
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

            <q-card-actions align="center">
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
                label="Save"
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

export default {
    name: "Create",
    components: { BaseDialog, BaseInput },
    data: () => ({
      dialogTitle: "Create Post",
      post: {
        title: "",
        body: "",
      },
      titleRules: [val => val && val.length > 0 || 'Title harus diisi'],
      bodyRules: [val => val && val.length > 0 || 'Body harus diisi']
    }),
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