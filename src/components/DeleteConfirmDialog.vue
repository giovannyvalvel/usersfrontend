<template>
  <v-dialog :value="showDialog" persistent max-width="300px">
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
export default {
  props: {
    showDialog: Boolean,
    userData: Object,
  },
  methods: {
    close() {
      this.$emit('update:showDialog', false);
    },
    confirmDelete() {
      this.$emit('submit', this.userData.id);
      this.close();
    },
  },
};
</script>
