<template>
  <div>
    <v-card
        v-for="list in archivedLists"
        :key="list.id"
        class="d-flex align-center justify-space-between ma-2 pl-2 pr-2"
        outlined
    >
      <div class="grey--text text--darken-1">
        {{ list.title }}
      </div>
      <v-btn
          x-small
          icon
          color="green"
          @click="restoreList(list.id)"
      >
        <v-icon>mdi-restore</v-icon>
      </v-btn>
    </v-card>

    <v-alert
        v-if="archivedLists.length === 0"
        dense
        text
        type="info"
        color="grey darken-2"
        class="text-caption"
    >
      There are no archived lists in this board
    </v-alert>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'RestoreListCard',
  props: {
    boardId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters('boards', ['archivedBoardLists']),
    archivedLists() {
      return this.archivedBoardLists(this.boardId)
    }
  },
  methods: {
    ...mapActions('boards', ['restoreList'])
  }
}
</script>
