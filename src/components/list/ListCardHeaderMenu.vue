<template>
  <v-menu
      close-on-click
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

    <v-list min-width="150" dense>
      <v-subheader class="justify-center">List Menu</v-subheader>
      <v-divider></v-divider>
      <v-list-item-group class="text-subtitle-2">
        <v-list-item><span class="menu--item">Move</span></v-list-item>
        <v-list-item @click="archiveList(listId)"><span class="menu--item">Archive</span></v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ListCardHeaderMenu',
  props: {
    listId: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapActions('boards', ['archiveList'])
  }
}
</script>

<style scoped>
.menu--item {
  color: #616161;
}
</style>
