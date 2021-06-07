<template>
  <v-card-title
      @click="isTextFieldVisible = true"
      :class="[ isTextFieldVisible ? 'pa-0' : 'pa-1', 'ml-1', 'mr-1', 'list__header', 'fill-width']"
  >
    <span
        class="list__title text--unselectable"
        v-if="!isTextFieldVisible"
    >
      {{ title }}
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
  </v-card-title>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { stringMixin } from '@/mixins/stringMixin'

export default {
  name: 'ListCardHeaderTitle',
  mixins: [stringMixin],
  props: {
    listId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isTextFieldVisible: false,
      tempTitle: null
    }
  },
  mounted () {
    this.tempTitle = this.title
  },
  computed: {
    ...mapGetters('draggable', ['dragging']),
    ...mapGetters('boards', ['listOfId']),
    title: {
      set (value) {
        this.tempTitle = value
      },
      get () {
        return this.listOfId(this.listId).title
      }
    }
  },
  watch: {
    dragging (newValue) {
      if (newValue === true) {
        this.hideTextField()
      }
    }
  },
  methods: {
    ...mapActions('boards', ['updateListTitle']),
    updateTitle () {
      if (this.isEmptyString(this.tempTitle)) {
        this.cancel()
        return
      }

      this.updateListTitle({ listId: this.listId, newTitle: this.tempTitle })
      this.hideTextField()
    },
    cancel () {
      this.tempTitle = this.title
      this.hideTextField()
    },
    hideTextField () {
      this.isTextFieldVisible = false
    }
  }
}
</script>

<style scoped>
.list__header {
  cursor: pointer;
}

.list__title {
  font-size: 16px;
}
</style>
