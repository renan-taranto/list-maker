<template>
  <v-container
      v-if="board"
      fluid
  >
    <PageHeader>
      <v-row :justify="'space-between'" :align="'start'">
        <BoardTitle :board="board"/>
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

    <BoardMenu
        :is-menu-visible="isMenuVisible"
        :board-id="boardId"
        @menu-closed="isMenuVisible = false"
    />

    <draggable
        :list="board.lists"
        group="lists"
        filter=".item-creation"
        :prevent-on-filter="false"
        :animation="150"
        class="row row--dense flex-nowrap"
        ghost-class="lists--ghost"
        chosen-class="lists--chosen"
        force-fallback="true"
        @start="dragStarted"
        @end="dragStopped"
        draggable=".list"
    >
      <v-col
          v-for="list in board.lists"
          :key="list.id"
          class="fill-height pa-0 ml-3 list"
          cols="auto"
      >
        <ListCard :list-id="list.id"></ListCard>
      </v-col>
      <v-col class="pa-0 ml-3">
        <ListCreationButtons :board-id="boardId"/>
      </v-col>
    </draggable>
  </v-container>
</template>

<script>
import draggable from 'vuedraggable'
import PageHeader from '@/components/layout/PageHeader'
import BoardMenu from '@/components/board/BoardMenu'
import BoardTitle from '@/components/board/BoardTitle'
import ListCard from '@/components/list/ListCard'
import ListCreationButtons from '@/components/list/ListCreationButtons'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "BoardView",
  components: {
    draggable,
    PageHeader,
    BoardMenu,
    BoardTitle,
    ListCard,
    ListCreationButtons
  },
  props: {
    boardId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      board: null,
      isMenuVisible: false
    }
  },
  mounted() {
    this.board = this.boardOfId(this.boardId)
    if (typeof this.board !== "object") {
      this.$router.push({ name: 'NotFound' })
    }

    this.selectBoard(this.boardId)
  },
  computed: {
    ...mapGetters('boards', ['boardOfId'])
  },
  methods: {
    ...mapActions('boards', ['selectBoard']),
    ...mapActions('draggable', ['dragStarted', 'dragStopped'])
  }
}
</script>

<style scoped>
.lists--ghost {
  visibility: hidden;
}

.lists--chosen {
  opacity: 1 !important;
}
</style>
