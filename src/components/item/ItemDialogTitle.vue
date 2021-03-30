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
        single-line
        hide-details
        v-model="itemTitle"
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
    hideTextField () {
      this.isTextFieldVisible = false
    }
  },
  watch: {
    itemTitle(newVal, oldVal) {
      if (this.isEmptyString(newVal)) {
        this.itemTitle = oldVal
        return
      }

      this.updateItemTitle({ itemId: this.item.id, newTitle: newVal })
    }
  }
}
</script>

<style scoped>
.title {
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.title__span {
  cursor: pointer;
}
</style>
