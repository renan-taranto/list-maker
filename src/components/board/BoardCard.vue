<template>
  <v-card
      height="80"
      outlined
      class="card"
      :disabled="board.loading"
      :to="`/board/${board.id}`"
  >
    <div
        v-if="board.loading"
        class="d-flex justify-center align-center fill-height fill-width card__loading-overlay"
    >
      <v-progress-circular
          indeterminate
          width="1"
          color="primary"
      />
    </div>
    <v-card-title class="ma-0 pa-2 d-flex justify-space-between">
          <span class="subtitle-1 font-weight-medium text-truncate card__title">
            {{ board.title }}
          </span>
    </v-card-title>
  </v-card>
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

.card__loading-overlay {
  position: absolute;
  background: rgba(245, 245, 245, 0.50)
}
</style>
