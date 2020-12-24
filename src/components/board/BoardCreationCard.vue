<template>
  <div>
      <v-card
          height="80"
          outlined
          v-click-outside="cancelHandler"
          :class="{ 'card': true, 'card--form': !showForm }"
      >
        <div
            v-if="showForm"
            class="fill-height pa-2 d-flex flex-column fill-width"
        >
          <div class="d-flex justify-space-between">
            <v-form
                class="fill-width"
                ref="form"
                @submit.prevent="createHandler"
            >
              <v-text-field
                  autofocus
                  dense
                  single-line
                  v-model="title"
                  label="Add the board title"
                  class="text-subtitle-2 ma-0"
                  @keyup.esc="cancelHandler"
                  :rules="[validationRules.required]"
              >
                <template v-slot:label>
                  <span class="text-subtitle-2">Add the board title</span>
                </template>
              </v-text-field>
            </v-form>
            <v-btn
                icon
                x-small
                @click="cancelHandler"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
          <v-btn
              x-small
              outlined
              color="green"
              :class="{ 'align-self-end': true, 'v-btn--disabled': !isTitleValid(title) }"
              @click="createHandler"
          >
            <v-icon small>mdi-check</v-icon>
            Create
          </v-btn>
        </div>
        <div
            v-else
            class="pa-0 fill-height fill-width d-inline-flex align-center justify-center"
            @click="showForm = true"
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
      title: '',
      showForm: false,
      showErrorDialog: false,
      validationRules: {
        required: value => this.isTitleValid(value) || 'Required.'
      }
    }
  },
  methods: {
    isTitleValid (title) {
      return title.replace(/\s/g,'').length > 0
    },
    async createHandler() {
      if (this.$refs.form.validate() === false) {
        return;
      }

      await this.createBoard()

      this.showForm = false;
      this.title = ''
    },
    async createBoard() {
      try {
        await this.add(this.title)
      } catch (e) {
        this.showErrorDialog = true
      }
    },
    cancelHandler() {
      this.title = ''
      this.showForm = false
    },
    ...mapActions('boards', ['add'])
  }
}
</script>

<style scoped>
.card--form {
  cursor: pointer;
}

.card:hover {
  border-color: var(--v-secondary-base);
  transition: border 500ms;
}

.card__title {
  position: relative;
  color: #757575;
}

.card:hover .card__title {
  color: var(--v-secondary-base);
  transition: all 500ms;
}

.card__icon {
  position:absolute;
  top: 1.5px;
  left: -20px;
}

.card:hover .card__icon {
  color: var(--v-secondary-base);
  transition: all 500ms;
}

</style>
