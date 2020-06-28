let { nanoid } = require('nanoid')
const random = require('random')
const LoremIpsum = require('lorem-ipsum').LoremIpsum

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
})
// data sets
// posts data
// populating comments data
let posts = []
for (let postIndex = 1; postIndex <= 100; postIndex++) {
  posts.push({
    id: random.int(1, 1000),
    title: lorem.generateSentences(1),
    description: lorem.generateParagraphs(1),
  })
}
// comments data
let comments = []
// populating comments data
for (let commentIndex = 1; commentIndex <= 100; commentIndex++) {
  comments.push({
    id: random.int(1, 1000),
    title: lorem.generateSentences(1),
    description: lorem.generateParagraphs(1),
  })
}
// resolvers/ Functions
const resolvers = {
  Query: {
    posts: (_, { from = 0, limit = 1 }) => {
      // const info = {
      //   count: posts.length,
      // }
      // const data = {
      //   info: info,
      //   results: posts.slice(from, from + limit),
      // }
      // return data
      return posts.slice(from, from + limit)
    },
    post: (_, { id }) => {
      return posts.find((post) => post.id === Number(id))
    },
    comments: () => comments,
    comment: (_, { id }) => {
      return comments.find((comment) => comment.id === Number(id))
    },
    totalPost: () => {
      return { count: posts.length }
    },
  },
  Mutation: {
    addNewPost(_, { title, description }) {
      const storePost = {
        id: random.int(1, 1000),
        title,
        description,
      }
      posts.push(storePost)
      return storePost
    },
    /**
     * Deleting Post
     * @param id
     */
    deletePost(_, { id }) {
      const findIndex = posts.map((post) => post.id).indexOf(Number(id))
      if (findIndex > -1) {
        let deletedPost = posts[findIndex]
        posts.splice(findIndex, 1)
        return deletedPost
      }
    },
  },
}

module.exports = resolvers
