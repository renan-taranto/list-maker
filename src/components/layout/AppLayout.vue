<template>
  <v-app>
    <AppHeader/>
    <v-main class="main-content overflow-x-auto">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from './AppHeader'

export default {
  name: 'AppLayout',
  components: {
    AppHeader
  }
}
</script>

<style scoped>
.main-content {
  background: #F5F5F5;
}
</style>
