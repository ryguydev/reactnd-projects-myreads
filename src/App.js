import React, { Component } from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import BookList from './BookList'
import Book from './Book'
import ShelfChanger from './ShelfChanger'
//import SearchBooks from './SearchBooks'

class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then( allBooks => {
        this.setState( () => ({
          books: allBooks
        }))
      })
  }

  handleBookShelfUpdate = (e) => {
    const { id: bookID , value: shelf } = e.target
    BooksAPI.get(bookID)
      .then( book => BooksAPI.update( book, shelf )
        .then( BooksAPI.getAll()
          .then( allBooks => {
            this.setState({ books: allBooks })
        })
      ))
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
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
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
