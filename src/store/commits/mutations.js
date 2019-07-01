import keyBy from 'lodash/keyBy'

export default {
  setList: (state, list) => (state.list = list),
  setListByKey: (state, list) => (state.listByKey = keyBy(list, 'key')),

  setCommitsNotSended: (state, commitsNotSended) =>
    (state.commitsNotSended = commitsNotSended),
  addCommitNotSended: (state, key) => {
    state.commitsNotSended = [...state.commitsNotSended, state.listByKey[key]]
  },

  setSelectedCommitsKeys: (state, keys) => (state.selectedCommitsKeys = keys),
  cleanSelectedCommitsKeys: state => (state.selectedCommitsKeys = []),

  fromCommitsToChangelog: state => {
    const { selectedCommitsKeys } = state
    state.changelog = [
      ...state.changelog,
      ...selectedCommitsKeys.map(key => state.listByKey[key])
    ]

    state.commitsNotSended = state.commitsNotSended.filter(
      ({ key }) => !selectedCommitsKeys.includes(key)
    )
  },

  setChangelogTitle: (state, { title, key }) => {
    state.changelog = state.changelog.map(log => {
      if (log.key === key) {
        return {
          ...log,
          title,
          ...(!log.commitName && { commitName: log.title })
        }
      }
      return log
    })
  },

  formatChangelogWithoutGitRef: state =>
    (state.changelog = state.changelog.map(log => ({
      ...log,
      title: log.title.replace(/(\(#\d+\))$/gi, '')
    }))),

  removeChangelogKey: (state, removedKey) => {
    state.changelog = state.changelog.filter(({ key }) => key !== removedKey)
  },

  setMessageWithChangelog: (state, message) =>
    (state.messageWithChangelog = message)
}
