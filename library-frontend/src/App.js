import React, { useState } from 'react'
import { Query, ApolloConsumer, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import EditAuthor from './components/EditAuthor'

const ALL_AUTHORS = gql`
  {
    allAuthors  {
      name
      born
      bookCount
    }
  }
`
const ALL_BOOKS = gql`
  {
    allBooks  {
      title
      author {
        name
        born
      }
      published
    }
  }
`

const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String]!) {
  addBook(
  title: $title
  author:  $author
  published: $published
  genres: $genres
  ) {
    title
    author {
      name
      born
    }
    published
    genres
  }

}
`
const UPDATE_AUTHOR = gql`
mutation updateAuthor($name: String!, $born: Int!){
  editAuthor(
    name: $name
    setBornTo:  $born
  ) {
    name
    born
    id
  }
}
`

const App = () => {
  const [page, setPage] = useState('authors')
  const [authors, setAuthors] = useState([])

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>
      <ApolloConsumer>
      {(client =>
          <Query query={ALL_AUTHORS} >
            {(result) =>
              <Authors result={result} client={client} show={page === 'authors'} setAuthors={author => setAuthors(author)}/>
            }
        </Query>
      )}
      </ApolloConsumer>
      <ApolloConsumer>
      {(client =>
          <Query query={ALL_BOOKS} >
            {(result) =>
              <Books result={result} client={client} show={page === 'books'}/>
            }
        </Query>
      )}
      </ApolloConsumer>
      <Mutation
        mutation={CREATE_BOOK}
        refetchQueries={[{ query: ALL_BOOKS }]}
      >
        {(addBook) =>
      <NewBook  addBook={addBook} show={page === 'add'} setPage={page => setPage(page)}/>}
      </Mutation> 

      <Mutation
        mutation={UPDATE_AUTHOR}
        refetchQueries={[{ query: ALL_AUTHORS }]}
      >
        {(editAuthor) =>
        <EditAuthor editAuthor={editAuthor} show={page === 'authors'} authors={authors}/>}
      </Mutation>
    </div>
  )
}

export default App