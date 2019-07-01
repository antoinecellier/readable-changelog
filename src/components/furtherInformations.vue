<template>
  <div>
    <label>Further informations :</label>
    <a-textarea
      v-model="message"
      placeholder="Message with changelog"
      :autosize="{ minRows: 4, maxRows: 4 }"
    />

    <div class="ping-info">
      <a-alert
        message="Use '<!channel>' for ping channel"
        type="info"
        showIcon
      />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('commits', ['messageWithChangelog']),
    message: {
      get() {
        return this.messageWithChangelog
      },
      set(value) {
        this.$store.commit('commits/setMessageWithChangelog', value)
      }
    }
  }
}
</script>
<style scoped>
.ping-info {
  margin: 0, 5px, 0, 5px;
}
</style>
