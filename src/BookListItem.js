import React from 'react'

function BookListItem(props) {
  const { book } = props
  return (
    <li>{book}</li>
  )
}

export default BookListItem