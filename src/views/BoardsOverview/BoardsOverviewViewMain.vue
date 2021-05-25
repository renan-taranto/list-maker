<template>
  <v-container fluid>
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
import BoardsOverviewEventSource from '@/services/event-source/boards-overview'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'BoardsOverviewViewMain',
  components: {
    BoardCreationCard,
    BoardCard
  },
  data () {
    return {
      eventSource: null
    }
  },
  mounted () {
    this.eventSource = BoardsOverviewEventSource.create()
    this.loadBoardsOverview()
  },
  destroyed () {
    this.eventSource.close()
  },
  computed: {
    ...mapGetters('boards', ['openBoards'])
  },
  methods: {
    ...mapActions('boards', ['loadBoardsOverview'])
  }
}
</script>
