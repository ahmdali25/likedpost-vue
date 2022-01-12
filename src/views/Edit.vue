<template>
    <base-form-dialog @onSubmit="onSubmit" :title="dialogTitle" :data="post"></base-form-dialog>
</template>

<script>
import BaseFormDialog from "../components/BaseFormDialog.vue";
import { mapGetters } from 'vuex';

export default {
    name: "Edit",
    components: { BaseFormDialog },
    data: () => ({
      dialogTitle: "Edit Post",
      post: {
        title: "",
        body: "",
      },
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