<template>
  <v-card
      v-if="list"
      class="mx-auto"
      width="270"
      outlined
  >
    <ListCardTitle :list="list"/>
    <ListCardContent :list="list"/>
    <ItemCreationButton :list-id="listId"/>
  </v-card>
</template>

<script>
import ListCardTitle from '@/components/list/ListCardTitle'
import ListCardContent from '@/components/list/ListCardContent'
import ItemCreationButton from '@/components/item/ItemCreationButton'
import { mapGetters } from 'vuex'

export default {
  name: 'ListCard',
  components: {
    ListCardTitle,
    ListCardContent,
    ItemCreationButton
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
    ...mapGetters('boards', ['listOfId'])
  }
}
</script>

<style scoped>
</style>
