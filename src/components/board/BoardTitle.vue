<template>
  <div class="title ml-5">
    <span
      v-if="!isTextFieldVisible"
      class="title__span text-h6"
      @click="isTextFieldVisible = true"
    >
      {{ boardTitle }}
    </span>
    <v-text-field
        v-else
        autofocus
        outlined
        dense
        single-line
        hide-details
        v-model="boardTitle"
        background-color="grey lighten-4"
        color="grey lighten-1"
        @focus="$event.target.select()"
        @keyup.esc="hideTextField"
        @keyup.enter="hideTextField"
        v-click-outside="hideTextField"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'BoardTitle',
  props: {
    board: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      boardTitle: this.board.title,
      isTextFieldVisible: false
    }
  },
  methods: {
    ...mapActions('boards', ['updateBoardTitle']),
    isEmptyString(string) {
      return string.replace(/\s/g, '').length === 0
    },
    hideTextField() {
      this.isTextFieldVisible = false
    }
  },
  watch: {
    boardTitle (newVal, oldVal) {
      if (this.isEmptyString(newVal)) {
        this.boardTitle = oldVal
        return
      }

      this.updateBoardTitle({ boardId: this.board.id, newTitle: newVal })
    },
  }
}
</script>

<style scoped>
.title {
  max-width: 50%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.title__span {
  cursor: pointer;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none
}
</style>
