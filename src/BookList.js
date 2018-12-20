import React from 'react'

function BookList(props) {
  const { className, books } = props;
  return (
    <ul className={className}>
      {books}
    </ul>
  )
}

export default BookList