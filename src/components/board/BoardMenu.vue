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
        <v-list-item-title class="text-center primary--text">{{ menuTitle }}</v-list-item-title>
        <v-btn
            v-if="selectedOptionComponent"
            icon
            absolute
            left
            @click="selectedOptionComponent = null"
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

    <div v-if="!selectedOptionComponent">
      <v-list dense>
        <v-list-item
            v-for="option in options"
            :key="option.title"
            link
            @click="handleClick(option.onClick)"
        >
          <v-list-item-icon>
            <v-icon color="primary">{{ option.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="grey--text text--darken-2">{{ option.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>

    <v-slide-x-reverse-transition hide-on-leave>
      <component v-if="selectedOptionComponent" :is="selectedOptionComponent" :board-id="boardId"/>
    </v-slide-x-reverse-transition>
  </v-navigation-drawer>
</template>

<script>
import { mapActions } from 'vuex'
import ItemRestoringCard from '@/components/board/ItemRestoringCard'
import ListRestoringCard from '@/components/board/ListRestoringCard'

export default {
  name: 'BoardMenu',
  components: {
    ItemRestoringCard,
    ListRestoringCard
  },
  props: {
    isMenuVisible: {
      type: Boolean,
      required: true,
      default: false
    },
    boardId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      options: [
        { title: 'Restore List', icon: 'mdi-restore', onClick: 'showListRestoringCard' },
        { title: 'Restore Item', icon: 'mdi-file-restore-outline', onClick: 'showItemRestoringCard' },
        { title: 'Close Board', icon: 'mdi-close', onClick: 'closeTheBoard' }
      ],
      selectedOptionComponent: null
    }
  },
  computed: {
    isDrawerVisible: {
      get () {
        return this.isMenuVisible
      },
      set (val) {
        if (val === false) {
          this.selectedOptionComponent = null
          this.$emit('menu-closed')
        }
      }
    },
    menuTitle () {
      const titlePerComponent = {
        ListRestoringCard: 'Restore List',
        ItemRestoringCard: 'Restore Item'
      }
      return this.selectedOptionComponent ? titlePerComponent[this.selectedOptionComponent.name] : 'Menu'
    }
  },
  methods: {
    ...mapActions('boards', ['closeBoard']),
    handleClick (functionName) {
      this[functionName]()
    },
    showListRestoringCard () {
      this.selectedOptionComponent = ListRestoringCard
    },
    showItemRestoringCard () {
      this.selectedOptionComponent = ItemRestoringCard
    },
    closeTheBoard () {
      this.closeBoard(this.boardId)
      this.$router.push({ name: 'BoardsView' })
    }
  }
}
</script>
