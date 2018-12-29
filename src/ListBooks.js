import React from 'react'

function ListBooks(props) {
  const { className, heading, listBooksContent } = props
  return (
    <div className={className}>
      <div className="list-books-title"><h1>{heading}</h1></div>
      <div className="list-books-content">{listBooksContent}</div>
    </div>
  )
}
            
export default ListBooks