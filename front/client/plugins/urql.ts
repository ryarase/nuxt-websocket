/*
import { defineNuxtPlugin } from '#app'
import { createClient, ssrExchange, dedupExchange, fetchExchange, subscriptionExchange, Client } from '@urql/vue'
// import { createClient, provideClient, Client } from '@urql/vue'
import { createClient as createWSClient } from 'graphql-ws'
// import { cacheExchange as graphCacheExchange } from '@urql/exchange-graphcache'
// import schema from '../gql/introspection';
// import { GraphCacheConfig } from '~/gql/schema'
import { ref } from 'vue'

const ssrKey = '__URQL_DATA__'

export default defineNuxtPlugin((nuxt) => {
  const { vueApp } = nuxt

  const ssr = ssrExchange({
    isClient: process.client,
  })

  // when app is created in browser, restore SSR state from nuxt payload
  if (process.client) {
    nuxt.hook('app:created', () => {
      ssr.restoreData(nuxt.payload[ssrKey])
    })
  }

  // when app has rendered in server, send SSR state to client
  if (process.server) {
    nuxt.hook('app:rendered', () => {
      nuxt.payload[ssrKey] = ssr.extractData()
    })
  }

  // use urql graphcache
  // const cacheConfig: GraphCacheConfig = {
  //   schema,
  //   keys: {
  //     Country: (data) => data.code || null
  //   },
  //   resolvers: {
  //     Query: {
  //       country: (_, args) => ({__typename: "Country", code: args.code})
  //     }
  //   }
  //   // storage: process.client ? makeDefaultStorage() : undefined
  // }
  // const cache = graphCacheExchange(cacheConfig)

  const wsClient = createWSClient({
    url: 'ws://localhost:9999/graphql',
  })

  const client = createClient({
    url: 'http://localhost:9999/graphql',
    exchanges: [
      dedupExchange,
      // cache,
      ssr, // Add `ssr` in front of the `fetchExchange`
      fetchExchange,
      // subscriptionExchange({
      //   forwardSubscription: (operation) => ({
      //     subscribe: (sink) => ({
      //       unsubscribe: wsClient.subscribe(operation, sink),
      //     }),
      //   }),
      // }),
    ],
  })

  nuxt.provide('urql', client)
  vueApp.provide('$urql', ref(client))
})

declare module '#app' {
  interface NuxtApp {
    $urql: Client
  }
}
*/
