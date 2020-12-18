<template>
  <v-container fluid>
    <div class="text-h6 pa-2">Boards</div>
    <draggable
        class="row"
        :list="boards"
        ghost-class="ghost"
        chosen-class="chosen"
        force-fallback="true"
    >
      <v-col
          v-for="board in boards"
          :key="board.id"
          cols="12"
          sm="4"
          md="3"
          lg="2"
      >
        <a href="" style="color: inherit; text-decoration: inherit;">
          <v-card height="80">
            <div class="float-left" style="height: 100%; width: 5px; background-color:#da274f;">{{'\u00A0'}}</div>
            <v-card-title class="ma-0 pa-2">
              <span class="subtitle-1 font-weight-medium text-truncate">{{ board.title }}</span>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon x-small>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon x-small>
                <v-icon>mdi-archive</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </a>
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
  }
}
</script>

<style scoped>
.ghost {
  visibility: hidden;
}

.chosen {
  opacity: 1 !important;
}
</style>
