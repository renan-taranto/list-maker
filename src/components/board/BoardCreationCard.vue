<template>
  <div>
    <v-card
        v-if="!isTextAreaVisible"
        min-height="80"
        outlined
        @click="isTextAreaVisible = true"
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
        v-click-outside="cancelCreatingBoardHandler"
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
              @keyup.esc="cancelCreatingBoardHandler"
              @keyup.enter="createBoardHandler"
              v-model="boardTitle"
          />
          <div class="align-self-end mr-1">
            <v-btn
                icon
                small
                class="mr-2"
                @click.stop="cancelCreatingBoardHandler"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-btn
                small
                depressed
                :disabled="isBoardTitleEmpty"
                color="green darken-2"
                class="white--text"
                @click.stop="createBoardHandler"
            >
              <v-icon small>mdi-plus</v-icon>
              Add
            </v-btn>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'BoardCreationCard',
  data () {
    return {
      boardTitle: '',
      isTextAreaVisible: false
    }
  },
  watch: {
    isTextAreaVisible (newValue) {
      if (newValue === false) {
        this.boardTitle = ''
      }
    }
  },
  methods: {
    async createBoardHandler () {
      this.isTextAreaVisible = false

      if (this.isBoardTitleEmpty) {
        return
      }

      await this.createBoard(this.boardTitle)
    },
    cancelCreatingBoardHandler () {
      this.isTextAreaVisible = false
    },
    ...mapActions('boards', ['createBoard'])
  },
  computed: {
    isBoardTitleEmpty () {
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
