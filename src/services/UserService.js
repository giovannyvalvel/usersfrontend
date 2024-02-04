import axios from 'axios';

// La URL base de la API del backend
const API_URL = 'http://192.168.100.55/api/users/';

// Función auxiliar para obtener el header de autorización con el token JWT
function authHeader() {
  const userSession = JSON.parse(localStorage.getItem('userSession'));

  if (userSession && userSession.token) {
    return { Authorization: 'Bearer ' + userSession.token };
  } else {
    return {};
  }
}

const UserService = {
  // Registro de usuario
  register(userData) {
    return axios.post(API_URL + 'register', userData);
  },

  // Login de usuario
  login(userData) {
    return axios.post(API_URL + 'login', userData).then(response => {
      if (response.data.token) {
        // Si se recibe un token, se guarda en localStorage
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    });
  },

  // Obtener todos los usuarios
  getAllUsers() {
    return axios.get(API_URL, { headers: authHeader() });
  },

  // Obtener un usuario por su ID
  getUserById(userId) {
    return axios.get(API_URL + userId, { headers: authHeader() });
  },

  // Actualizar un usuario
  updateUser(userId, userData) {
    return axios.put(API_URL + userId, userData, { headers: authHeader() });
  },

  // Eliminar un usuario
  deleteUser(userId) {
    return axios.delete(API_URL + userId, { headers: authHeader() });
  },

  // Logout de usuario
  logout() {
    // Se elimina el usuario del localStorage para "cerrar la sesión"
    localStorage.removeItem('user');
  }
};

export default UserService;
