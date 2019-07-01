import HistoricDB from '@/firebase/historic-db'

export default {
  getList: async ({ commit, rootState }) => {
    const historicDb = new HistoricDB(rootState.authentication.user.id)
    const list = await historicDb.readAll()
    commit('setList', list)
  },
  add: async ({ rootState }, changelog) => {
    const { channels: channelsState } = rootState
    const historicDb = new HistoricDB(rootState.authentication.user.id)
    await historicDb.create({
      changelog,
      channels: channelsState.selectedChannels.map(
        id => channelsState.listById[id]
      ),
      message: rootState.commits.messageWithChangelog
    })
  }
}
