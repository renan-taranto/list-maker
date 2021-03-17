<template>
  <div>
    <v-btn
        class="white--text"
        text
        small
        outlined
        color="grey darken-1"
        @click="isDrawerVisible = true"
    >
      <v-icon left>mdi-menu</v-icon>
      Menu
    </v-btn>
    <v-navigation-drawer
        v-model="isDrawerVisible"
        absolute
        right
        hide-overlay
        class="menu"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-center">Menu</v-list-item-title>
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
              <v-icon>{{ item.icon }}</v-icon>
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
  </div>
</template>

<script>
import RestoreListCard from '@/components/board/RestoreListCard'

export default {
  name: 'BoardMenu',
  components: { RestoreListCard },
  props: {
    boardId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isDrawerVisible: false,
      items: [
        { title: 'Restore List', icon: 'mdi-restore-alert', onClick: 'showRestoreListCard' }
      ],
      isRestoreListCardVisible: false
    }
  },
  methods: {
    handleClick(functionName) {
      this[functionName]()
    },
    showRestoreListCard () {
      this.isRestoreListCardVisible = true
    }
  },
  watch: {
    isDrawerVisible(val) {
      if (val === false) {
        this.isRestoreListCardVisible = false
      }
    }
  }
}
</script>

<style scoped>
.menu {
  border: thin solid #0000001f;
  border-radius: 4px;
  will-change: initial; /* Fix for chrome blurry fonts: https://github.com/vuetifyjs/vuetify/issues/12890 */
}
</style>
