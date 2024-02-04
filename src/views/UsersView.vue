<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn color="primary" @click="showUserFormDialog = true">Agregar Usuario</v-btn>
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
            <v-icon small class="mr-2" @click="editUser(item.id)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="confirmDeleteUser(item.id)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserService from '@/services/UserService';

export default {
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
      selectedUserId: null,
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
    editUser(userId) {
      this.selectedUserId = userId;
      this.showUserFormDialog = true;
    },
    confirmDeleteUser(userId) {
      console.log(userId);
    },
    deleteUser(userId) {
      UserService.deleteUser(userId)
        .then(() => {
          this.fetchUsers();
        })
        .catch(error => console.error("Error al eliminar el usuario:", error));
    },
    logout() {
      UserService.logout();
      this.$router.replace({ name: 'Login' });
    },
  },
  mounted() {
    this.fetchUsers();
    console.log(this.headers);
  }
};
</script>
