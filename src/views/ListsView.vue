<template>
  <v-container fluid>
    <div class="text-h6 pa-2" style="color: black;">Sprint 1</div>
    <br>
    <draggable
        :list="lists"
        class="row row--dense flex-nowrap"
        ghost-class="ghost"
        chosen-class="chosen"
        drag-class="drag"
        force-fallback="true"
    >
      <v-col
          v-for="list in lists"
          :key="list.id"
          class="fill-height pa-0 ml-3"
          cols="auto"
      >
        <ItemList :list="list"/>
      </v-col>
    </draggable>
  </v-container>
</template>

<script>
import draggable from 'vuedraggable'
import ItemList from '@/components/ItemList'

export default {
  name: "Lists",
  components: {
    draggable,
    ItemList
  },
  data: () => ({
    lists: [
      {title: "To Do", items: [{id: 0, title: 'Task A'}, {id: 1, title: 'Task D'}, {id: 2, title: 'Task G'}], id: 0},
      {title: "Doing", items: [{id: 3, title: 'Task B'}, {id: 4, title: 'Task C'}, {id: 5, title: 'Task F'}], id: 1},
      {title: "Testing", items: [{id: 3, title: 'Task K'}, {id: 4, title: 'Task L'}, {id: 5, title: 'Task M'}], id: 2},
      {title: "Waiting Deploy", items: [{id: 3, title: 'Task N'}, {id: 4, title: 'Task O'}, {id: 5, title: 'Task P'}], id: 3},
      {title: "Done", items: [{id: 3, title: 'Task H'}, {id: 4, title: 'Task I'}, {id: 5, title: 'Task J'}], id: 4}
    ]
  })
}
</script>

<style scoped>

</style>
