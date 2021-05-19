<template>
  <v-container fluid>
    <PageHeader>
      <v-row :justify="'space-between'" :align="'start'">
        <div class="text-h6 ml-5">Boards</div>
        <v-btn
            class="white--text mr-10"
            text
            small
            outlined
            color="grey darken-1"
            @click="isMenuVisible = true"
        >
          <v-icon left>mdi-menu</v-icon>
          Menu
        </v-btn>
      </v-row>
    </PageHeader>

    <BoardsMenu
        :is-menu-visible="isMenuVisible"
        @menu-closed="isMenuVisible = false"
    />

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
import BoardsMenu from '@/components/board/BoardsMenu'
import PageHeader from '@/components/layout/PageHeader'
import BoardsOverviewEventSource from '@/services/event-source/boards-overview'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'BoardsView',
  components: {
    BoardCreationCard,
    BoardCard,
    BoardsMenu,
    PageHeader
  },
  data () {
    return {
      isMenuVisible: false,
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
