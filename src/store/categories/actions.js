import CategoriesDB from '@/firebase/categories-db'

export default {
  getList: async ({ commit, rootState }) => {
    const categoriesDb = new CategoriesDB(rootState.authentication.user.id)
    const list = await categoriesDb.readAll()
    commit('setList', list)
  },
  add: async (_, category) => {
    //const categoriesDb = new CategoriesDB(rootState.authentication.user.id)
    console.log(category)
    // await historicDb.create({
    //   changelog,
    //   channels: channelsState.selectedChannels.map(
    //     id => channelsState.listById[id]
    //   ),
    //   message: rootState.commits.messageWithChangelog
    // })
  }
}
