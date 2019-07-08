<template>
  <a-row type="flex" justify="space-around" :gutter="24">
    <a-col :span="5">
      <Category />
    </a-col>
    <a-col :span="5">
      <Category />
    </a-col>
    <a-col :span="5">
      <Category />
    </a-col>
  </a-row>
</template>

<script>
import Category from '@/components/Category'

export default {
  components: {
    Category
  }
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
