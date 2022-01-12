<template>
    <q-dialog v-model="getModal">
      <q-card class="card">
        <q-toolbar class="card-header">
          <q-toolbar-title>
            <span class="text-capitalize text-weight-bold text-h6 text-white">{{ title }}</span>
          </q-toolbar-title>
          <q-btn @click="$router.go(-1)" flat round dense icon="close" color="white" v-close-popup />
        </q-toolbar>

        <q-card-section>
          <q-form
            ref="myForm"
            @submit="$emit('onSubmit')"
            @reset="$emit('onReset')"
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
              />
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
</template>

<script>
import BaseInput from "./BaseInput.vue";

export default {
    name: "Create",
    components: { BaseInput },
    data: () => ({
      post: {},
      titleRules: [val => val && val.length > 0 || 'Title harus diisi'],
      bodyRules: [val => val && val.length > 0 || 'Body harus diisi']
    }),
    props: {
      data: {
        type: Object,
        required: true
      },
      title: {
        type: String,
        required: true
      },
    },
    computed: {
      getModal: {
        get() {
          return this.$store.state.dialog;
        },
        set(v) {
          this.$store.commit("setModal", v);
        },
      },
    },
    created() {
      this.post = this.data;
    }
}
</script>

<style lang="scss" scoped>
@import '../styles/quasar.scss';

.card {
  min-width: 400px;
  max-height: 500px;

  .card-header {
    background-color: $primary;
  }
}
</style>