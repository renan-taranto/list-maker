<template>
  <div
      class="title"
      @click="isTextFieldVisible = true"
  >
    <span
        v-if="!isTextFieldVisible"
        class="headline title__span text--unselectable"
    >
      {{ item.title }}
    </span>

    <v-text-field
        v-else
        autofocus
        outlined
        dense
        full-width
        single-line
        hide-details
        v-model="itemTitle"
        background-color="grey lighten-4"
        color="grey lighten-1"
        @focus="$event.target.select()"
        @keyup.esc="isTextFieldVisible = false"
        @keyup.enter="save"
        v-click-outside="save"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { stringMixin } from '@/mixins/stringMixin'

export default {
  name: 'ItemDialogTitle',
  mixins: [stringMixin],
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      itemTitle: this.item.title,
      isTextFieldVisible: false
    }
  },
  methods: {
    ...mapActions('boards', ['updateItemTitle']),
    save () {
      this.isTextFieldVisible = false

      if (!this.itemTitle || this.isEmptyString(this.itemTitle)) {
        this.itemTitle = this.item.title
        return
      }

      if (this.item.title !== this.itemTitle) {
        this.updateItemTitle({ itemId: this.item.id, newTitle: this.itemTitle })
      }
    }
  },
  watch: {
    'item.title' (val) {
      this.itemTitle = val
    }
  }
}
</script>

<style scoped>
.title {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.title__span {
  cursor: pointer;
}

.v-input {
  font-size: 1.1em;
}
</style>
