<template>
  <div>
    <v-hover v-slot="{ hover }">
      <v-card
          height="80"
          outlined
          v-click-outside="cancelHandler"
          :class="{ 'cursor-pointer': !showForm }"
      >
        <div
            v-if="showForm"
            class="fill-height pa-2 d-flex flex-column fill-width"
        >
          <div class="d-flex justify-space-between">
            <v-form
                class="fill-width"
                ref="form"
            >
              <v-text-field
                  autofocus
                  dense
                  single-line
                  v-model="title"
                  label="Add the board title"
                  class="text-subtitle-2 ma-0"
                  @keyup.esc="cancelHandler"
                  @keyup.enter="createHandler"
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
            @click="showForm = true"
        >
          Create a new board
        </span>
      </v-card>
    </v-hover>

    <ErrorDialog
        v-if="showErrorDialog"
        :message="'An error has occurred while creating the board.'"
        v-on:dialogClose="showErrorDialog = false"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ErrorDialog from '@/components/layout/ErrorDialog'

export default {
  name: "CreateBoardCard",
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
        await this.add({ id: this.nextBoardId(), title: this.title })
      } catch (e) {
        this.showErrorDialog = true
      }
    },
    cancelHandler() {
      this.title = ''
      this.showForm = false
    },
    ...mapActions('boards', ['add']),
    ...mapGetters('boards', ['nextBoardId'])
  }
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
