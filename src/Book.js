import React from 'react'

function Book(props) {
  
  const { className, cover, title, authors, shelf, shelfChanger } = props;

  return (
    <div className={className}>
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 188}}>
          <img className="book-cover-image" src={cover} alt="Book Cover" style={{ width: 128, height: 188}} />
        </div>
        <div className="book-shelf-changer">
          {shelfChanger}
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">
        {typeof authors === 'object' ? authors.map( author => 
          <span key={author}>{author}<br/></span>
        ) : authors}
      </div>
      <div className="book-shelf">
        <span style={{color: "red"}}>
          {shelf === "currentlyReading" ? "Currently Reading" : shelf === "wantToRead" ? "Want To Read" : shelf === "read" ? "Read" : '' }
        </span>
      </div>
    </div>
  )
}

export default Book