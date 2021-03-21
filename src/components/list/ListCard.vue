<template>
  <v-card
      v-if="list"
      class="mx-auto"
      width="270"
      outlined
  >
    <ListCardHeader :list="list"/>
    <ListCardContent :list="list"/>
    <ItemCreationButtons :list-id="listId"/>
  </v-card>
</template>
<script>
import ListCardHeader from '@/components/list/ListCardHeader'
import ListCardContent from '@/components/list/ListCardContent'
import ItemCreationButtons from '@/components/item/ItemCreationButtons'
import { mapGetters } from 'vuex'

export default {
  name: 'ListCard',
  components: {
    ListCardHeader,
    ListCardContent,
    ItemCreationButtons
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
