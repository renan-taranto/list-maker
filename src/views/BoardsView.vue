<template>
  <v-container fluid>
    <v-row :justify="'space-between'" :align="'center'">
      <div class="text-h6 ml-5">Boards</div>
      <v-btn
          v-if="closedBoards.length > 0"
          x-small
          text
          class="mr-5"
      >
        view closed boards
      </v-btn>
    </v-row>
    <div
        v-if="openBoards.length === 0"
        class="text-caption pa-2"
    >
      Create your first board to start:
    </div>
    <v-row>
      <v-col
          v-for="board in openBoards"
          :key="board.id"
          cols="12"
          sm="4"
          md="3"
          lg="2"
      >
        <BoardCard :board="board"></BoardCard>
      </v-col>
      <v-col
          cols="12"
          sm="4"
          md="3"
          lg="2"
          class="pa-3"
      >
        <BoardCreationCard/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BoardCreationCard from '@/components/board/BoardCreationCard'
import BoardCard from '@/components/board/BoardCard'
import { mapGetters } from 'vuex'

export default {
  name: "BoardsView",
  components: {
    BoardCreationCard,
    BoardCard
  },
  computed: {
    ...mapGetters('boards', ['openBoards', 'closedBoards'])
  }
}
</script>

<style scoped>
.row__btn-close {
  min-height: 20px;
}
</style>
