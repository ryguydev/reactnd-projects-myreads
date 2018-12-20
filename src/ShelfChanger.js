import React from 'react'

function ShelfChanger(props) {
  const { bookID, handleShelfChange } = props;
  return (
    <select id={bookID} onChange={handleShelfChange} defaultValue="move">
      <option value="move" disabled >Move to...</option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="wantToRead">Want to Read</option>
      <option value="read">Read</option>
      <option value="none">None</option>
    </select>
  )
}

export default ShelfChanger