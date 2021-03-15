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
        v-click-outside="cancelAddingListHandler"
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
            @keyup.esc="cancelAddingListHandler"
            @keyup.enter="addListHandler"
            v-model="listTitle"
        />
        <div class="align-self-end">
          <v-btn
              depressed
              icon
              small
              @click="cancelAddingListHandler"
          >
            <v-icon small>mdi-close</v-icon>
          </v-btn>
          <v-btn
              x-small
              depressed
              :disabled="isListTitleEmpty"
              color="green darken-2"
              class="white--text ma-1"
              @click="addListHandler"
          >
            <v-icon small>mdi-plus</v-icon>
            Add
          </v-btn>
        </div>
      </div>
    </v-card>

    <ErrorDialog
        :show="isErrorDialogVisible"
        :message="'An error has occurred while creating the list.'"
        @dialogClose="isErrorDialogVisible = false"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ErrorDialog from '@/components/layout/ErrorDialog'

export default {
  name: 'ListCreationButton',
  components: {
    ErrorDialog
  },
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
        this.cancelAddingListHandler()
      }
    }
  },
  methods: {
    async addListHandler () {
      this.isTextAreaVisible = false

      if (this.isListTitleEmpty) {
        return;
      }

      try {
        await this.addList({ boardId: this.boardId, listTitle: this.listTitle })
      } catch (e) {
        this.isErrorDialogVisible = true
      }
    },
    cancelAddingListHandler () {
      this.isTextAreaVisible = false
    },
    ...mapActions('boards', ['addList'])
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
