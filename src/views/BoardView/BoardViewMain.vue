<template>
  <v-container
      v-if="selectedBoard"
      fluid
  >
    <draggable
        :list="selectedBoard.lists"
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
        @change="changeHandler"
        :scroll-sensitivity="250"
        :scroll-speed="12"
        draggable=".list"
        data-dragscroll
    >
      <v-col
          v-for="list in selectedBoard.lists"
          :key="list.id"
          class="fill-height pa-0 ml-3 list"
          cols="auto"
          data-dragscroll
      >
        <ListCard :list-id="list.id"></ListCard>
      </v-col>
      <v-col
          class="pa-0 ml-3"
          data-dragscroll
      >
        <ListCreationButtons :board-id="boardId"/>
      </v-col>
    </draggable>

    <ItemDialog/>
  </v-container>
</template>

<script>
import BoardsEventSource from '@/services/event-source/boards'
import ListsEventSource from '@/services/event-source/lists'
import draggable from 'vuedraggable'
import ListCard from '@/components/list/ListCard'
import ListCreationButtons from '@/components/list/ListCreationButtons'
import ItemDialog from '@/components/item/ItemDialog'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'BoardViewMain',
  components: {
    draggable,
    ListCard,
    ListCreationButtons,
    ItemDialog
  },
  props: {
    boardId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      eventSources: []
    }
  },
  async mounted () {
    this.eventSources.push(
      BoardsEventSource.create(),
      ListsEventSource.create()
    )

    await this.loadBoardsOverview()
    await this.loadBoardOfId(this.boardId)
    this.selectBoard(this.boardId)
  },
  destroyed () {
    this.eventSources.forEach(e => e.close())
  },
  computed: {
    ...mapGetters('boards', ['boardOfId', 'selectedBoard'])
  },
  methods: {
    ...mapActions('boards', ['loadBoardsOverview', 'loadBoardOfId', 'selectBoard', 'moveList']),
    ...mapActions('draggable', ['dragStarted', 'dragStopped']),
    changeHandler (e) {
      if (Object.prototype.hasOwnProperty.call(e, 'moved')) {
        this.moveList({
          listId: e.moved.element.id,
          targetBoardId: this.boardId,
          targetIndex: e.moved.newIndex
        })
      }
    }
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
