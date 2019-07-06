const getPreviousTag = state => state.listByName[state.previousTag]

const getSelectedTag = state => state.listByName[state.selectedTag]

export default {
  getPreviousTag,
  getSelectedTag
}
