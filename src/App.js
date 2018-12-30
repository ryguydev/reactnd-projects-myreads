import React, { Component } from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import SearchBooksBar from './SearchBooksBar'
import SearchBooksResults from './SearchBooksResults'
import ListBooks from './ListBooks'
import BookShelf from './BookShelf'
import BookList from './BookList'
import BookListItem from './BookListItem'
import Book from './Book'
import ShelfChanger from './ShelfChanger'
import OpenSearch from './OpenSearch'
import { Route } from 'react-router-dom'

class BooksApp extends Component {
  state = {
    books: [],
    searchQuery: '',
    searchResults: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then( allBooks => {
        this.setState({ 
          books: allBooks,
          searchQuery: this.searchQuery
        })
      })
  }

  handleBookShelfUpdate = event => {
    const { id: bookID , value: shelf } = event.target
    BooksAPI.get( bookID )
      .then( book => BooksAPI.update( book, shelf )
        .then( BooksAPI.getAll()
          .then( allBooks => {
            this.setState({ books: allBooks })
        })
      ))
  }

  handleSearchQueryChange = event => {
    const { value: queryValue } = event.target
    this.setState({ searchQuery: queryValue })
    if ( queryValue ) {
      BooksAPI.search( queryValue )
        .then( result => {
          result.hasOwnProperty("error") ? this.setState({ searchResults: [] }) : this.setState({ searchResults: result })
        })
        .catch( error => {
          this.setState({ searchResults: [] })
        })
    } else {
      this.setState({ searchResults: [] })
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={ () => (
          <SearchBooks
            className="search-books"
            searchBooksBar={
              <SearchBooksBar 
                className="search-books-bar"
                searchQuery={this.state.searchQuery}
                handleSearchQueryChange={this.handleSearchQueryChange}
                pathBack="/"
              />
            }
            searchBooksResults={
              <SearchBooksResults
                className="search-books-results"
                bookList={
                  <BookList
                    className="books-grid"
                    books={this.state.searchResults.length === 0 ? "No results found" : this.state.searchResults.map( book => 
                      <BookListItem
                        key={book.id}
                        book={
                          <Book
                            className="book"
                            cover={book.hasOwnProperty('imageLinks') ? book.imageLinks.thumbnail : "Image Not Available"}
                            title={book.title}
                            authors={book.hasOwnProperty('authors') ? book.authors : "Author Unknown"}
                            shelf={this.state.books.find( obj => obj.id === book.id ) ? this.state.books.find( obj => obj.id === book.id ).shelf : undefined }
                            shelfChanger={
                              <ShelfChanger
                                bookID={book.id}
                                handleShelfChange={this.handleBookShelfUpdate}
                              />
                            }
                          />
                        }
                      />
                    )}
                  />
                }
              />
            }
          />
        )}/>
        <Route exact path="/" render={ () => (
          <div>
            <ListBooks
              className="list-books"
              heading="MyReads: A Book Lending App"
              listBooksContent={
                <div>
                  <BookShelf
                    className="bookshelf"
                    bookShelfTitle="Currently Reading"
                    bookList={
                      <BookList
                        className="books-grid"
                        books={this.state.books.filter( book => book.shelf === 'currentlyReading').map( book => 
                          <BookListItem
                            key={book.id}
                            book={
                              <Book
                                className="book"
                                cover={book.hasOwnProperty('imageLinks') ? book.imageLinks.thumbnail : "Image Not Available"}
                                title={book.title}
                                authors={book.hasOwnProperty('authors') ? book.authors : "Author Unknown"}
                                shelfChanger={
                                  <ShelfChanger
                                    bookID={book.id}
                                    handleShelfChange={this.handleBookShelfUpdate}
                                  />
                                }
                              />
                            }
                          />
                        )}
                      />
                    }
                  />
                  <BookShelf
                    className="bookshelf"
                    bookShelfTitle="Want To Read"
                    bookList={
                      <BookList
                        className="books-grid"
                        books={this.state.books.filter( book => book.shelf === 'wantToRead').map( book => 
                          <BookListItem
                            key={book.id}
                            book={
                              <Book
                                className="book"
                                cover={book.hasOwnProperty('imageLinks') ? book.imageLinks.thumbnail : "Image Not Available"}
                                title={book.title}
                                authors={book.hasOwnProperty('authors') ? book.authors : "Author Unknown"}
                                shelfChanger={
                                  <ShelfChanger
                                    bookID={book.id}
                                    handleShelfChange={this.handleBookShelfUpdate}
                                  />
                                }
                              />
                            }
                          />
                        )}
                      />
                    }
                  />
                  <BookShelf
                    className="bookshelf"
                    bookShelfTitle="Read"
                    bookList={
                      <BookList
                        className="books-grid"
                        books={this.state.books.filter( book => book.shelf === 'read').map( book => 
                          <BookListItem
                            key={book.id}
                            book={
                              <Book
                                className="book"
                                cover={book.hasOwnProperty('imageLinks') ? book.imageLinks.thumbnail : "Image Not Available"}
                                title={book.title}
                                authors={book.hasOwnProperty('authors') ? book.authors : "Author Unknown"}
                                shelfChanger={
                                  <ShelfChanger
                                    bookID={book.id}
                                    handleShelfChange={this.handleBookShelfUpdate}
                                  />
                                }
                              />
                            }
                          />
                        )}
                      />
                    }
                  />
                </div>
              }
            />
          <OpenSearch
            className="open-search"
            pathToSearch="/search"
          />
        </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
