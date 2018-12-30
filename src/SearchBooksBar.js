import React from 'react'
import { Link } from 'react-router-dom'
import {DebounceInput} from 'react-debounce-input'

function SearchBooksBar(props) {

  const { className, searchQuery, handleSearchQueryChange, pathBack } = props
  
  return (
    <div className={className}>
      <button className="close-search">
        <Link to={pathBack} style={{display: "block", height: "100%"}}></Link>
      </button>
      <div className="search-books-input-wrapper">
        <DebounceInput 
          type="text"
          placeholder="Search by title or author"
          value={searchQuery || ''}
          onChange={handleSearchQueryChange}
          debounceTimeout={1000}
        />
      </div>
    </div>
  )
}

export default SearchBooksBar