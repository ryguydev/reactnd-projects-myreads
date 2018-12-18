import React from 'react'
import BookList from './BookList'

function BookShelf(props) {
  return (
    <div className={props.className}>
      <h2 className="bookshelf-title">{props.bookShelfTitle}</h2>
      <div className="bookshelf-books">
        <BookList 
          className="books-grid"
          books={props.books}
        ></BookList>
      </div>
    </div>
  )
}

export default BookShelf