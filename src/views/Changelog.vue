<template>
  <div>
    <a-row type="flex" justify="center" class="tags">
      <Tags />
    </a-row>

    <a-row :gutter="16">
      <a-col :span="24">
        <Commits />
      </a-col>
    </a-row>

    <a-row type="flex" justify="center" class="transfer">
      <a-col :span="4">
        <Transfer />
      </a-col>
    </a-row>

    <a-row type="flex" justify="center" class="transfer">
      <a-col :span="12">
        <FurtherInformations />
      </a-col>
    </a-row>

    <a-row :gutter="48">
      <a-col :span="12">
        <Changelog />
      </a-col>
      <a-col :span="12">
        <Preview />
      </a-col>
    </a-row>

    <a-row type="flex" justify="center" class="channels">
      <Channels />
    </a-row>

    <a-row type="flex" justify="center" class="send">
      <Send />
    </a-row>
  </div>
</template>

<script>
import Commits from '@/components/commits.vue'
import Changelog from '@/components/changelog.vue'
import Channels from '@/components/channels.vue'
import Transfer from '@/components/transfer.vue'
import Preview from '@/components/preview.vue'
import Send from '@/components/send.vue'
import FurtherInformations from '@/components/furtherInformations.vue'
import Tags from '@/components/tags'

export default {
  name: 'Changelog',
  components: {
    Commits,
    Channels,
    Transfer,
    Changelog,
    Preview,
    Send,
    FurtherInformations,
    Tags
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.tags {
  margin-top: 10px;
  margin-bottom: 30px;
}

.transfer {
  margin-bottom: 40px;
}

.channels {
  margin-top: 40px;
}

.send {
  margin-top: 20px;
}
</style>
