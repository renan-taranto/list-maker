<template>
  <v-container class="text-center">
    <v-row class="align-center">
      <v-col class="ma-16">
          <div class="text-h4 primary--text">Whoops, 404</div>
          <div>The page you were looking for does not exist</div>
          <v-btn
              outlined
              class="ma-5"
              color="primary"
              to="/"
          >
            Back to home
          </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "NotFoundView"
}
</script>

<style scoped>

</style>
