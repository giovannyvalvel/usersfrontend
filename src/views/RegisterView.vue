<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title>Registro de usuario</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="register">
              <v-text-field
                v-model="name"
                label="Nombre"
                :rules="nameRules"
                required
              ></v-text-field>
              <v-text-field
                v-model="email"
                label="Email"
                :rules="emailRules"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Contraseña"
                type="password"
                :rules="passwordRules"
                required
              ></v-text-field>
              <v-btn type="submit" color="success">Registrarse</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserService from '@/services/UserService';

export default {
  name: 'RegisterView',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      nameRules: [
        v => !!v || 'El nombre es requerido',
        v => (v && v.length <= 50) || 'El nombre no debe exceder de 50 caracteres',
      ],
      emailRules: [
        v => !!v || 'El email es requerido',
        v => /.+@.+\..+/.test(v) || 'Debe ser un email válido',
      ],
      passwordRules: [
        v => !!v || 'La contraseña es requerida',
        v => (v && v.length >= 8) || 'La contraseña debe tener al menos 8 caracteres',
      ],
    };
  },
  methods: {
    register() {
      const userData = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      
      UserService.register(userData)
        .then(() => {
          this.$router.push('/');
          this.$emit('registered');
        })
        .catch(error => {
          console.error('Error al registrar el usuario:', error);
        });
    },
  },
};
</script>
