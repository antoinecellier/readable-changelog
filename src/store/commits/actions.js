//import { GraphQLClient } from 'graphql-request'
import { format } from 'date-fns'

// const githubEndPoint = 'https://api.github.com/graphql'
const githubToken = process.env.VUE_APP_GITHUB_TOKEN

// const graphQLClient = new GraphQLClient(githubEndPoint, {
//   headers: {
//     authorization: `Bearer ${githubToken}`
//   }
// })

const getCommits = async (selectedTag, previousTag) => {
  const rep = await fetch(
    `https://api.github.com/repos/zenika/ices/compare/${previousTag}...${selectedTag}`,
    {
      headers: {
        authorization: `Bearer ${githubToken}`,
        Accept: 'application/vnd.github.cloak-preview'
      }
    }
  )
  const json = await rep.json()
  return json.commits.map(({ commit, sha, html_url }) => ({
    key: sha,
    title: commit.message,
    url: html_url,
    pushedDate: format(commit.committer.date, 'MM/DD/YYYY')
  }))
}

// const query = commits =>
//   commits
//     .map(
//       ({ key, url }) => `
//   ${key.replace(/[0-9]/g, '')}:resource(url: "${url}") {
//     resourcePath
//     url
//     ... on Commit {
//       id
//       history {
//         pageInfo {
//           hasNextPage
//         }
//         edges {
//           node {
//             messageHeadlineHTML
//             oid
//             message
//             url
//             pushedDate
//             associatedPullRequests(first: 1) {
//               edges {
//                 node {
//                   url
//                 }
//               }
//             }
//             author {
//               name
//               email
//               date
//             }
//           }
//         }
//       }
//     }
//   }

// `
//     )
//     .join(' ')

export default {
  getList: async ({ commit, rootGetters }) => {
    const commits = await getCommits(
      rootGetters['tags/getSelectedTag'].oid,
      rootGetters['tags/getPreviousTag'].oid
    )

    // await graphQLClient.request(`{ ${query(commits)} }`)

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
