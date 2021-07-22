<template>
  <v-menu
      :close-on-content-click="false"
      offset-y
      :value="isOpen"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          small
          color="primary"
          width="85"
          class="mr-1"
          v-bind="attrs"
          v-on="on"
          @click="isOpen = true"
      >
        Move
      </v-btn>
    </template>
    <v-list
        width="250"
        dense
    >
      <v-list-item-subtitle class="menu__header text-center">
        <span>Move Item</span>
        <v-btn
            small
            icon
            absolute
            class="menu__close-btn"
            @click="isOpen = false"
        >
          <v-icon small>mdi-close</v-icon>
        </v-btn>
      </v-list-item-subtitle>

      <v-divider></v-divider>

      <v-card
          width="250"
          elevation="0"
          class="pt-5"
      >
        <v-select
            label="Board"
            dense
            outlined
            item-color="grey lighten-1"
            color="grey lighten-1"
            class="pb-0"
            v-model="targetBoard"
            :items="openBoards"
            item-text="title"
            return-object
        />
        <v-select
            label="List"
            dense
            outlined
            item-color="grey lighten-1"
            color="grey lighten-1"
            class="pt-0"
            v-model="targetList"
            :items="availableLists"
            :no-data-text="'No lists on the selected board'"
            item-text="title"
            return-object
        />
        <v-select
            label="Position"
            dense
            outlined
            item-color="grey lighten-1"
            color="grey lighten-1"
            class="pt-0"
            v-model="targetPosition"
            :items="availablePositions"
            :no-data-text="'Select a list first'"
        />
        <v-btn
            small
            depressed
            color="green darken-2"
            class="white--text ml-1 mb-2"
            @click="move"
            :disabled="!this.targetList || !this.targetPosition"
        >
          Move
        </v-btn>
      </v-card>
    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'ItemDialogMovingMenu',
  data () {
    return {
      isOpen: false,
      targetBoard: null,
      targetList: null,
      targetPosition: null
    }
  },
  beforeMount () {
    this.targetBoard = this.selectedBoard
  },
  computed: {
    ...mapGetters('boards', [
      'selectedBoard',
      'openBoards',
      'boardOfId',
      'openListsFromBoard',
      'listItemsCount',
      'selectedItem',
      'selectedItemList',
      'selectedItemIndex'
    ]),
    availableLists () {
      if (!this.targetBoard) {
        return []
      }
      return this.openListsFromBoard(this.targetBoard.id)
    },
    availablePositions () {
      if (!this.targetList) {
        return []
      }

      const positions = []
      for (let i = 1; i <= this.listItemsCount(this.targetList.id); i++) {
        positions.push(i)
      }

      if (this.selectedItemList.id !== this.targetList.id) {
        positions.push(positions.length + 1)
      }

      return positions
    }
  },
  methods: {
    ...mapActions('boards', ['moveItem', 'loadBoardOfId']),
    move () {
      if (!this.targetList || !this.targetPosition) {
        return
      }

      this.moveItem({
        itemId: this.selectedItem.id,
        targetListId: this.targetList.id,
        targetIndex: this.targetPosition - 1
      })

      if (this.targetBoard.id !== this.selectedBoard.id) {
        this.$emit('item-moved-to-another-board')
      }

      this.isOpen = false
    }
  },
  watch: {
    async targetBoard (newVal) {
      if (newVal.id === this.selectedBoard.id) {
        this.targetList = this.selectedItemList
        this.targetPosition = this.selectedItemIndex + 1
        return
      }

      await this.loadBoardOfId(newVal.id)
      this.targetList = this.boardOfId(newVal.id).lists[0]
      this.targetPosition = 1
    },
    targetList (newVal) {
      if (!newVal) {
        return null
      }

      if (newVal.id === this.selectedItemList.id) {
        this.targetPosition = this.selectedItemIndex + 1
        return
      }

      this.targetPosition = 1
    }
  }
}
</script>

<style scoped>
.menu__header {
  height: 30px;
}

.menu__close-btn {
  top: 0;
  right: 0;
}
</style>
