import React from 'react'

function SearchBookResults(props) {
  const { className, bookList } = props
  return (
    <div className={className}>
      {bookList}
    </div>
  )
}

export default SearchBookResults