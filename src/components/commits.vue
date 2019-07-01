<template>
  <div>
    <a-table
      :row-selection="{
        selectedRowKeys: selectedCommitsKeys,
        onChange: onSelectCommit
      }"
      :data-source="commitsNotSended"
      :pagination="{ defaultPageSize: 5 }"
    >
      <a-table-column key="title" title="Commit" data-index="title" />
      <a-table-column
        key="pushedDate"
        title="Pushed Date"
        data-index="pushedDate"
      />
      <a-table-column key="action">
        <template slot-scope="record">
          <span>
            <a-tooltip placement="left">
              <template slot="title">
                <span>Pull request detail</span>
              </template>
              <a-button
                :disabled="!record.pullRequest"
                @click="goTo(record.pullRequest)"
              >
                <a-icon type="branches" />
              </a-button>
            </a-tooltip>
            <a-tooltip placement="right">
              <template slot="title">
                <span>Commit detail</span>
              </template>
              <a-button @click="goTo(record.url)">#</a-button>
            </a-tooltip>
          </span>
        </template>
      </a-table-column>
    </a-table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Commits',

  computed: {
    ...mapState('commits', ['commitsNotSended', 'selectedCommitsKeys'])
  },

  methods: {
    ...mapActions('commits', ['onSelectCommit']),
    goTo(url) {
      window.open(url, '_blank')
    }
  }
}
</script>
