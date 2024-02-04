<template>
  <v-dialog :value="showDialog" @update:dialog="updateDialog" persistent max-width="300px">
    <v-card>
      <v-card-title class="text-h5">Confirmar Eliminación</v-card-title>
      <v-card-text>¿Estás seguro de que deseas eliminar este usuario?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey" text @click="close">Cancelar</v-btn>
        <v-btn color="red" text @click="confirmDelete">Eliminar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import UserService from '@/services/UserService';

export default {
  props: {
    showDialog: {
      type: Boolean,
      required: true
    },
    userData: {
      type: Object,
      required: true
    }
  },
  methods: {
    close() {
      this.$emit('update:showDialog', false);
    },
    confirmDelete() {
      UserService.deleteUser(this.userData.id)
        .then(() => {
          this.$emit('user-deleted');
          this.close();
        })
        .catch(error => {
          console.error("Error al eliminar el usuario:", error);
        });
    },
    updateDialog(value) {
      this.$emit('update:showDialog', value);
    }
  }
};
</script>
