<template>
  <div class="d-flex justify-space-between">
    <ListCardHeaderTitle :list="list"/>
    <ListCardHeaderMenu :list-id="list.id"/>
  </div>
</template>

<script>
import ListCardHeaderTitle from '@/components/list/ListCardHeaderTitle'
import ListCardHeaderMenu from '@/components/list/ListCardHeaderMenu'

export default {
  name: 'ListCardHeader',
  components: {
    ListCardHeaderTitle,
    ListCardHeaderMenu
  },
  props: {
    list: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
