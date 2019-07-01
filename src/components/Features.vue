<template>
  <div>
    <a-table :data-source="changelog" :pagination="{ defaultPageSize: 5 }">
      <a-table-column key="title" title="Logs">
        <template slot-scope="record">
          <a-input
            style="margin-bottom: 5px"
            :value="record.title"
            @change="
              e => setChangelogTitle({ title: e.target.value, key: record.key })
            "
          />
          <span v-if="record.commitName" class="commit-name"
            >Original title: {{ record.commitName }}</span
          >
        </template>
      </a-table-column>
      <a-table-column key="action">
        <template slot-scope="record">
          <span>
            <a-button @click="onRemoveChangelogRow(record.key)">
              <a-icon type="close" />
            </a-button>
          </span>
        </template>
      </a-table-column>
    </a-table>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'Features',

  computed: {
    ...mapState('commits', ['changelog'])
  },
  methods: {
    ...mapActions('commits', ['onRemoveChangelogRow']),
    ...mapMutations('commits', ['setChangelogTitle'])
  }
}
</script>
<style scoped>
.commit-name {
  margin-top: 7px;
  font-size: 11px;
}
</style>
