<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn color="primary" @click="addNewUser">Agregar Usuario</v-btn>
        <v-btn color="secondary" @click="logout">Cerrar Sesión</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="users"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editUser(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="confirmDeleteUser(item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <UserFormDialog
      v-model="showUserFormDialog"
      :userToEdit="selectedUser"
      @user-added="handleUserAdded"
      @user-updated="handleUserUpdated"
    />

    <DeleteConfirmDialog
      v-model="showConfirmDeleteDialog"
      :userToDelete="selectedUser"
      @confirm-delete="handleUserDeleted"
    />
  </v-container>
</template>

<script>
import UserService from '@/services/UserService';
import UserFormDialog from '@/components/UserFormDialog.vue';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog.vue';

export default {
  components: {
    UserFormDialog,
    DeleteConfirmDialog
  },
  data() {
    return {
      users: [],
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Nombre', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      showUserFormDialog: false,
      showConfirmDeleteDialog: false,
      selectedUserId: null,
      selectedUser: null,
    };
  },
  methods: {
    fetchUsers() {
      UserService.getAllUsers()
        .then(response => {
          this.users = response.data;
        })
        .catch(error => console.error("Error al obtener los usuarios:", error));
    },
    editUser(user) {
      this.selectedUser = user;
      this.showUserFormDialog = true;
    },
    addNewUser() {
      this.selectedUserId = null;
      this.selectedUser = null;
      this.showUserFormDialog = true;
    },
    confirmDeleteUser(user) {
      this.selectedUser = user;
      this.showConfirmDeleteDialog = true;
    },
    handleUserDeleted() {
      if (!this.selectedUser) return;

      UserService.deleteUser(this.selectedUser.id)
        .then(() => {
          this.showConfirmDeleteDialog = false;
          this.fetchUsers();
        })
        .catch(error => {
          console.error("Error al eliminar el usuario:", error);
        });
    },
    logout() {
      UserService.logout();
      this.$router.replace({ name: 'Login' });
    },
    handleUserAdded() {
      this.fetchUsers();
      this.showUserFormDialog = false;
      console.log("Nuevo usuario agregado");
    },
    handleUserUpdated() {
      this.fetchUsers();
      this.showUserFormDialog = false;
      console.log("Usuario actualizado");
    }
  },
  mounted() {
    this.fetchUsers();
    console.log(this.headers);
  }
};
</script>
