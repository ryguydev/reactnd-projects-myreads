import React from 'react'

function Book(props) {
  
  const { className, cover, title, authors, shelfChanger } = props;

  return (
    <div className={className}>
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 188}}>
          <img className="book-cover-image" src={cover} alt="?" style={{ width: 128, height: 188}} />
        </div>
        <div className="book-shelf-changer">
          {shelfChanger}
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors}</div>
    </div>
  )
}

export default Book