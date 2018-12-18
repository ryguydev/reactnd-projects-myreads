import React from 'react'

function Book(props) {
  let { className, cover, title, authors } = props;
  console.log(typeof authors)
  return (
    <div className={className}>
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 188}}>
          <img className="book-cover-image" src={cover} alt="?" style={{ width: 128, height: 188}} />
        </div>
        <div className="book-shelf-changer">
          <select>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors}</div>
    </div>
  )
}

export default Book