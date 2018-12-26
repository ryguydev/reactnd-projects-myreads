import React from 'react'

function SearchBooks(props) {
  const { className, onChange: handleSearchQueryChange, searchResults } = props
  return (
    <div className={className}>
      <div className="search-books-bar">
        <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
        <div className="search-books-input-wrapper">
          <input 
            type="text" 
            placeholder="Search by title or author"
            onChange={handleSearchQueryChange}/>
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid"></ol>
      </div>
    </div>
  )
}


export default SearchBooks


