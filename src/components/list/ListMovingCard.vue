<template>
  <v-card
      width="250"
      elevation="0"
  >
    <v-select
        label="Board"
        dense
        outlined
        item-color="grey lighten-1"
        color="grey lighten-1"
        class="pb-0"
        v-model="targetBoard"
        :items="openBoards"
        item-text="title"
        @change="changeTargetBoardHandler"
        return-object
    />
    <v-select
        label="Position"
        dense
        outlined
        item-color="grey lighten-1"
        color="grey lighten-1"
        class="pt-0"
        v-model="targetPosition"
        :items="availablePositions"
    />
    <v-btn
        small
        depressed
        color="green darken-2"
        class="white--text ml-1 mb-2"
        @click="move"
    >
      Move
    </v-btn>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ListMovingCard',
  props: {
    listId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      targetBoard: null,
      availablePositions: null,
      targetPosition: null
    }
  },
  beforeMount () {
    this.targetBoard = this.selectedBoard
    this.updateAvailablePositions()
    this.setDefaultTargetPosition()
  },
  computed: {
    ...mapGetters('boards', [
      'selectedBoard',
      'openBoards',
      'boardOfId',
      'boardListsCount',
      'listIndexByListId'
    ])
  },
  methods: {
    ...mapActions('boards', ['loadBoardOfId', 'moveList']),
    async changeTargetBoardHandler (board) {
      await this.loadBoardOfId(board.id)
      this.targetBoard = this.boardOfId(board.id)
      this.updateAvailablePositions()
      this.setDefaultTargetPosition()
    },
    updateAvailablePositions () {
      const positions = []
      for (let i = 1; i <= this.boardListsCount(this.targetBoard.id); i++) {
        positions.push(i)
      }

      if (this.selectedBoard.id !== this.targetBoard.id) {
        positions.push(positions.length + 1)
      }

      this.availablePositions = positions
    },
    setDefaultTargetPosition () {
      if (this.targetBoard === null) {
        this.targetPosition = null
        return
      }

      this.targetPosition = this.targetBoard.id === this.selectedBoard.id ? this.listIndexByListId(this.listId) + 1 : 1
    },
    move () {
      this.moveList({ listId: this.listId, targetBoardId: this.targetBoard.id, targetIndex: this.targetPosition - 1 })
      this.$emit('list-moved')
    }
  }
}
</script>
