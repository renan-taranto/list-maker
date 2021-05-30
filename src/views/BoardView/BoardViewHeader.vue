<template>
  <v-row
      v-if="selectedBoard"
      :justify="'space-between'"
      :align="'start'"
  >
    <BoardTitle/>
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

    <BoardMenu
        :is-menu-visible="isMenuVisible"
        :board-id="selectedBoard.id"
        @menu-closed="isMenuVisible = false"
    />
  </v-row>
</template>

<script>
import BoardMenu from '@/components/board/BoardMenu'
import BoardTitle from '@/components/board/BoardTitle'
import { mapGetters } from 'vuex'

export default {
  name: 'BoardViewHeader',
  components: {
    BoardMenu,
    BoardTitle
  },
  data () {
    return {
      isMenuVisible: false
    }
  },
  computed: {
    ...mapGetters('boards', ['selectedBoard'])
  }
}
</script>

<style scoped>

</style>
