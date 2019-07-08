import keyBy from 'lodash/keyBy'

export default {
  setList: (state, list) => (state.list = list),
  setListById: (state, list) => (state.listById = keyBy(list, 'id')),

  setSelectedChannels: (state, selectedChannels) =>
    (state.selectedChannels = selectedChannels)
}
