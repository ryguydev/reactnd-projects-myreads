<BookShelf
  className="bookshelf"
  bookShelfTitle="Currently Reading"
  bookList={
    <BookList
      className="books-grid"
      books={this.state.books
        .filter( book => book.shelf === 'currentlyReading' )}>
    </BookList>}>
</BookShelf>