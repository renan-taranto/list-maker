<template>
  <v-container
      v-if="board"
      fluid
  >
    <div class="text-h6 pa-2">{{ board.title }}</div>
    <draggable
        :list="board.lists"
        group="lists"
        filter=".list__footer"
        :prevent-on-filter="false"
        class="row row--dense flex-nowrap lists"
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
        <ListOfItems :list-id="list.id"></ListOfItems>
      </v-col>
    </draggable>
  </v-container>
</template>

<script>
import draggable from 'vuedraggable'
import ListOfItems from '@/components/list/ListOfItems'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "BoardView",
  components: {
    draggable,
    ListOfItems
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
  },
  computed: {
    ...mapGetters('boards', ['boardOfId'])
  },
  methods: {
    ...mapActions('draggable', ['dragStarted', 'dragStopped'])
  }
}
</script>

<style scoped>
.lists {
  padding-top: 32px;
}

.lists--ghost {
  visibility: hidden;
}

.lists--chosen {
  opacity: 1 !important;
}
</style>
