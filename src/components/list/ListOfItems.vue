<template>
  <v-card
      v-if="list"
      class="mx-auto"
      width="270"
      outlined
  >
    <v-card-title class="pa-1 list__title">
      {{ list.title }}
    </v-card-title>
    <v-list
        dense
        class="list__content"
        :color="list.items.length === 0 ? 'white' : '#FAFBE6'"
    >
      <draggable
          :list="list.items"
          group="items"
          ghost-class="item--ghost"
          chosen-class="item--chosen"
          drag-class="item--drag"
          :empty-insert-threshold="50"
          @start="dragStarted"
          @end="dragStopped"
          force-fallback="true"
      >
        <v-list-item
            v-for="item in list.items"
            :key="item.id"
            :ripple="false"
            class="no-transition fill-width pa-0"
        >
          <v-hover v-slot="{ hover }">
            <div
                :class="[
                  'item',
                  'fill-width',
                  'pa-2',
                  hover && !dragging ? 'item--hover': ''
                ]"
            >
              {{ item.title }}
            </div>
          </v-hover>
        </v-list-item>
      </draggable>
    </v-list>
    <ListFooter :list-id="listId"/>
  </v-card>
</template>

<script>
import draggable from 'vuedraggable';
import ListFooter from '@/components/list/ListFooter'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "ListOfItems",
  components: {
    draggable,
    ListFooter
  },
  props: {
    listId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: null
    }
  },
  mounted() {
    this.list = this.listOfId(this.listId)
  },
  computed: {
    ...mapGetters('draggable', ['dragging']),
    ...mapGetters('boards', ['listOfId'])
  },
  methods: {
    ...mapActions('draggable', ['dragStarted', 'dragStopped'])
  }
}
</script>

<style scoped>
.item {
  background: linear-gradient(to right, var(--v-primary-base) 3px, white 0);
  border: 1px solid lightgrey;
  border-radius: 5px;
  margin: 1px 5px 1px 5px ;
  min-height: 40px;
}

.item--chosen {
  opacity: 1 !important;
}

.item--ghost {
  visibility: hidden;
}

.item--hover {
  background: linear-gradient(to right, var(--v-primary-base) 3px, #f1f1f1 0);
}

.item--drag div {
  background: var(--v-primary-base);
  color: white;
}

.list__content {
  padding: 1px;
  cursor: pointer;
}

.list__title {
  font-size: 16px;
  cursor: pointer;
}
</style>
