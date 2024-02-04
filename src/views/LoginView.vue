<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title>Iniciar sesión</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
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
              <v-btn type="submit" color="primary">Iniciar sesión</v-btn>
              <v-btn text @click="register">Registrarse</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserService from '@/services/UserService';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginView',
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      email: '',
      password: '',
      emailRules: [
        v => !!v || 'El email es requerido',
        v => /.+@.+\..+/.test(v) || 'El email debe ser válido',
      ],
      passwordRules: [
        v => !!v || 'La contraseña es requerida',
        v => v.length >= 1 || 'La contraseña debe tener al menos 1 caracter',
      ],
    };
  },
  methods: {
    login() {
      UserService.login({ email: this.email, password: this.password })
        .then(response => {
          localStorage.setItem('userSession', JSON.stringify(response));
          this.$router.push('/users');
        })
        .catch(error => {
          console.error('Error de autenticación:', error);
        });
    },
    register() {
      window.open('/register', '_blank');
    }
  },
};
</script>
