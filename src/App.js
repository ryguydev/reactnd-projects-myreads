import React, { Component } from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import BookList from './BookList'
import Book from './Book'
import ShelfChanger from './ShelfChanger'
import { Route, Link } from 'react-router-dom'
import SearchBooks from './SearchBooks'

class BooksApp extends Component {
  state = {
    books: [],
    searchQuery: '',
    searchResults: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then( allBooks => {
        this.setState( () => ({
          books: allBooks
        }))
      })
  }

  handleBookShelfUpdate = (event) => {
    const { id: bookID , value: shelf } = event.target
    BooksAPI.get( bookID )
      .then( book => BooksAPI.update( book, shelf )
        .then( BooksAPI.getAll()
          .then( allBooks => {
            this.setState({ books: allBooks })
        })
      ))
  }

  handleSearchQueryChange = (event) => {
    const { value: queryValue } = event.target
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
          <div 
            className="search-books">
            <div className="search-books-bar">
              <button className="close-search">
                <Link to="/" style={{display: "block", height: "100%"}}></Link>
              </button>
              <div className="search-books-input-wrapper">
                {this.searchQuery}
                <input 
                  type="text" 
                  placeholder="Search by title or author"
                  onChange={this.handleSearchQueryChange}/>
              </div>
            </div>
            <div className="search-books-results">
              <BookList
                className="books-grid"
                books={ this.state.searchResults.length === 0 ? "No result found" : this.state.searchResults
                  .map( book => {
                    return (
                      <li key={book.id}>
                        <Book
                          className="book"
                          cover={book.hasOwnProperty('imageLinks') ? book.imageLinks.thumbnail : "Image Not Available"}
                          title={book.title}
                          authors={book.authors}
                          shelfChanger={
                            <ShelfChanger
                              bookID={book.id}
                              handleShelfChange={this.handleBookShelfUpdate}
                          ></ShelfChanger>
                          }
                        ></Book>
                      </li>
                    )
                  })
                }>
              </BookList>
            </div>
          </div>
        )}/>
        <Route exact path="/" render={ () => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf
                  className="bookshelf"
                  bookShelfTitle="Currently Reading"
                  bookList={
                    <BookList
                      className="books-grid"
                      books={ this.state.books
                        .filter( book => book.shelf === 'currentlyReading' )
                        .map( book => {
                          return (
                            <li key={book.id}>
                              <Book
                                className="book"
                                cover={book.imageLinks.smallThumbnail}
                                title={book.title}
                                authors={book.authors}
                                shelfChanger={
                                  <ShelfChanger
                                    bookID={book.id}
                                    handleShelfChange={this.handleBookShelfUpdate}
                                ></ShelfChanger>
                                }
                              ></Book>
                            </li>
                          )
                        })
                      }>
                    </BookList>}>
                </BookShelf>
                <BookShelf
                  className="bookshelf"
                  bookShelfTitle="Want To Read"
                  bookList={
                    <BookList
                      className="books-grid"
                      books={ this.state.books
                        .filter( book => book.shelf === 'wantToRead' )
                        .map( book => {
                          return (
                            <li key={book.id}>
                              <Book
                                className="book"
                                cover={book.imageLinks.smallThumbnail}
                                title={book.title}
                                authors={book.authors}
                                shelfChanger={
                                  <ShelfChanger
                                    bookID={book.id}
                                    handleShelfChange={this.handleBookShelfUpdate}
                                ></ShelfChanger>
                                }
                              ></Book>
                            </li>
                          )
                        })
                      }>
                    </BookList>}>
                </BookShelf>
                <BookShelf
                  className="bookshelf"
                  bookShelfTitle="Read"
                  bookList={
                    <BookList
                      className="books-grid"
                      books={ this.state.books
                        .filter( book => book.shelf === 'read' )
                        .map( book => {
                          return (
                            <li key={book.id}>
                              <Book
                                className="book"
                                cover={book.imageLinks.smallThumbnail}
                                title={book.title}
                                authors={book.authors}
                                shelfChanger={
                                  <ShelfChanger
                                    bookID={book.id}
                                    handleShelfChange={this.handleBookShelfUpdate}
                                ></ShelfChanger>
                                }
                              ></Book>
                            </li>
                          )
                        })
                      }>
                    </BookList>}>
                </BookShelf>
              </div>
            </div>
            <div className="open-search">
              <button> 
                <Link to="/search" style={{display: "block", height: "100%"}}></Link>
              </button>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
