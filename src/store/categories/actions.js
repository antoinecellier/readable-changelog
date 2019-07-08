const { WebClient } = require('@slack/web-api')

const slackToken = process.env.VUE_APP_SLACK_TOKEN

const web = new WebClient(slackToken)

export default {
  getList: async ({ commit }) => {
    const { channels } = await web.channels.list()
    const channelsFormated = channels.map(({ id, name_normalized }) => ({
      id,
      name: name_normalized
    }))

    commit('setList', channelsFormated)
    commit('setListById', channelsFormated)
  },
  postMessage: async ({ state, rootGetters, rootState, dispatch }) => {
    state.selectedChannels.forEach(async channel => {
      await web.chat.postMessage({
        username: 'Zenika',
        channel: channel,
        text: rootGetters['commits/changelogPreview'],
        mrkdwn: true
      })
    })
    dispatch('historic/add', rootState.commits.changelog, { root: true })
  }
}
