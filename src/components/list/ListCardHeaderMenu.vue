<template>
  <v-menu
      :close-on-content-click="false"
      v-model="isVisible"
      transition="slide-y-transition"
      offset-y
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          icon
          v-bind="attrs"
          v-on="on"
      >
        <v-icon small>mdi-menu</v-icon>
      </v-btn>
    </template>

    <v-list
        width="250"
        dense
    >
      <v-list-item-subtitle class="menu__header text-center">
        <v-btn
            small
            icon
            absolute
            class="menu__back-btn"
            v-if="isMoveListCardVisible"
            @click="hideMoveListCard"
        >
          <v-icon small>mdi-arrow-left</v-icon>
        </v-btn>
        <span>{{ title }}</span>
        <v-btn
            small
            icon
            absolute
            class="menu__close-btn"
            @click="closeMenu"
        >
          <v-icon small>mdi-close</v-icon>
        </v-btn>
      </v-list-item-subtitle>

      <v-divider></v-divider>

      <v-list-item-group
          class="text-subtitle-2"
          v-if="!isMoveListCardVisible"
      >
        <v-list-item @click="showMoveListCard"><span class="menu__item">Move</span></v-list-item>
        <v-list-item @click="archiveList(listId)"><span class="menu__item">Archive</span></v-list-item>
      </v-list-item-group>
    </v-list>

    <MoveListCard
        class="pt-4"
        v-if="isMoveListCardVisible"
        :list-id="listId"
        @list-moved="closeMenu"
    />
  </v-menu>
</template>

<script>
import {  mapActions } from 'vuex'
import MoveListCard from '@/components/list/MoveListCard'

export default {
  name: 'ListCardHeaderMenu',
  components: { MoveListCard },
  props: {
    listId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isVisible: false,
      isMoveListCardVisible: false
    }
  },
  computed: {
    title () {
      return this.isMoveListCardVisible === false ? 'List Menu' : 'Move List'
    }
  },
  methods: {
    ...mapActions('boards', ['archiveList']),
    showMoveListCard () {
      this.isMoveListCardVisible = true
    },
    hideMoveListCard () {
      this.isMoveListCardVisible = false
    },
    closeMenu () {
      this.isVisible = false
    }
  },
  watch: {
    isVisible(val) {
      if (val === false) {
        this.hideMoveListCard()
      }
    }
  }
}
</script>

<style scoped>
.menu__header {
  height: 30px;
}

.menu__item {
  color: #616161;
}

.menu__close-btn {
  top: 0;
  right: 0;
}

.menu__back-btn {
  top: 0;
  left: 0;
}
</style>
