<template>
    <q-dialog v-model="getDialogDelete">
      <q-card class="q-pt-lg q-pb-lg q-pl-xl q-pr-xl">
          <q-card-section>
            <div class="text-h6">Delete Post</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <p class="text-h6">Apa kamu yakin ingin menghapus data ini ?</p>
						<strong>{{ data.title }}</strong>
					</q-card-section>

					<q-card-actions align="right">
            <q-btn @click="hideDeleteDialog" label="Cancel" color="white" text-color="black" padding="xs lg" no-caps v-close-popup />
            <q-btn @click="handleDelete(data.id)" label="Delete" color="red" padding="xs lg" no-caps v-close-popup />
          </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script>

export default {
  name: "Login",
	props: ["data"],
  computed: {
     getDialogDelete: {
      get() {
        return this.$store.state.dialogDelete;
      },
      set(v) {
        this.$store.commit("setModalDelete", v);
      },
    },
  },
	methods: {
		handleDelete(id) {
			this.$store.dispatch("deletePostById", id);
		},
    hideDeleteDialgo() {
      this.getDialogDelete = false;
    }
	}
}
</script>