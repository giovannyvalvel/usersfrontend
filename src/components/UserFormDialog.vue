<template>
  <v-dialog :value="showDialog" @input="$emit('update:showDialog', $event)" persistent max-width="600px">
    <v-card>
      <v-card-title>
        {{ isEditMode ? 'Editar Usuario' : 'Agregar Usuario' }}
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="user.name"
              :rules="nameRules"
              label="Nombre"
              required
            ></v-text-field>
            <v-text-field
              v-model="user.email"
              :rules="emailRules"
              label="Email"
              required
            ></v-text-field>
            <v-text-field
              v-model="user.password"
              :rules="passwordRules"
              label="Contraseña"
              type="password"
              required
            ></v-text-field>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
        <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    showDialog: Boolean,
    isEditMode: Boolean,
    userData: Object,
  },
  data() {
    return {
      valid: false,
      user: {
        name: '',
        email: '',
        password: '',
      },
      nameRules: [
        v => !!v || 'El nombre es requerido',
        v => v && v.length <= 25 || 'El nombre no puede exceder de 25 caracteres',
      ],
      emailRules: [
        v => !!v || 'El email es requerido',
        v => /.+@.+\..+/.test(v) || 'El email debe ser válido',
      ],
      passwordRules: [
        v => !!v || 'La contraseña es requerida',
        v => v && v.length >= 6 || 'La contraseña debe tener al menos 6 caracteres',
      ],
    };
  },
  watch: {
    userData: {
      handler(newVal) {
        this.user = newVal ? { ...newVal } : { name: '', email: '', password: '' };
        if (this.showDialog) {
          this.$nextTick(() => {
            if (this.$refs.form) {
              this.$refs.form.resetValidation();
            }
          });
        }
      },
      immediate: true,
    },
  },
  methods: {
    save() {
      if (this.$refs.form.validate()) {
        this.$emit('submit', { ...this.user });
        this.close();
      }
    },
    close() {
      this.$emit('update:showDialog', false);
    },
    resetForm() {
      this.user = { name: '', email: '', password: '' };
      if (this.showDialog) {
        this.$nextTick(() => {
          if (this.$refs.form) {
            this.$refs.form.resetValidation();
          }
        });
      }
    },
  },
};
</script>
