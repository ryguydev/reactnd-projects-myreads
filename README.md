# MyReads: A Book Lending App

MyReads app allows users to:

1) Search for books via [Udacity's Nanodegree Books API](https://reactnd-books-api.udacity.com) and place them on various shelves on the MyReads page.
2) Move books to/from various shelves on the MyReads page.

## Installation
1) Clone git@github.com:ryguydev/reactnd-projects-myreads.git or download the `.zip`.
2) Run `npm install` in corresponding directory.
2) Run `npm start` in corresponding directory.

## App Structure
```bash
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms.
├── package.json # npm package manager file.
├── public
│   ├── favicon.ico # React Icon
│   └── index.html # DO NOT MODIFY
└── src
    ├── icons #
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── App.css # Styles for app.
    ├── App.js # App root..
    ├── Book.js # Primary content for book rendering
    ├── BookList.js # Wrapper for BookListItem components
    ├── BookListItem.js # Wrapper for Book components
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend.
    ├── BookShelf.js # Wrapper for BookList components
    ├── index.css # Global styles.
    └── index.js # Used for DOM rendering only.
    ├── ListBooks.js # Primary content for my reads screen.
    ├── OpenSearch.js # Wrapper for navigation to search screen.
    ├── SearchBooks.js # Primary content for search screen.
    ├── SearchBooksBar.js # Wrapper for search bar, including search query and nav to my reads screen
    ├── SearchBooksResults.js # search results from BooksAPI.
    ├── ShelfChanger.js # state changer attached to each Book.
```

