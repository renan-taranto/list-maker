<template>
  <v-navigation-drawer
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
            v-if="isRestoreListCardVisible"
            icon
            absolute
            left
            @click="isRestoreListCardVisible = false"
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

    <div v-if="!isRestoreListCardVisible">
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
      <RestoreListCard v-if="isRestoreListCardVisible" :board-id="boardId"/>
    </v-slide-x-reverse-transition>
  </v-navigation-drawer>
</template>

<script>
import { mapActions } from 'vuex'
import RestoreListCard from '@/components/board/RestoreListCard'

export default {
  name: 'BoardMenu',
  components: { RestoreListCard },
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
  data() {
    return {
      items: [
        { title: 'Restore List', icon: 'mdi-restore', onClick: 'showRestoreListCard' },
        { title: 'Close Board', icon: 'mdi-close', onClick: 'closeTheBoard' }
      ],
      isRestoreListCardVisible: false
    }
  },
  computed: {
    isDrawerVisible: {
      get() {
        return this.isMenuVisible
      },
      set(val) {
        if (val === false) {
          this.$emit('menu-closed')
          this.isRestoreListCardVisible = false
        }
      }
    },
    title() {
      return this.isRestoreListCardVisible ? 'Restore List' : 'Menu'
    }
  },
  methods: {
    ...mapActions('boards', ['closeBoard']),
    handleClick(functionName) {
      this[functionName]()
    },
    showRestoreListCard () {
      this.isRestoreListCardVisible = true
    },
    closeTheBoard() {
      this.closeBoard(this.boardId)
      this.$router.push({ name: 'BoardsView' })
    }
  }
}
</script>
