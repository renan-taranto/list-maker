<template>
  <div class="title ml-5">
    <span
      v-if="!isTextFieldVisible"
      class="title__span text-h6 text--unselectable"
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
import { stringMixin } from '@/mixins/stringMixin'

export default {
  name: 'BoardTitle',
  mixins: [stringMixin],
  props: {
    board: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      boardTitle: this.board.title,
      isTextFieldVisible: false,
      updateTimeout: null
    }
  },
  methods: {
    ...mapActions('boards', ['changeBoardTitle']),
    hideTextField () {
      this.isTextFieldVisible = false
    }
  },
  watch: {
    boardTitle (newVal, oldVal) {
      if (this.isEmptyString(newVal)) {
        this.boardTitle = oldVal
        return
      }

      clearTimeout(this.updateTimeout)
      this.updateTimeout = setTimeout(() => {
        this.changeBoardTitle({ boardId: this.board.id, newTitle: newVal })
      }, 1000)
    }
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
}
</style>
