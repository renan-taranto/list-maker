<template>
  <a
      href=""
      class="text-decoration-none"
  >
    <v-card
        height="80"
        outlined
        class="card"
        :to="`/board/${board.id}`"
    >
      <v-card-title class="ma-0 pa-2 d-flex justify-space-between">
          <span class="subtitle-1 font-weight-medium text-truncate card__title">
            {{ board.title }}
          </span>
      </v-card-title>
    </v-card>
  </a>
</template>

<script>
export default {
  name: 'BoardCard',
  props: {
    board: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.card {
  background: linear-gradient(to right, var(--v-primary-base) 4px, white 0);
  border-color: lightgrey;
}

.card:hover {
  background: var(--v-primary-base);
  border-color: whitesmoke;
  transition: all 500ms;
}

.card:hover .card__title {
  color: white;
  transition: color 200ms;
}
</style>
