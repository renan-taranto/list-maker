<template>
  <div>
    <v-card
        v-for="item in archivedItems"
        :key="item.id"
        class="d-flex align-center justify-space-between ma-2 pl-2 pr-2"
        outlined
    >
      <div class="grey--text text--darken-1">
        {{ item.title }}
      </div>
      <v-btn
          x-small
          icon
          color="green"
          @click="restoreItem(item.id)"
      >
        <v-icon>mdi-restore</v-icon>
      </v-btn>
    </v-card>

    <v-alert
        v-if="archivedItems.length === 0"
        dense
        text
        type="info"
        color="grey darken-2"
        class="text-caption"
    >
      There are no archived items in this board
    </v-alert>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ItemRestoringCard',
  props: {
    boardId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters('boards', ['archivedBoardItems']),
    archivedItems () {
      return this.archivedBoardItems(this.boardId)
    }
  },
  methods: {
    ...mapActions('boards', ['restoreItem'])
  }
}
</script>
