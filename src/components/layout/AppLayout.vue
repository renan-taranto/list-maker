<template>
  <v-app>
    <AppHeader>
      <template v-slot:subheader>
        <router-view name="subheader"/>
      </template>
    </AppHeader>
    <v-main class="main-content overflow-x-auto" v-dragscroll:nochilddrag="{ target: '.v-main__wrap' }">
      <AppLoadingProgress/>
      <AppErrorDialog/>
      <router-view name="main"/>
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader'
import AppLoadingProgress from '@/components/layout/AppLoadingProgress'
import AppErrorDialog from '@/components/layout/AppErrorDialog'

export default {
  name: 'AppLayout',
  components: {
    AppHeader,
    AppLoadingProgress,
    AppErrorDialog
  }
}
</script>

<style scoped>
.main-content {
  background: #F5F5F5;
}
</style>
