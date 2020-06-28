<template>
  <client-only>
    <div>
      <v-card white>
        <v-card-title primary-title>Post Detail</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <template v-if="!loading && post">
            <v-card-title primary-title>{{ post.title }}</v-card-title>
            <div>{{ post.description }}</div>
          </template>
          <template v-else>Loading...</template>
        </v-card-text>
      </v-card>
      <!-- <pre>{{ post }}</pre> -->
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
    post: {
      query: gql`
        query getPost($id: ID) {
          post(id: $id) {
            id
            title
            description
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
