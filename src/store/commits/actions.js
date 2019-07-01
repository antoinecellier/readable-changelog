import { GraphQLClient } from 'graphql-request'
import { format } from 'date-fns'

const githubEndPoint = 'https://api.github.com/graphql'
const githubToken = process.env.VUE_APP_GITHUB_TOKEN

const graphQLClient = new GraphQLClient(githubEndPoint, {
  headers: {
    authorization: `Bearer ${githubToken}`
  }
})

const query = since => `{
    repository(name: "ices", owner: "Zenika") {
        ref(qualifiedName: "master") {
        target {
            ... on Commit {
            id
            history(since: "${since}") {
                pageInfo {
                  hasNextPage
                }
                edges {
                  node {
                    messageHeadlineHTML
                    oid
                    message
                    url
                    pushedDate
                    associatedPullRequests(first: 1){
                      edges{
                        node{
                          url
                        }
                      }
                    }
                    author {
                      name
                      email
                      date
                    }
                  }
                }
            }
            }
        }
        }
    }
}`

export default {
  getList: async ({ commit, rootState }) => {
    const response = await graphQLClient.request(
      query(rootState.tags.lastCommitDateToRetrieve)
    )
    const commits = response.repository.ref.target.history.edges.map(
      ({
        node: {
          oid,
          messageHeadlineHTML,
          url,
          pushedDate,
          associatedPullRequests: { edges: pullRequests = [] }
        }
      }) => ({
        key: oid,
        title: messageHeadlineHTML.replace(/(<([^>]+)>)/gi, ''),
        url,
        pushedDate: format(pushedDate, 'DD/MM/YYYY'),
        pullRequest: pullRequests.length && pullRequests[0].node.url
      })
    )

    commit('setList', commits)
    commit('setListByKey', commits)
    commit('setCommitsNotSended', commits)
  },

  onSelectCommit: ({ commit }, keys) => {
    commit('setSelectedCommitsKeys', keys)
  },

  onTransferToChangeLog: ({ commit }) => {
    commit('fromCommitsToChangelog')
    commit('cleanSelectedCommitsKeys')
    commit('formatChangelogWithoutGitRef')
  },

  onRemoveChangelogRow: ({ commit }, key) => {
    commit('removeChangelogKey', key)
    commit('addCommitNotSended', key)
  }
}
