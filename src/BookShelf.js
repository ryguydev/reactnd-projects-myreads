import React from 'react'

function BookShelf(props) {
  const { className, bookShelfTitle, bookList } = props
  return (
    <div className={className}>
      <h2 className="bookshelf-title">{bookShelfTitle}</h2>
      <div className="bookshelf-books">
        {bookList}
      </div>
    </div>
  )
}

export default BookShelf