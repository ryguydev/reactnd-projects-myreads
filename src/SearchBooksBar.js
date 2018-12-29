import React from 'react'
import { Link } from 'react-router-dom'

function SearchBooksBar(props) {
  const { className, searchQuery, handleSearchQueryChange, pathBack } = props
  return (
    <div className={className}>
      <button className="close-search">
        <Link to={pathBack} style={{display: "block", height: "100%"}}></Link>
      </button>
      <div className="search-books-input-wrapper">
        {searchQuery}
        <input 
          type="text" 
          placeholder="Search by title or author"
          onChange={handleSearchQueryChange}/>
      </div>
    </div>
  )
}

export default SearchBooksBar