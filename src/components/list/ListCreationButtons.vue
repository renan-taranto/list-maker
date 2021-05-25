<template>
  <div>
    <v-btn
        v-if="!isTextAreaVisible"
        @click="isTextAreaVisible = true"
        class="button"
        text
        small
        outlined
        color="grey darken-1"
    >
      <v-icon small>mdi-plus</v-icon>
      Add List
    </v-btn>
    <v-card
        v-else
        width="270"
        outlined
        v-click-outside="cancelCreatingListHandler"
    >
      <div class="d-flex flex-column">
        <v-text-field
            autofocus
            outlined
            dense
            :hide-details="true"
            autocomplete="off"
            color="grey lighten-1"
            placeholder="Enter the list title..."
            class="pa-1"
            @keyup.esc="cancelCreatingListHandler"
            @keyup.enter="createListHandler"
            v-model="listTitle"
        />
        <div class="align-self-end">
          <v-btn
              depressed
              icon
              small
              class="mr-2"
              @click="cancelCreatingListHandler"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-btn
              small
              depressed
              :disabled="isListTitleEmpty"
              color="green darken-2"
              class="white--text ma-1"
              @click="createListHandler"
          >
            <v-icon small>mdi-plus</v-icon>
            Add
          </v-btn>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ListCreationButton',
  props: {
    boardId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isTextAreaVisible: false,
      isErrorDialogVisible: false,
      listTitle: ''
    }
  },
  watch: {
    isTextAreaVisible (newValue) {
      if (newValue === false) {
        this.listTitle = ''
      }
    },
    dragging (newValue) {
      if (newValue === true) {
        this.cancelCreatingListHandler()
      }
    }
  },
  methods: {
    async createListHandler () {
      this.isTextAreaVisible = false

      if (this.isListTitleEmpty) {
        return
      }

      await this.createList({ boardId: this.boardId, listTitle: this.listTitle })
    },
    cancelCreatingListHandler () {
      this.isTextAreaVisible = false
    },
    ...mapActions('boards', ['createList'])
  },
  computed: {
    isListTitleEmpty () {
      return this.listTitle.replace(/\s/g, '').length === 0
    },
    ...mapGetters('draggable', ['dragging'])
  }
}
</script>

<style scoped>
.button {
  width: 270px;
}
</style>
