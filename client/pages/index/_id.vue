<template>
  <client-only>
    <div>
      <template v-if="!loading">
        <pre>{{ Post }}</pre>
      </template>
      <template v-else>Loading...</template>
    </div>
  </client-only>
</template>
<script>
import gql from 'graphql-tag'
export default {
  name: 'PostDetail',
  data() {
    return {
      loading: 0,
    }
  },
  fetch({ redirect, route }) {
    if (!route.params.id) {
    }
  },
  /** Starting Graph QL */
  apollo: {
    $loadingKey: 'loading',
    // Post
    Post: {
      query: gql`
        query getPost($id: ID) {
          Post(id: $id) {
            id
            text
            title
            createdAt
            updatedAt
            comments {
              id
              text
              updatedAt
              createdAt
              user {
                id
                name
              }
            }
            _commentsMeta {
              count
            }
          }
        }
      `,
      variables() {
        return {
          id: this.$route.params.id,
        }
      },
    },
  },
  /** End of Graph QL */
}
</script>
