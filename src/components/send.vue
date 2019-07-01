<template>
  <a-button type="primary" size="large" @click="send">
    <a-icon type="slack" />Send changelog to slack
  </a-button>
</template>
<script>
export default {
  methods: {
    send() {
      this.$store.dispatch('channels/postMessage')
    }
  }
}
</script>
