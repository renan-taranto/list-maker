<template>
  <v-app>
    <AppHeader/>
    <v-main class="main-content overflow-x-auto" v-dragscroll:nochilddrag="{ target: '.v-main__wrap' }">
      <AppLoadingProgress/>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader'
import AppLoadingProgress from '@/components/layout/AppLoadingProgress'

export default {
  name: 'AppLayout',
  components: {
    AppHeader,
    AppLoadingProgress
  }
}
</script>

<style scoped>
.main-content {
  background: #F5F5F5;
}
</style>
