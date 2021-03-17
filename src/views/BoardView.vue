<template>
  <v-container
      v-if="board"
      fluid
  >
    <v-row :justify="'space-between'" :align="'center'">
      <div class="text-h6 ml-5">{{ board.title }}</div>
      <BoardMenu class="mr-5" :board-id="boardId"/>
    </v-row>
    <draggable
        :list="board.lists"
        group="lists"
        filter=".item-creation"
        :prevent-on-filter="false"
        :animation="150"
        class="row row--dense flex-nowrap pt-2"
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
        <ListCreationButton :board-id="boardId"/>
      </v-col>
    </draggable>
  </v-container>
</template>

<script>
import draggable from 'vuedraggable'
import BoardMenu from '@/components/board/BoardMenu'
import ListCard from '@/components/list/ListCard'
import ListCreationButton from '@/components/list/ListCreationButton'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "BoardView",
  components: {
    draggable,
    BoardMenu,
    ListCard,
    ListCreationButton
  },
  props: {
    boardId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      board: null
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
