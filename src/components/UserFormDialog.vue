<template>
  <v-dialog v-model="showDialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ isEditMode ? 'Editar Usuario' : 'Agregar Usuario' }}</span>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            label="Nombre"
            v-model="user.name"
            :rules="nameRules"
            required
          ></v-text-field>
          <v-text-field
            label="Correo electrónico"
            v-model="user.email"
            :rules="emailRules"
            required
          ></v-text-field>
          <v-text-field
            label="Contraseña"
            v-model="user.password"
            :type="'password'"
            :rules="passwordRules"
            required
            v-if="!isEditMode"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="emitClose">Cancelar</v-btn>
        <v-btn color="green darken-1" text @click="submitUser">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import UserService from '@/services/UserService';

export default {
  props: {
    modelValue: Boolean,
    userToEdit: Object,
  },
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
      },
      nameRules: [v => !!v || 'El nombre es requerido'],
      emailRules: [v => !!v || 'El correo electrónico es requerido', v => /.+@.+\..+/.test(v) || 'El correo electrónico debe ser válido'],
      passwordRules: [v => !!v || 'La contraseña es requerida', v => v.length >= 8 || 'La contraseña debe tener al menos 8 caracteres'],
    };
  },
  computed: {
    isEditMode() {
      return this.userToEdit != null;
    },
    showDialog: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
  watch: {
    userToEdit: {
      immediate: true,
      deep: true,
      handler(newVal) {
        if (newVal) {
          this.user = { ...newVal };
        } else {
          this.resetForm();
        }
      },
    },
  },
  methods: {
    resetForm() {
      this.user = {
        name: '',
        email: '',
        password: '',
      };
    },
    emitClose() {
      this.$emit('update:modelValue', false);
    },
    submitUser() {
      if (this.isEditMode) {
        UserService.updateUser(this.userToEdit.id, this.user)
          .then(() => {
            this.emitClose();
            this.$emit('user-updated');
          })
          .catch(error => {
            console.error("Error al actualizar el usuario:", error);
          });
      } else {
        UserService.register(this.user)
          .then(() => {
            this.emitClose();
            this.$emit('user-added');
          })
          .catch(error => {
            console.error("Error al agregar el usuario:", error);
          });
      }
    },
  },
};
</script>
