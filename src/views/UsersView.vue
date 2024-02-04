<template>
  <v-container>
    <v-row>
      <v-col class="text-right">
        <v-btn color="primary" @click="activeDialog = 'add'">Agregar Usuario</v-btn>
        <v-btn color="secondary" @click="logout">Cerrar Sesión</v-btn>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="users"
      :loading="loading"
      :items-per-page="10"
      class="elevation-1"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small @click="showEditDialog(item)">mdi-pencil</v-icon>
        <v-icon small @click="showDeleteDialog(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>

    <!-- User Add/Edit Dialog -->
    <UserFormDialog
      :show-dialog="activeDialog === 'add' || activeDialog === 'edit'"
      :is-edit-mode="activeDialog === 'edit'"
      :user-data="selectedUser"
      @close-dialog="closeDialog"
      @submit="fetchUsers"
    ></UserFormDialog>

    <!-- User Delete Confirmation Dialog -->
    <DeleteConfirmDialog
      :show-dialog="activeDialog === 'delete'"
      :user-data="selectedUser"
      @close-dialog="closeDialog"
      @submit="fetchUsers"
    ></DeleteConfirmDialog>
  </v-container>
</template>

<script>
import UserFormDialog from '@/components/UserFormDialog.vue';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog.vue';
import UserService from '@/services/UserService';

export default {
  components: {
    UserFormDialog,
    DeleteConfirmDialog,
  },
  data() {
    return {
      users: [],
      loading: false,
      headers: [
        { text: 'ID', align: 'start', sortable: false, value: 'id' },
        { text: 'Nombre', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      activeDialog: null,
      selectedUser: null,
    };
  },
  methods: {
    fetchUsers() {
      this.loading = true;
      UserService.getAllUsers()
        .then(response => {
          this.users = Array.isArray(response.data) ? response.data : [];
          this.loading = false;
        })
        .catch(error => {
          console.error("Error al obtener usuarios:", error);
          this.users = [];
          this.loading = false;
        });
    },
    showEditDialog(user) {
      this.selectedUser = user;
      this.activeDialog = 'edit';
    },
    showDeleteDialog(user) {
      this.selectedUser = user;
      this.activeDialog = 'delete';
    },
    closeDialog() {
      this.activeDialog = null;
      this.selectedUser = null;
      this.fetchUsers();
    },
    logout() {
      UserService.logout();
      this.$router.push('/');
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>
