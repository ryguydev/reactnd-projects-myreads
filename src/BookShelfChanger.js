import React from 'react'

function BookShelfChanger(props) {
  const { bookID, handleBookShelfChange } = props;
  return (
    <select id={bookID} onChange={handleBookShelfChange}>
      <option value="move" disabled>Move to...</option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="wantToRead">Want to Read</option>
      <option value="read">Read</option>
      <option value="none">None</option>
    </select>
  )
}

export default BookShelfChanger