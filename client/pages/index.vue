<template>
  <v-layout justify-center align-center>
    <v-flex xs12 sm12 md8 offset-md-2>
      <v-card>
        <v-card-title primary-title>
          List of Posts
          <v-spacer></v-spacer>
          <v-btn color="primary" small @click="addPostDrawer = true">
            <v-icon small>mdi-plus</v-icon>Add
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12 sm6 md6>
              <template v-for="post in posts">
                <v-list-item two-line>
                  <v-list-item-content>
                    <nuxt-link :to="post.id">
                      <v-list-item-title>{{ post.title }}</v-list-item-title>
                    </nuxt-link>
                    <v-list-item-subtitle>{{ post.description }}</v-list-item-subtitle>
                    <v-list-item-subtitle>
                      <v-btn x-small color="red" @click="deletePost(post.id)">
                        <v-icon x-small color="white">mdi-delete</v-icon>
                      </v-btn>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <v-divider></v-divider>
              <v-btn
                color="primary"
                block
                small
                @click="loadMorePosts"
                v-if=" posts &&
                  totalPost > 0 && totalPost > posts.length
                "
              >{{loading ? 'Loading...' : 'Show more'}}</v-btn>
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
              <v-text-field name="Title" label="Title" v-model="postInfo.title"></v-text-field>
              <v-textarea name="Description" label="Description" v-model="postInfo.description"></v-textarea>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="red" small @click="addPostDrawer = false">
              <v-icon small>mdi-close</v-icon>Close
            </v-btn>
            <v-btn color="primary" small @click="addPost">
              <v-icon small>mdi-plus</v-icon>Add
            </v-btn>
          </v-card-actions>
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
      posts: [],
      addPostDrawer: false,
      postInfo: {
        title: 'Post',
        description: 'Post  Description',
      },
      loading: 0
    }
  },
  /** Starting Graph QL */
  apollo: {
    $loadingKey: 'loading',
    // Posts
    posts: {
      query: gql`
        query getPosts($from: Int, $limit: Int) {
          posts(from: $from, limit: $limit) {
              id
              title
              description
          }
        }
      `,
      // update: ({ posts }) => {
      //   return { posts: posts.results, totalPost: posts.info.count }
      // },
      variables() {
        return {
          from: 0,
          limit: 5,
        }
      },
    },
    totalPost : {
      query: gql `
        query getTotalPosts {
          totalPost {
            count
          }
        }
      `,
     update: ({totalPost}) => totalPost.count
    }
  },
  /** End of Graph QL */
  methods: {
    /**
     * Loading More Posts
     */
    async loadMorePosts() {
      this.$apollo.queries.posts.fetchMore({
        variables: {
          from: this.posts.length,
          limit: 5,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if(!fetchMoreResult){
            // returning the previous results as current
            return previousResult
          }
          return Object.assign({}, previousResult, {
            posts: [...previousResult.posts, ...fetchMoreResult.posts]
          })
        },
      })
    },
    /**
     * Adding New Post
     * @param postInfo
     */
    async addPost() {
      try {
        this.$apollo
          .mutate({
            mutation: gql`
              mutation($title: String, $description: String) {
                addNewPost(title: $title, description: $description) {
                  id
                  title
                  description
                }
              }
            `,
            variables: {
              title: this.postInfo.title,
              description: this.postInfo.description,
            },
          })
          .then((response) => {
            alert('Successfully saved')
            this.posts.push(response.data.addNewPost)
            this.addPostDrawer = false
            this.postInfo = {
              title: 'Post',
              description: 'Post  Description',
            }
          })
          .catch((error) => {
            console.log(error)
          })
      } catch (addPostError) {}
    },
    /**
     * Deleting Post
     * @param postId
     */
    async deletePost(postId) {
      try {
        this.$apollo
          .mutate({
            mutation: gql`
              mutation($id: ID) {
                deletePost(id: $id) {
                  id
                  title
                }
              }
            `,
            variables: {
              id: postId,
            },
          })
          .then((response) => {
            // console.log(response.data)
            alert('Post deleted')
            const findIndex = this.posts.map((post) => post.id).indexOf(postId)
            if (findIndex > -1) {
              this.posts.splice(findIndex, 1)
            }
          })
          .catch((error) => {
            console.log(error)
          })
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
