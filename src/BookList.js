import React from 'react'
import Book from './Book'

function BookList(props) {
  const { className, books } = props;
  return (
    <ul className={className}>
      {books}
    </ul>
  )
}

export default BookList