import React from 'react'
import Book from './Book'

function BookList(props) {
  const { books } = props;
  const bookList = books.map( book => {
    return (
      <li key={book.id}>
        <Book
          className="book"
          cover={book.imageLinks.smallThumbnail}
          title={book.title}
          authors={book.authors}
        ></Book>
      </li>
    )
  })
  return (
    <ul className={props.className}>{bookList}</ul>
  )
}

export default BookList