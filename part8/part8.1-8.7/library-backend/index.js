const { ApolloServer, gql } = require('apollo-server')
const { ApolloServerPluginLandingPageGraphQLPlayground } = require(`apollo-server-core`)
const {v1: uuid} = require('uuid')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
type Book{
  title: String!
  published: Int!
  author: String!
  id: ID !
  genres: [String!]!
}

type Author{
  name: String!
  born: Int!
  bookCount: Int!
}
type Mutation{
  addBook(
    title: String!
    author:String!
    published: Int!
    genres:[String!]!
  ):Book
  editAuthor(
    name: String!
    born: Int!
  )
}
  type Query {
      bookCount: Int!
      authorCount: Int!
      allBook (author: String,genre: String): [Book!]!
      allAuthor : [Author!]!
  }
`

const resolvers = {
  Query: {
    bookCount : ()=> books.length,
    authorCount: ()=> authors.length,
    allBook: (root, args)=>{
      if(!args.author && !args.genre){
        return books
      }
      if(args.author && args.genre){
        return books.filter(book => book.author === args.author && book.genres.includes(args.genre))
      }
      if(args.author){
        return books.filter(book => book.author === args.author)
      }
      if(args.genre){
        return books.filter(book => book.genres.includes(args.genre))
      }
    }, 
    allAuthor :() => authors
  },
  Author: {
    bookCount: (root)=> {
      const count = books.filter(book => book.author === root.name)
      return count.length
    }
  },
  Mutation: {
    addBook:(root,args) =>{
      const existingAuthor = authors.find( author => author.name === args.author)
      if(!existingAuthor){
        const author = {
          name: args.author,
          id: uuid()
        }
        authors.concat(author)
      }
      const book = {...args, id: uuid()}
      books.concat(book)
      return book

    },
    editAuthor:(root, args) =>{
      const existingAuthor = authors.find( author => author.name === args.name)
      if(!existingAuthor){
        return null
      }
      const editedauthor = {...existingAuthor, born: args.born}
      authors.map(author => author.name === args.name ? editedauthor: author)

    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins:[
    ApolloServerPluginLandingPageGraphQLPlayground(),
  ]
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})