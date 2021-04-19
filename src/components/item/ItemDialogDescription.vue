<template>
  <div>
    <v-card-text
        v-if="!isTextAreaVisible"
        @click="isTextAreaVisible = true"
        class="pt-3 grey--text text--darken-2"
    >
      <pre v-if="item.description">
        {{ item.description }}
      </pre>
      <span
          v-else
          class="font-italic"
      >
        Click here to add a description to this item
      </span>
    </v-card-text>

    <v-textarea
        v-else
        autofocus
        auto-grow
        dense
        full-width
        background-color="grey lighten-4"
        color="grey lighten-1"
        v-model="itemDescription"
        @focus="$event.target.select()"
        @keyup.ctrl.enter="save"
        @keydown.esc="cancel"
        v-click-outside="{
          handler: save,
          include: includeOnClickOutside
        }"
    />

    <div
        v-if="isTextAreaVisible"
        class="float-right"
    >
      <v-btn
          depressed
          icon
          small
          class="mr-2 cancel"
          @click="cancel"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-btn
          small
          depressed
          color="green darken-2"
          class="white--text ma-1"
          @click="save"
      >
        Save
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { stringMixin } from '@/mixins/stringMixin'

export default {
  name: 'ItemDialogDescription',
  mixins: [stringMixin],
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isTextAreaVisible: false,
      itemDescription: this.item.description
    }
  },
  methods: {
    ...mapActions('boards', ['updateItemDescription']),
    cancel () {
      this.itemDescription = this.item.description
      this.isTextAreaVisible = false
    },
    save () {
      if (this.itemDescription !== null && this.isEmptyString(this.itemDescription)) {
        this.itemDescription = null
      }

      this.updateItemDescription({ itemId: this.item.id, newDescription: this.itemDescription })
      this.isTextAreaVisible = false
    },
    includeOnClickOutside () {
      return [document.querySelector('.cancel')]
    }
  }
}
</script>

<style scoped>
pre {
  all: unset;
  white-space: pre-line;
}
</style>
