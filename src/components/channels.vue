<template>
  <div>
    <div>
      <label>Choose channels :</label>
      <a-select mode="tags" style="width: 350px" v-model="channel">
        <a-select-option
          :key="channel.id"
          :value="channel.id"
          v-for="channel in list"
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

  methods: mapActions('channels', ['getList']),

  async created() {
    await this.getList()
  }
}
</script>
