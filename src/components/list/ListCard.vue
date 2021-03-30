<template>
  <v-card
      v-if="list"
      class="mx-auto"
      width="270"
      outlined
  >
    <ListCardHeader :list="list"/>
    <ListCardContent :list="list"/>
    <ListCardFooter :list-id="listId"/>
  </v-card>
</template>
<script>
import ListCardHeader from '@/components/list/ListCardHeader'
import ListCardContent from '@/components/list/ListCardContent'
import ListCardFooter from '@/components/list/ListCardFooter'
import { mapGetters } from 'vuex'

export default {
  name: 'ListCard',
  components: {
    ListCardHeader,
    ListCardContent,
    ListCardFooter
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
