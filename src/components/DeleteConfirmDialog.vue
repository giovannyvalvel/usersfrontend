<template>
  <v-dialog v-model="showDialog" persistent max-width="300px">
    <v-card>
      <v-card-title class="text-h5">Confirmar Eliminación</v-card-title>
      <v-card-text>¿Estás seguro de que deseas eliminar este usuario?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
        <v-btn color="red" text @click="confirmDelete">Eliminar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    modelValue: Boolean,
    userToDelete: Object,
  },
  computed: {
    showDialog: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  },
  methods: {
    close() {
      this.$emit('update:modelValue', false);
    },
    confirmDelete() {
      this.$emit('confirm-delete', this.userToDelete);
      this.showDialog = false;
    },
    updateDialog(value) {
      this.$emit('update:showDialog', value);
    }
  }
};
</script>
