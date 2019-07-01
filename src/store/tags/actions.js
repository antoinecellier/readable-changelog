import { GraphQLClient } from 'graphql-request'

const githubEndPoint = 'https://api.github.com/graphql'
const githubToken = process.env.VUE_APP_GITHUB_TOKEN

const graphQLClient = new GraphQLClient(githubEndPoint, {
  headers: {
    authorization: `Bearer ${githubToken}`
  }
})

const query = `{
  repository(name: "ices", owner: "Zenika") {
    tags: refs(refPrefix: "refs/tags/",  last: 30) {
      edges {
        node {
          name
          repository{
            createdAt
          }
          target {    
            ... on Commit {
              pushedDate
            }
          }
        }
      }
    }
  }
}`

export default {
  getList: async ({ commit }) => {
    const response = await graphQLClient.request(query)
    const tags = response.repository.tags.edges.map(
      ({
        node: {
          name,
          target: { pushedDate }
        }
      }) => ({
        name,
        pushedDate
      })
    )

    commit('setList', tags)
    commit('setListByName', tags)
    commit('setListByDate', tags)
    commit(
      'setRepositoryCreatedDate',
      response.repository.tags.edges[0].node.repository.createdAt
    )
  },

  onSelectTag: ({ commit, dispatch }, tagName) => {
    commit('setSelectedTag', tagName)
    commit('setLastCommitDateToRetrieve')
    dispatch('commits/getList', null, { root: true })
  }

  // onTransferToChangeLog: ({ commit }) => {
  //   commit("fromCommitsToChangelog");
  //   commit("cleanSelectedCommitsKeys");
  //   commit("formatChangelogWithoutGitRef");
  // },

  // onRemoveChangelogRow: ({ commit }, key) => {
  //   commit("removeChangelogKey", key);
  //   commit("addCommitNotSended", key);
  // }
}
