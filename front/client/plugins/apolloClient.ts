import { defineNuxtPlugin } from '#app'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { HttpLink, split } from '@apollo/client/core'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'

export default defineNuxtPlugin((nuxtApp) => {
  // Create an http link:
  const httpLink = new HttpLink({
    uri: 'http://localhost:9999/graphql',
  })

  // Create a WebSocket link:
  const wsLink = process.client
    ? new WebSocketLink({
        uri: `ws://localhost:9999/graphql`,
        options: {
          reconnect: true,
        },
      })
    : undefined

  // using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  const link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query)
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    },
    wsLink,
    httpLink
  )

  const apolloClient = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  })

  nuxtApp.vueApp.provide(DefaultApolloClient, apolloClient)
})
