import React from 'react'

function SearchBooks(props) {
  const { className, searchBooksBar, searchBooksResults } = props
  return (
    <div className={className}>
      {searchBooksBar}
      {searchBooksResults}
    </div>
  )
}

export default SearchBooks


