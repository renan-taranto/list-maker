<template>
  <div class="item-creation">
    <v-btn
        v-if="!showTextArea"
        @click="showTextArea = true"
        text
        small
        block
        color="grey darken-1"
    >
      <v-icon small>mdi-plus</v-icon>
      Add Item
    </v-btn>
    <div
        v-else
        class="d-flex flex-column ma-1"
        v-click-outside="cancelAddingItemHandler"
    >
      <v-textarea
          autofocus
          outlined
          placeholder="Enter the item title..."
          rows="2"
          background-color="grey lighten-4"
          color="grey lighten-1"
          @keyup.esc="cancelAddingItemHandler"
          @keyup.enter="addItemHandler"
          :hide-details="true"
          v-model="itemTitle"
          class="item-creation__text-area"
      />
      <div class="align-self-end">
        <v-btn
            depressed
            icon
            small
            @click="cancelAddingItemHandler"
        >
          <v-icon small>mdi-close</v-icon>
        </v-btn>
        <v-btn
            x-small
            depressed
            @click="addItemHandler"
            :disabled="isItemTitleEmpty"
            color="green darken-2"
            class="white--text ma-1"
        >
          <v-icon small>mdi-plus</v-icon>
          Add
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ItemCreationButton',
  props: {
    listId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showTextArea: false,
      itemTitle: ''
    }
  },
  watch: {
    showTextArea (newValue) {
      if (newValue === false) {
        this.itemTitle = ''
      }
    },
    dragging (newValue) {
      if (newValue === true) {
        this.cancelAddingItemHandler()
      }
    }
  },
  methods: {
    addItemHandler() {
      if (!this.isItemTitleEmpty) {
        this.addListItem({ listId: this.listId, itemTitle: this.itemTitle })
      }

      this.showTextArea = false
    },
    cancelAddingItemHandler() {
      this.showTextArea = false
    },
    ...mapActions('boards', ['addListItem'])
  },
  computed: {
    isItemTitleEmpty () {
      return this.itemTitle.replace(/\s/g, '').length === 0
    },
    ...mapGetters('draggable', ['dragging'])
  }
}
</script>

<style scoped>
.item-creation__text-area {
  margin: 5px 3px 5px 3px;
}
</style>
