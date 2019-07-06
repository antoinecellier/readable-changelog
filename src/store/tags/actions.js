import { GraphQLClient } from 'graphql-request'

const githubEndPoint = 'https://api.github.com/graphql'
const githubToken = process.env.VUE_APP_GITHUB_TOKEN

const graphQLClient = new GraphQLClient(githubEndPoint, {
  headers: {
    authorization: `Bearer ${githubToken}`
  }
})

const getFirstCommitQuery = async () => {
  const rep = await fetch(
    'https://api.github.com/search/commits?q=repo:zenika/ices+AND:sort:committer-date-asc',
    {
      headers: {
        authorization: `Bearer ${githubToken}`,
        Accept: 'application/vnd.github.cloak-preview'
      }
    }
  )
  const json = await rep.json()
  const {
    sha,
    commit: {
      author: { date }
    }
  } = json.items[0]
  return { name: 'FIRST_COMMIT', oid: sha, pushedDate: date }
}

const tagsQuery = `{
  repository(name: "ices", owner: "Zenika") {
    tags: refs(refPrefix: "refs/tags/",  last: 100) {
      edges {
        node {
          name
          repository{
            createdAt
          }
          target {    
            ... on Commit {
              oid
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
    const firstCommit = await getFirstCommitQuery()
    const response = await graphQLClient.request(tagsQuery)
    const tags = response.repository.tags.edges.map(
      ({
        node: {
          name,
          target: { pushedDate, oid }
        }
      }) => ({
        name,
        pushedDate,
        oid
      })
    )
    const tagsAndFirstCommit = [firstCommit, ...tags]

    commit('setList', tagsAndFirstCommit)
    commit('setListByName', tagsAndFirstCommit)
    commit('setListByDate', tagsAndFirstCommit)
    commit(
      'setRepositoryCreatedDate',
      response.repository.tags.edges[0].node.repository.createdAt
    )
  },

  onSelectTag: ({ commit, dispatch }, tagName) => {
    commit('setSelectedTag', tagName)
    commit('setPreviousTag')
    dispatch('commits/getList', null, { root: true })
  }
}
