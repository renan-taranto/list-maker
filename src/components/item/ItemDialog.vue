<template>
  <v-dialog
      v-if="selectedItem !== null"
      v-model="isVisible"
      :max-width="dialogWidth"
  >
    <v-card class="item-card">
      <v-container class="pt-0">
        <v-row>
          <v-col cols="10">
            <div class="d-flex">
              <v-icon>mdi-id-card</v-icon>
              <ItemDialogTitle class="ml-3" :item="selectedItem"/>
            </div>
          </v-col>
          <v-col cols="2">
            <v-icon
                class="float-right"
                @click="isVisible = false"
            >
              mdi-close
            </v-icon>
          </v-col>
        </v-row>
        <v-card-subtitle class="pa-0 pl-1 text-caption">
          on list <span class="text-decoration-underline">{{ selectedItemList.title }}</span>
        </v-card-subtitle>
        <v-row>
          <v-col cols="12" sm="9">
            <v-row class="ml-1">
              <v-icon small>mdi-text</v-icon>
              <span class="ml-1 text-button">Description</span>
            </v-row>
            <v-row class="mt-0 mr-0 ml-4 pl-1 pr-1 pt-0">
              <ItemDialogDescription class="fill-width" :item="selectedItem"/>
            </v-row>
          </v-col>

          <v-col cols="12" sm="3">
            <v-row class="ml-1 mt-4 mt-sm-0 mr-2" :justify="'end'">
              <v-icon small>mdi-pencil</v-icon>
              <span class="text-button">Actions</span>
            </v-row>
            <v-row class="mt-0 mr-0 ml-0 pl-1 pr-1 pt-0" :justify="'end'">
              <div class="d-flex flex-sm-column">
                <ItemDialogMovingMenu @item-moved-to-another-board="isVisible = false"/>
                <v-btn
                    small
                    color="primary"
                    width="85"
                    class="mt-sm-1"
                    @click="archiveItem(selectedItem.id)"
                >
                  Archive
                </v-btn>
              </div>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ItemDialogTitle from '@/components/item/ItemDialogTitle'
import ItemDialogDescription from '@/components/item/ItemDialogDescription'
import ItemDialogMovingMenu from '@/components/item/ItemDialogMovingMenu'

export default {
  name: 'ItemDialog',
  data() {
    return {
      isVisible: null
    }
  },
  components: {
    ItemDialogTitle,
    ItemDialogDescription,
    ItemDialogMovingMenu
  },
  computed: {
    ...mapGetters('boards', ['selectedItem', 'selectedItemList']),
    dialogWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return '100%'
        case 'sm':
          return '100%'
        case 'md':
          return '65%'
        default:
          return '40%'
      }
    }
  },
  methods: {
    ...mapActions('boards', ['selectItem', 'archiveItem']),
  },
  watch: {
    isVisible(val) {
      if (val !== true) {
        this.selectItem(null)
      }
    },
    selectedItem(val) {
      this.isVisible = val !== null
    }
  }
}
</script>

<style scoped>
.item-card {
  background: linear-gradient(to right, var(--v-primary-base) 3px, white 0);
  border-radius: 5px;
}
</style>
