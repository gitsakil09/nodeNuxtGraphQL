const { gql } = require('apollo-server')
// defining the types
const typeDefs = gql`
  type Posts {
    info: Info
    results: [Post]
  }
  type Post {
    id: ID
    title: String
    description: String
  }
  type Comment {
    id: ID
    title: String
    description: String
  }
  type Info {
    count: Int
  }
  type TotalPost {
    count: Int
  }
  type Query {
    posts(from: Int, limit: Int): [Post]
    post(id: ID): Post
    comments: [Comment]
    comment(id: ID): Comment
    totalPost: TotalPost
  }
  type Mutation {
    addNewPost(title: String, description: String): Post
    deletePost(id: ID): Post
  }
`

module.exports = typeDefs
