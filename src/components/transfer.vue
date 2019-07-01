<template>
  <a-button
    :disabled="noCommitsSelected"
    type="primary"
    size="large"
    @click="onTransferToChangeLog"
  >
    <a-icon type="plus" />Add commits to changelog
  </a-button>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  methods: mapActions('commits', ['onTransferToChangeLog']),
  computed: mapGetters('commits', ['noCommitsSelected'])
}
</script>
