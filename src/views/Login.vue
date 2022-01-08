<template>
    <q-dialog v-model="getModalLogin">
      <q-card class="q-pt-lg q-pb-lg q-pl-xl q-pr-xl">
          <q-card-section>
            <div class="text-h6">Login</div>
          </q-card-section>

          <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md">
            <q-card-section style="max-height: 50vh" class="scroll">
            <q-input
              v-model="user.userId"
              type="number"
              label="User Id"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'User Id harus diisi']"
            />

            <q-input
              type="email"
              v-model="user.email"
              label="Email"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Email harus diisi']"
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
import { mapGetters } from 'vuex'
export default {
  name: "Login",
  data: () => ({
    user: {
      userId: null,
      email: "",
    }
  }),
  computed: {
    ...mapGetters(["getModalLogin"]),
  },
  methods: {
    onSubmit() {
      let data = {
        userId: parseInt(this.user.userId),
        email: this.user.email
      };
      this.$store.dispatch("login", data);
    },
    onReset() {
      this.user = {};
    }
  },
  created() {
    this.$store.commit("setModalLogin", true);
  }
}
</script>