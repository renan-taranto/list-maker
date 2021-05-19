<template>
  <v-progress-linear
      v-if="loading"
      indeterminate
      color="primary"
      rounded
      fixed
      height="2"
  />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppLoadingProgress',
  computed: {
    ...mapGetters('app', ['loading'])
  }
}
</script>
