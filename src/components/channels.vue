<template>
  <div>
    <div>
      <label>Choose channels :</label>
      <a-select v-model="channel" mode="tags" style="width: 350px">
        <a-select-option
          v-for="channel in list"
          :key="channel.id"
          :value="channel.id"
          >{{ channel.name }}</a-select-option
        >
      </a-select>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Channels',
  computed: {
    ...mapState('channels', ['list', 'selectedChannels']),
    channel: {
      get() {
        return this.selectedChannels
      },
      set(value) {
        this.$store.commit('channels/setSelectedChannels', value)
      }
    }
  },
  async created() {
    await this.getList()
  },
  methods: mapActions('channels', ['getList'])
}
</script>
