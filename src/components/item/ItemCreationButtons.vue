<template>
  <div class="item-creation">
    <v-btn
        v-if="!isTextAreaVisible"
        @click="isTextAreaVisible = true"
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
            class="mr-2"
            @click="cancelAddingItemHandler"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-btn
            small
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
  name: 'ItemCreationButtons',
  props: {
    listId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isTextAreaVisible: false,
      itemTitle: ''
    }
  },
  watch: {
    isTextAreaVisible (newValue) {
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
        this.addItem({ listId: this.listId, itemTitle: this.itemTitle })
      }

      this.isTextAreaVisible = false
    },
    cancelAddingItemHandler() {
      this.isTextAreaVisible = false
    },
    ...mapActions('boards', ['addItem'])
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
