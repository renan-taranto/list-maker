<template>
  <v-row
      v-if="board"
      :justify="'space-between'"
      :align="'start'"
  >
    <BoardTitle :board="board"/>
    <v-btn
        class="white--text mr-7"
        text
        small
        outlined
        color="grey darken-1"
        @click="isMenuVisible = true"
    >
      <v-icon left>mdi-menu</v-icon>
      Menu
    </v-btn>

    <BoardMenu
        :is-menu-visible="isMenuVisible"
        :board-id="boardId"
        @menu-closed="isMenuVisible = false"
    />
  </v-row>
</template>

<script>
import BoardMenu from '@/components/board/BoardMenu'
import BoardTitle from '@/components/board/BoardTitle'
import { mapGetters } from 'vuex'

export default {
  name: 'BoardViewHeader',
  components: {
    BoardMenu,
    BoardTitle
  },
  props: {
    boardId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isMenuVisible: false
    }
  },
  computed: {
    ...mapGetters('boards', ['boardOfId']),
    board () {
      return this.boardOfId(this.boardId)
    }
  }
}
</script>

<style scoped>

</style>
