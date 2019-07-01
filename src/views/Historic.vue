<template>
  <div>
    <h1>List of changelogs sent</h1>
    <a-list item-layout="vertical" size="large" :data-source="list">
      <a-list-item slot="renderItem" key="item.id" slot-scope="item">
        Sent at {{ item.createTimestamp }}
        <a-tag
          v-for="channel in item.channels"
          :key="channel.id"
          color="blue"
          >{{ channel.name }}</a-tag
        >
        <div v-html="changelogPreview(item)"></div>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import marked from 'marked'

export default {
  name: 'Historic',

  computed: {
    ...mapState('historic', ['list'])
  },
  async created() {
    await this.getList()
  },
  methods: {
    ...mapActions('historic', ['getList']),
    changelogPreview({ message, changelog = [] }) {
      let preview = `${message}
      `
      changelog.forEach(feature => {
        preview = `${preview}
      - ${feature.title}`
      })
      return marked(preview, { sanitize: true })
    }
  }
}
</script>
