const { ApolloServer } = require('apollo-server')
// const nanoid = require('nanoid')
const typeDefs = require('./src/gql/schema')
const resolvers = require('./src/gql/resolvers')
// data sets
// const posts = [
//   {
//     id: Math.random().toString(30),
//     title: 'Post 1',
//     description: 'Post 1 Description',
//   },
//   {
//     id: Math.random().toString(30),
//     title: 'Post 2',
//     description: 'Post 2 Description',
//   },
//   {
//     id: Math.random().toString(30),
//     title: 'Post 3',
//     description: 'Post 3 Description',
//   },
//   {
//     id: Math.random().toString(30),
//     title: 'Post 4',
//     description: 'Post 4 Description',
//   },
//   {
//     id: Math.random().toString(30),
//     title: 'Post 5',
//     description: 'Post 5 Description',
//   },
//   {
//     id: Math.random().toString(30),
//     title: 'Post 6',
//     description: 'Post 6 Description',
//   },
//   {
//     id: Math.random().toString(30),
//     title: 'Post 7',
//     description: 'Post 7 Description',
//   },
//   {
//     id: Math.random().toString(30),
//     title: 'Post 8',
//     description: 'Post 8 Description',
//   },
//   {
//     id: Math.random().toString(30),
//     title: 'Post 9',
//     description: 'Post 9 Description',
//   },
//   {
//     id: Math.random().toString(30),
//     title: 'Post 10',
//     description: 'Post 10 Description',
//   },
// ]

// defining the types
// const typeDefs = gql`
//   type Post {
//     id: ID
//     title: String
//     description: String
//   }
//   type Query {
//     posts: [Post]
//     post(id: ID): Post
//   }
//   type Mutation {
//     addNewPost(title: String, description: String): Post
//   }
// `

// const resolvers = {
//   Query: {
//     posts: () => posts,
//     post: (_, { id }) => {
//       return posts.find((post) => post.id === id)
//     },
//   },
//   Mutation: {
//     addNewPost(_, { title, description }) {
//       const storePost = {
//         id: nanoid(),
//         title,
//         description,
//       }
//       posts.push(storePost)
//       return storePost
//     },
//   },
// }

// Creating the Instance of Apollo Server
const server = new ApolloServer({ typeDefs, resolvers })

// listening the Server
server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`)
})
