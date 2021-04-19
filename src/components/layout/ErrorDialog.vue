<template>
  <div class="text-center">
    <v-dialog
        v-model="isVisible"
        width="500"
    >
      <v-card
          class="mx-auto"
          max-width="500"
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
            <span>{{ message }}</span>
          </v-row>
          <v-row
              align="center"
              justify="center"
              class="pa-0 ma-0"
          >
            <v-btn
                text
                @click="isVisible = false"
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
export default {
  name: 'ErrorDialog',
  props: {
    show: {
      type: Boolean,
      default: false,
      required: true
    },
    message: {
      type: String,
      default: 'An error has occurred.'
    }
  },
  computed: {
    isVisible: {
      get () {
        return this.show
      },
      set (value) {
        if (value === false) {
          this.$emit('dialogClose')
        }
      }
    }
  }
}
</script>

<style scoped>
.card__message {
  padding: 10px 30px 10px 30px;
}
</style>
