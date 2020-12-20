<template>
  <v-container fluid>
    <div class="text-h6 pa-2">Boards</div>
    <div
        v-if="boards.length === 0"
        class="text-caption pa-2"
    >
      Create your first board to start:
    </div>
    <draggable
        class="row"
        :list="boards"
        :draggable="'.draggable'"
        @choose="showCardButtons = false"
        @unchoose="showCardButtons = true"
        @end="showCardButtons = true"
        ghost-class="card--ghost"
        chosen-class="card--chosen"
        force-fallback="true"
    >
      <v-col
          v-for="board in boards"
          :key="board.id"
          cols="12"
          sm="4"
          md="3"
          lg="2"
          class="draggable"
      >
        <a
            href=""
            class="text-decoration-none"
        >
          <v-hover v-slot="{ hover }">
            <v-card
                height="80"
                outlined
            >
              <div :class="{ 'card-stripe': true, 'primary': !hover, 'secondary': hover }">{{'\u00A0'}}</div>
              <v-card-title class="ma-0 pa-2">
              <span class="subtitle-1 font-weight-medium text-truncate">
                {{ board.title }}
              </span>
              </v-card-title>
              <v-slide-x-reverse-transition>
                <v-card-actions v-if="hover && showCardButtons">
                  <v-spacer></v-spacer>
                  <v-btn
                      icon
                      x-small
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn
                      icon
                      x-small
                  >
                    <v-icon>mdi-archive</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-slide-x-reverse-transition>
            </v-card>
          </v-hover>
        </a>
      </v-col>
      <v-col
          cols="12"
          sm="4"
          md="3"
          lg="2"
          class="pa-3"
      >
        <v-hover v-slot="{ hover }">
          <v-card
              height="80"
              outlined
              v-click-outside="cancelBoardCreation"
              :class="{ 'cursor-pointer': !showNewBoardForm }"
          >
            <div
                v-if="showNewBoardForm"
                class="fill-height pa-2 d-flex flex-column"
                style="width: 100%;"
            >
              <div class="d-flex justify-space-between">
                <v-form
                    class="fill-width"
                    ref="newBoardForm"
                >
                  <v-text-field
                      autofocus
                      dense
                      single-line
                      v-model="newBoardTitle"
                      label="Add the board name"
                      class="text-subtitle-2 ma-0"
                      @keyup.esc="cancelBoardCreation"
                      @keyup.enter="createBoardHandler"
                      :rules="[rules.required]"
                  >
                    <template v-slot:label>
                      <span class="text-subtitle-2">Add the board title</span>
                    </template>
                  </v-text-field>
                </v-form>
                <v-btn
                    icon
                    x-small
                    @click="cancelBoardCreation"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </div>
              <v-btn
                  x-small
                  outlined
                  color="green"
                  :class="{ 'align-self-end': true, 'v-btn--disabled': newBoardTitle.length === 0 }"
                  @click="createBoardHandler"
              >
                <v-icon small>mdi-check</v-icon>
                Create
              </v-btn>
            </div>
            <span
                v-else
                :class="[
                  'text-subtitle-2',
                  'font-weight-regular',
                  'pa-0',
                  'fill-height',
                  'fill-width',
                  'd-inline-flex',
                  'align-center',
                  'justify-center',
                  hover ? 'black--text' : 'grey--text text--darken-1'
                ]"
                @click="showNewBoardForm = true"
            >
                    Create a new board
              </span>
          </v-card>
        </v-hover>
      </v-col>
    </draggable>
  </v-container>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  name: "BoardsView",
  components: {
    draggable
  },
  data () {
    return {
      rules: {
        required: value => !!value || 'Required.'
      },
      showCardButtons: true,
      showNewBoardForm: false,
      newBoardTitle: '',
      boards: [
        { id: 1, title: 'Backlog' },
        { id: 2, title: 'Sprint 1' },
        { id: 3, title: 'Sprint 2' },
        { id: 4, title: 'Sprint 3' },
        { id: 5, title: 'Sprint 4' },
        { id: 6, title: 'Sprint 5' },
        { id: 7, title: 'Sprint 6' },
      ]
    }
  },
  methods: {
    createBoardHandler () {
      if (this.$refs.newBoardForm.validate() === false) {
        return;
      }

      this.createBoard()

      this.showNewBoardForm = false;
      this.newBoardTitle = ''
    },
    createBoard () {
      this.boards.push({ id: this.boards.length + 1, title: this.newBoardTitle })
    },
    cancelBoardCreation () {
      this.newBoardTitle = ''
      this.showNewBoardForm = false
    }
  }
}
</script>

<style scoped>
.card-stripe {
  float: left;
  height: 100%;
  width: 5px;
}

.card--ghost {
  visibility: hidden;
}

.card--chosen {
  opacity: 1 !important;
}

.fill-width {
  width: 100%;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
