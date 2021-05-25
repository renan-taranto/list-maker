<template>
  <v-navigation-drawer
      app
      v-model="isDrawerVisible"
      temporary
      fixed
      right
      hide-overlay
      class="navigation-drawer-menu"
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-center primary--text">{{ title }}</v-list-item-title>
        <v-btn
            v-if="isBoardReopeningCardVisible"
            icon
            absolute
            left
            @click="isBoardReopeningCardVisible = false"
        >
          <v-icon small>mdi-arrow-left</v-icon>
        </v-btn>
        <v-btn
            icon
            absolute
            right
            @click="isDrawerVisible = false"
        >
          <v-icon small>mdi-close</v-icon>
        </v-btn>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <div v-if="!isBoardReopeningCardVisible">
      <v-list dense>
        <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            @click="handleClick(item.onClick)"
        >
          <v-list-item-icon>
            <v-icon color="primary">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="grey--text text--darken-2">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>

    <v-slide-x-reverse-transition hide-on-leave>
      <BoardReopeningCard v-if="isBoardReopeningCardVisible"/>
    </v-slide-x-reverse-transition>
  </v-navigation-drawer>
</template>

<script>
import BoardReopeningCard from '@/components/board/BoardReopeningCard'

export default {
  name: 'BoardsMenu',
  components: { BoardReopeningCard },
  props: {
    isMenuVisible: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data () {
    return {
      items: [
        { title: 'Reopen Board', icon: 'mdi-restore', onClick: 'showBoardReopeningCard' }
      ],
      isBoardReopeningCardVisible: false
    }
  },
  computed: {
    isDrawerVisible: {
      get () {
        return this.isMenuVisible
      },
      set (val) {
        if (val === false) {
          this.$emit('menu-closed')
          this.isBoardReopeningCardVisible = false
        }
      }
    },
    title () {
      return this.isBoardReopeningCardVisible ? 'Reopen Board' : 'Menu'
    }
  },
  methods: {
    handleClick (functionName) {
      this[functionName]()
    },
    showBoardReopeningCard () {
      this.isBoardReopeningCardVisible = true
    }
  }
}
</script>
