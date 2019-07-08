<template>
  <a-row type="flex" justify="space-around" :gutter="24">
    <a-col :span="5">
      <Category />
    </a-col>
  </a-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Category from '@/components/Category'

export default {
  components: {
    Category
  },
  computed: {
    ...mapState('categories', ['list'])
  },
  async created() {
    await this.getList()
  },
  methods: {
    ...mapActions('categories', ['getList'])
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
