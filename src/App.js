import React, { Component } from 'react'
import './App.css'
import imageNotFound from './images/imageNotAvailable.png'
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

/**
 * Class BooksApp serves as the main component of the entire application. All
 * state is maintained herewithin, and all children of this component are
 * stateless React components.
 */
class BooksApp extends Component {
  /**
   * Initialization of state variables.
   */
  state = {
    books: [],
    searchQuery: '',
    searchResults: []
  }
  /**
   * On Mount, make request to BooksAPI for all books to set state.
   */
  componentDidMount() {
    BooksAPI.getAll()
      .then( allBooks => {
        this.setState({ books: allBooks })
      })
  }
  /**
   * Function handler for bookshelf updates (attached to each Book). 
   */
  handleBookShelfUpdate = event => {
    const { id: bookID , value: shelf } = event.target
    BooksAPI.get( bookID )
      .then( book => BooksAPI.update( book, shelf )  
        .then( () => {
            book.shelf = shelf;
            this.setState( currentState => ({
              books: currentState.books.filter((b) => b.id !== bookID).concat([book])
            }))
        })
      )
  }
  /**
   * Function handler for updates to the search query. Unless search
   * results are valid/error-free, set state results to empty array.
   */
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
                            cover={book.hasOwnProperty('imageLinks') ? book.imageLinks.thumbnail : imageNotFound}
                            title={book.title}
                            authors={book.hasOwnProperty('authors') ? book.authors : "Author Unknown"}
                            shelf={this.state.books.find( obj => obj.id === book.id ) ? this.state.books.find( obj => obj.id === book.id ).shelf : "none" }
                            shelfChanger={
                              <ShelfChanger
                                bookID={book.id}
                                shelf={this.state.books.find( obj => obj.id === book.id ) ? this.state.books.find( obj => obj.id === book.id ).shelf : "none" }
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
                                cover={book.hasOwnProperty('imageLinks') ? book.imageLinks.thumbnail : imageNotFound}
                                title={book.title}
                                authors={book.hasOwnProperty('authors') ? book.authors : "Author Unknown"}
                                shelfChanger={
                                  <ShelfChanger
                                    bookID={book.id}
                                    shelf={book.shelf}
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
                                cover={book.hasOwnProperty('imageLinks') ? book.imageLinks.thumbnail : imageNotFound}
                                title={book.title}
                                authors={book.hasOwnProperty('authors') ? book.authors : "Author Unknown"}
                                shelfChanger={
                                  <ShelfChanger
                                    bookID={book.id}
                                    shelf={book.shelf}
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
                                cover={book.hasOwnProperty('imageLinks') ? book.imageLinks.thumbnail : imageNotFound}
                                title={book.title}
                                authors={book.hasOwnProperty('authors') ? book.authors : "Author Unknown"}
                                shelfChanger={
                                  <ShelfChanger
                                    bookID={book.id}
                                    shelf={book.shelf}
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
