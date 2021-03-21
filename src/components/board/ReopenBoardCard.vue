<template>
  <div>
    <v-card
        v-for="board in closedBoards"
        :key="board.id"
        class="d-flex align-center justify-space-between ma-2 pl-2 pr-2"
        outlined
    >
      <div class="grey--text text--darken-1">
        {{ board.title }}
      </div>
      <v-btn
          x-small
          icon
          color="green"
          @click="reopenBoard(board.id)"
      >
        <v-icon>mdi-restore</v-icon>
      </v-btn>
    </v-card>

    <v-alert
        v-if="closedBoards.length === 0"
        dense
        text
        type="info"
        color="grey darken-2"
        class="text-caption"
    >
      There are no closed boards
    </v-alert>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'ReopenBoardCard',
  computed: {
    ...mapGetters('boards', ['closedBoards'])
  },
  methods: {
    ...mapActions('boards', ['reopenBoard'])
  }
}
</script>
