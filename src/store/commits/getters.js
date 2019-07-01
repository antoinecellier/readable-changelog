import keyBy from 'lodash/keyBy'
import marked from 'marked'

const getCommitsByIod = state => keyBy(state.commits, 'iod')

const changelogPreview = state => {
  let preview = `${state.messageWithChangelog}
  `
  state.changelog.forEach(feature => {
    preview = `${preview}
    - ${feature.title}`
  })
  return preview
}

const changeLogPreviewForHtml = state => {
  return marked(changelogPreview(state), { sanitize: true })
}

const noCommitsSelected = state => !state.selectedCommitsKeys.length

export default {
  getCommitsByIod,
  changelogPreview,
  changeLogPreviewForHtml,
  noCommitsSelected
}
