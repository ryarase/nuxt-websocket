<template>

<ul>
  <li v-for="message of messages" :key="message.id">
    {{ message.content }}
  </li>
</ul>

<!--
  <div v-if="fetching">
    Loading...
  </div>
  <div v-else-if="error">
    Oh no... {{error}}
  </div>
  <div v-else>
     <ul v-if="data">
      <li v-for="todo in data.todos" :key="todo.id">{{ todo.title }}</li>
    </ul>
    <p>{{data.currentNumber}}</p>
  </div>
-->
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import { useSubscription } from "@vue/apollo-composable"
import { gql } from "@apollo/client/core"

const messages = ref([])

if ((process as any).client) {
  const { result, error } = useSubscription(gql`
    commentAdded {
      id
      content
    }
  `)

  watch(
    result,
    (data: any) => {
      messages.value.push(data.commentAdded)
    },
    // {
    //   lazy: true // Don't immediately execute handler
    // }
  )
}



/*
import { useClientHandle } from "@urql/vue"

const urql = useClientHandle()
const handleSubscription = (messages = [], response) => {
  return [response.newMessages, ...messages]
}
const { data, fetching, error } = await urql.useQuery({
  query: `
    currentNumber {
      currentNumber
    }
  `
})
*/
</script>
