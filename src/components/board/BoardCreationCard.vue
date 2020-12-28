<template>
  <div>
    <v-card
        v-if="!showTextArea"
        min-height="80"
        outlined
        @click="showTextArea = true"
        :ripple="false"
        class="card d-flex align-center justify-center"
    >
      <span class="text-subtitle-2 font-weight-regular card__title">
        <v-icon
            small
            class="card__icon"
        >
          mdi-plus
        </v-icon>
          Create a new board
      </span>
    </v-card>
    <v-card
        v-else
        height="80"
        outlined
        v-click-outside="cancelAddingBoardHandler"
    >
      <div class="fill-height d-flex flex-column fill-width">
        <div class="d-flex flex-column">
          <v-text-field
              autofocus
              outlined
              dense
              :hide-details="true"
              autocomplete="off"
              color="grey lighten-1"
              placeholder="Enter the board title..."
              class="pa-1"
              @keyup.esc="cancelAddingBoardHandler"
              @keyup.enter="addBoardHandler"
              v-model="boardTitle"
          />
          <div class="align-self-end">
            <v-btn
                icon
                x-small
                @click.stop="cancelAddingBoardHandler"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-btn
                x-small
                depressed
                :disabled="isBoardTitleEmpty"
                color="green darken-2"
                class="white--text ma-1"
                @click.stop="addBoardHandler"
            >
              <v-icon small>mdi-plus</v-icon>
              Add
            </v-btn>
          </div>
        </div>
      </div>
    </v-card>

    <ErrorDialog
        :show="showErrorDialog"
        :message="'An error has occurred while creating the board.'"
        @dialogClose="showErrorDialog = false"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ErrorDialog from '@/components/layout/ErrorDialog'

export default {
  name: "BoardCreationCard",
  components: {
    ErrorDialog
  },
  data () {
    return {
      boardTitle: '',
      showTextArea: false,
      showErrorDialog: false
    }
  },
  watch: {
    showTextArea(newValue) {
      if (newValue === false) {
        this.boardTitle = ''
      }
    }
  },
  methods: {
    async addBoardHandler() {
      this.showTextArea = false;

      if (this.isBoardTitleEmpty) {
        return;
      }

      try {
        await this.add(this.boardTitle)
      } catch (e) {
        this.showErrorDialog = true
      }
    },
    cancelAddingBoardHandler() {
      this.showTextArea = false
    },
    ...mapActions('boards', { add: 'addBoard' })
  },
  computed: {
    isBoardTitleEmpty() {
      return this.boardTitle.replace(/\s/g, '').length === 0
    }
  }
}
</script>

<style scoped>
.card {
  cursor: pointer;
}

.card:hover {
  border-color: var(--v-secondary-base);
  transition: border 500ms;
}

.card__title {
  color: #757575;
}

.card:hover .card__title {
  color: var(--v-secondary-base);
  transition: all 500ms;
}

.card__icon {
  top: -1px;
  left: -2px;
}

.card:hover .card__icon {
  color: var(--v-secondary-base);
  transition: all 500ms;
}

</style>
