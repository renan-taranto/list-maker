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
              <div :class="{ 'card__stripe': true, 'primary': !hover, 'secondary': hover }">{{'\u00A0'}}</div>
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
        <CreateBoardCard/>
      </v-col>
    </draggable>
  </v-container>
</template>

<script>
import draggable from 'vuedraggable'
import CreateBoardCard from '@/components/board/CreateBoardCard'
import { mapGetters } from 'vuex'

export default {
  name: "BoardsView",
  components: {
    draggable,
    CreateBoardCard
  },
  data () {
    return {
      showCardButtons: true
    }
  },
  computed: {
    ...mapGetters('boards', { boards: 'all'})
  }
}
</script>

<style scoped>
.card__stripe {
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
</style>
