<template>
      <v-card
          class="mx-auto ma-0"
          width="270"
          raised
          elevation="16"
      >
        <v-card-title class="pa-1 card-title">
          {{'\u00A0' + list.title }}
        </v-card-title>
        <v-list
            dense
            class="list"
        >
            <draggable
                :list="list.items"
                group="items"
                ghost-class="ghost"
                chosen-class="chosen"
                force-fallback="true"
            >
              <v-list-item
                  v-for="item in list.items"
                  :key="item.id"
                  :ripple="false"
                  class="no-transition list-item pa-2"
              >

                <v-list-item-content transition="none">
                  <v-list-item-title
                      transition="none"
                      class="item-title"
                  >
                    {{ item.title }}
                    <div
                        style="height: 2px;
                         width: 90%;
                          background-image: linear-gradient(to right, #DA274F , white);"
                    >
                      {{'\u00A0'}}
                    </div>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </draggable>
        </v-list>
        <button class="pa-1">
          Add
        </button>
      </v-card>
</template>

<script>
import draggable from 'vuedraggable';
export default {
  name: "ItemList",
  components: {
    draggable
  },
  props: {
    list: { type: Object }
  },
  data: () => ({
    enabled: true
  })
}
</script>

<style scoped>
.ghost {
  visibility: hidden;
}

.chosen {
  opacity: 0.8;
}

.list-item {
  background: white;
  border-color: white !important;
  border: 1px solid;
  margin: 1px;
}

.item-title {
  font-size: 15px !important;
  color: #4b4b4b;
}

.list {
  padding: 1px;
  border-width: 1px;
  background: white;
  cursor: pointer;
}
.card-title{
  font-size: 16px;
  font-weight: bolder
}
</style>
