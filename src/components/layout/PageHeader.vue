<template>
  <div class="page-header">
    <div class="page-header__content">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageHeader'
}
</script>

<style scoped>
.page-header {
  height: 55px;
}

.page-header__content {
  position: fixed;
  width: 100%;
}
</style>
