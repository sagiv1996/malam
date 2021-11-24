<template lang="pug">
  v-app
    v-app-bar( app)
      v-switch( v-model="$vuetify.theme.dark" append-icon="mdi-theme-light-dark" hint="dark mode" persistent-hint)
    v-main
      v-container
        nuxt( keep-alive)
</template>
