<template>
  <div class="fill-width">
      <v-row :justify="'space-between'" :align="'start'">
        <div class="text-h6 ml-7">Boards</div>
        <v-btn
            class="white--text mr-7"
            text
            small
            outlined
            color="grey darken-1"
            @click="isMenuVisible = true"
        >
          <v-icon left>mdi-menu</v-icon>
          Menu
        </v-btn>
      </v-row>

    <BoardsMenu
        :is-menu-visible="isMenuVisible"
        @menu-closed="isMenuVisible = false"
    />
  </div>
</template>

<script>
import BoardsMenu from '@/components/board/BoardsMenu'

export default {
  name: 'BoardsOverviewViewHeader',
  components: {
    BoardsMenu
  },
  data () {
    return {
      isMenuVisible: false
    }
  }
}
</script>
