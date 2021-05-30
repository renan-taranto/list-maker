<template>
  <div class="title ml-7">
    <span
      v-if="!isTextFieldVisible"
      class="title__span text-h6 text--unselectable"
      @click="isTextFieldVisible = true"
    >
      {{ selectedBoard.title }}
    </span>
    <v-text-field
        v-else
        autofocus
        outlined
        dense
        single-line
        hide-details
        v-model="title"
        background-color="grey lighten-4"
        color="grey lighten-1"
        @focus="$event.target.select()"
        @keyup.enter="updateTitle"
        @keyup.esc="cancel"
        v-click-outside="cancel"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { stringMixin } from '@/mixins/stringMixin'

export default {
  name: 'BoardTitle',
  mixins: [stringMixin],
  data () {
    return {
      isTextFieldVisible: false,
      tempTitle: null
    }
  },
  mounted () {
    this.tempTitle = this.selectedBoard.title
  },
  computed: {
    ...mapGetters('boards', ['selectedBoard']),
    title: {
      set (value) {
        this.tempTitle = value
      },
      get () {
        return this.selectedBoard.title
      }
    }
  },
  methods: {
    ...mapActions('boards', ['changeBoardTitle']),
    updateTitle () {
      if (this.isEmptyString(this.tempTitle)) {
        this.cancel()
        return
      }

      this.changeBoardTitle({ boardId: this.selectedBoard.id, newTitle: this.tempTitle })
      this.hideTextField()
    },
    cancel () {
      this.tempTitle = this.selectedBoard.title
      this.hideTextField()
    },
    hideTextField () {
      this.isTextFieldVisible = false
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
