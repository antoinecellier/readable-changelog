<template>
  <div>
    <div>
      <label>Choose tag :</label>
      <a-select v-model="selectedTagModel" style="width: 500px" show-search>
        <a-select-option v-for="tag in list" :key="tag.name" :value="tag.name"
          >{{ tag.name }} ({{ tag.pushedDate }})</a-select-option
        >
      </a-select>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Tags',

  computed: {
    ...mapState('tags', ['list', 'selectedTag']),
    selectedTagModel: {
      get() {
        return this.selectedTag
      },
      set(value) {
        this.onSelectTag(value)
      }
    }
  },
  async created() {
    await this.getList()
  },
  methods: mapActions('tags', ['getList', 'onSelectTag'])
}
</script>
