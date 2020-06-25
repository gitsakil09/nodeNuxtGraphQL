<template>
  <v-layout justify-center align-center>
    <v-flex xs12 sm12 md8 offset-md-2>
      <v-card>
        <v-card-title primary-title>List of Posts</v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12 sm6 md6>
              <template v-for="post in allPosts">
                <nuxt-link :to="post.id">
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title>{{post.title}}</v-list-item-title>
                      <v-list-item-subtitle>Comments: {{post._commentsMeta.count}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </nuxt-link>
              </template>
            </v-flex>
            <!-- Right Column fr Detail Post -->
            <v-flex xs12 sm6 md6>
              <nuxt-child :key="$route.params.id" v-if="$route.params.id"></nuxt-child>
              <template v-else>Select Post to see the detail</template>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
      <!-- Right Drawer to Add Post -->
      <v-navigation-drawer v-model="addPostDrawer" temporary fixed right width="30%">
        <v-card>
          <v-card-title primary-title>Add post</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field name="Title" label="Title"></v-text-field>
            </v-form>
          </v-card-text>
        </v-card>
      </v-navigation-drawer>
    </v-flex>
  </v-layout>
</template>

<script>
import gql from 'graphql-tag'
export default {
  name: 'Main',
  data() {
    return {
      addPostDrawer: true
    }
  },
  /** Starting Graph QL */
  apollo: {
    // Posts
    allPosts: gql`
      query {
        allPosts {
          id
          text
          title
          createdAt
          updatedAt
          _commentsMeta {
            count
          }
        }
      }
    `,
  },
  /** End of Graph QL */
}
</script>
