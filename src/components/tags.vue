<template>
  <div>
    <div>
      <label>Choose tag :</label>
      <a-select style="width: 500px" v-model="selectedTagModel" showSearch>
        <a-select-option :key="tag.name" :value="tag.name" v-for="tag in list"
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

  methods: mapActions('tags', ['getList', 'onSelectTag']),

  async created() {
    await this.getList()
  }
}
</script>
