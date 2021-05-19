<template>
  <div class="text-center">
    <v-dialog
        v-model="hasError"
        width="400"
    >
      <v-card
          class="mx-auto"
          max-width="400"
      >
        <v-container class="pa-0 overflow-x-hidden">
          <v-row
              justify="center"
              class="pa-2"
              no-gutters
          >
            <v-icon
                color="red darken-2"
                x-large
            >
              mdi-alert
            </v-icon>
          </v-row>
          <v-row justify="center">
            <span class="text-h5 grey--text text--darken-2">Oh Snap!</span>
          </v-row>
          <v-row
              height="500"
              justify="center"
              class="card__message grey--text text--darken-2"
          >
            <span>{{ errorMessage }}</span>
          </v-row>
          <v-row
              align="center"
              justify="center"
              class="pa-0 ma-0"
          >
            <v-btn
                text
                @click="clearError"
                color="white"
                large
                class="pa-0 red darken-2 fill-width"
            >
              Dismiss
            </v-btn>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AppErrorDialog',
  data () {
    return {
      isVisible: true
    }
  },
  computed: {
    ...mapGetters('app', ['errorMessage']),
    hasError () {
      return this.errorMessage !== null
    }
  },
  methods: {
    ...mapActions('app', ['clearError'])
  }
}
</script>

<style scoped>
.card__message {
  padding: 10px 30px 10px 30px;
}
</style>
