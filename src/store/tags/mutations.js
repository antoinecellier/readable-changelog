import keyBy from 'lodash/keyBy'
import { max, isBefore } from 'date-fns'

export default {
  setList: (state, list) => (state.list = list),
  setListByName: (state, list) => (state.listByName = keyBy(list, 'name')),
  setListByDate: (state, list) =>
    (state.listByDate = keyBy(list, 'pushedDate')),
  setRepositoryCreatedDate: (state, date) =>
    (state.repositoryCreatedDate = date),
  setSelectedTag: (state, selectedTag) => (state.selectedTag = selectedTag),
  setLastCommitDateToRetrieve: state => {
    const isPastOfOldTagDate = state.list
      .filter(tag =>
        isBefore(tag.pushedDate, state.listByName[state.selectedTag].pushedDate)
      )
      .map(({ pushedDate }) => pushedDate)

    state.lastCommitDateToRetrieve = isPastOfOldTagDate.length
      ? max(...isPastOfOldTagDate).toISOString()
      : state.repositoryCreatedDate
  }
}
