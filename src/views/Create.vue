<template>
    <base-form-dialog @onSubmit="onSubmit" @onReset="onReset" :title="dialogTitle" :data="post"></base-form-dialog>
</template>

<script>
import BaseFormDialog from "../components/BaseFormDialog.vue";

export default {
    name: "Create",
    components: { BaseFormDialog },
    data: () => ({
      dialogTitle: "Create Post",
      post: {
        title: "",
        body: "",
      },
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