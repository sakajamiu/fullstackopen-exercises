import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import{
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    HttpLink,
    gql
}
from '@apollo/client'
const query = gql`
query{
  allAuthor{
    name,
   born,
   bookCount
  }
}
`
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: 'http://localhost:4000',
    })
})
client.query({query})
  .then((response) => {
    console.log(response.data)
  })

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
     document.getElementById('root')
)
