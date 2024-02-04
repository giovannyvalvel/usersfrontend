<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>usersfrontend</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* Estilos adicionales si son necesarios */
</style>
