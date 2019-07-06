import keyBy from 'lodash/keyBy'
import { max, isBefore, isEqual } from 'date-fns'

export default {
  setList: (state, list) => (state.list = list),
  setListByName: (state, list) => (state.listByName = keyBy(list, 'name')),
  setListByDate: (state, list) =>
    (state.listByDate = keyBy(list, 'pushedDate')),
  setRepositoryCreatedDate: (state, date) =>
    (state.repositoryCreatedDate = date),
  setSelectedTag: (state, selectedTag) => (state.selectedTag = selectedTag),
  setPreviousTag: state => {
    const previousDateTags = state.list
      .filter(tag =>
        isBefore(tag.pushedDate, state.listByName[state.selectedTag].pushedDate)
      )
      .map(({ pushedDate }) => pushedDate)
    if (previousDateTags.length) {
      const previousDateTag = max(...previousDateTags)
      state.previousTag = state.list.find(tag =>
        isEqual(tag.pushedDate, previousDateTag)
      ).name
    } else {
      state.previousTag = 'FIRST_COMMIT'
    }
  }
}
