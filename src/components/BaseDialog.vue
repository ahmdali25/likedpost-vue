<template>
    <q-dialog v-model="getModal">
      <q-card>
        <q-toolbar class="card-header">
          <q-toolbar-title>
            <span class="text-weight-bold text-h6 text-white">{{ title }}</span>
          </q-toolbar-title>
          <q-btn @click="$router.go(-1)" flat round dense icon="close" color="white" v-close-popup />
        </q-toolbar>

        <slot name="cardSection"></slot>
      </q-card>
    </q-dialog>
</template>

<script>

export default {
    name: "Create",
    props: {
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
}
</script>

<style lang="scss" scoped>
@import '../styles/quasar.scss';

.card-header {
  background-color: $primary;
}
</style>