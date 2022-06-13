import { gql } from 'apollo-server-express'
import { PubSub } from 'graphql-subscriptions'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { v4 as uuid } from 'uuid'

let currentNumber = 0
const comments = []

const typeDefs = gql`
  type Query {
    currentNumber: Int
    comments: [Comment!]!
  }

  type Mutation {
    addComment(content: String!): Comment!
  }

  type Subscription {
    numberIncremented: Int
    commentAdded: Comment!
  }

  type Comment {
    id: String!
    content: String!
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`

const pubsub = new PubSub()
const resolvers = {
  Query: {
    currentNumber() {
      return currentNumber
    },
  },
  Mutation: {
    addComment(_: void, { content }) {
      const comment = { id: uuid(), content }
      comments.push(comment)
      pubsub.publish('COMMENT_ADDED', { commentAdded: comment })
      return comment
    },
  },
  Subscription: {
    numberIncremented: {
      subscribe: () => pubsub.asyncIterator(['NUMBER_INCREMENTED']),
    },
    commentAdded: {
      subscribe: () => pubsub.asyncIterator(['COMMENT_ADDED']),
    },
  },
}

function incrementNumber() {
  currentNumber++
  pubsub.publish('NUMBER_INCREMENTED', { numberIncremented: currentNumber })
  setTimeout(incrementNumber, 1000)
}
incrementNumber()

// setInterval(() => {
//   pubsub.publish('COMMENT_ADDED', { commentAdded: { id: uuid(), content: 'Hello!' } })
// }, 1000)

export default makeExecutableSchema({ typeDefs, resolvers })
