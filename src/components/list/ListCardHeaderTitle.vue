<template>
  <v-card-title
      @click="isTextFieldVisible = true"
      :class="[ isTextFieldVisible ? 'pa-0' : 'pa-1', 'ml-1', 'mr-1', 'list__header', 'fill-width']"
  >
    <span
        class="list__title"
        v-if="!isTextFieldVisible"
    >
      {{ listTitle }}
    </span>
    <v-text-field
        v-else
        autofocus
        outlined
        dense
        single-line
        hide-details
        v-model="listTitle"
        background-color="grey lighten-4"
        color="grey lighten-1"
        @focus="$event.target.select()"
        @keyup.esc="hideTextField"
        @keyup.enter="hideTextField"
        v-click-outside="hideTextField"
    />
  </v-card-title>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ListCardHeaderTitle',
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      listTitle: this.list.title,
      isTextFieldVisible: false
    }
  },
  watch: {
    listTitle (newVal, oldVal) {
      if (this.isEmptyString(newVal)) {
        this.listTitle = oldVal
        return
      }

      this.updateListTitle({ listId: this.list.id, newTitle: newVal })
    },
    dragging (newValue) {
      if (newValue === true) {
        this.hideTextField()
      }
    }
  },
  methods: {
    isEmptyString(string) {
      return string.replace(/\s/g, '').length === 0
    },
    hideTextField () {
      this.isTextFieldVisible = false
    },
    ...mapActions('boards', ['updateListTitle'])
  },
  computed: {
    ...mapGetters('draggable', ['dragging'])
  }
}
</script>

<style scoped>
.list__header {
  cursor: pointer;
}

.list__title {
  font-size: 16px;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none
}
</style>
