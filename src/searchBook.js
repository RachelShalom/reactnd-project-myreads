import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom'
import './App.css'

class SearchBook extends React.Component {

    state={
        books:[],
        query:''
    }
    //a function that takes two arrays:
    //first array contains all books returned from the BooksAPI search with the query typed by the user
    //second array contains books that are on shelf("cureently reading"etc..)
    // the function finds the identical books in each array and add a shelf to the books returned from the search
  compareBooks = (searchedBooks, shelfBooks) => {
    let updated;
    updated = searchedBooks.map((b1) => {
      //are there any books from the search on the shelf?
      for (var i = 0; i < shelfBooks.length; i++) {
        if (shelfBooks[i].id === b1.id) {
          b1["shelf"] =shelfBooks[i].shelf;
          //console.log("identical book found: ", b1);
        }
      }
      return b1;
    })
    return updated;
  }

    //a function to present the right results according to the user query
  updateSearchResults = (query) => {
    this.setState({ query: query })
    if (query) {
      BooksAPI.search(query.trim()).then((books) => {
        //is this the response to the current query 
        if (query === this.state.query) {
          //in case it is the is the response not empty/defined
          if (books) {
            this.setState({ books: books })
          }
        
        } else {
          //if the response is from past queries clear 
          this.setState({ books: [] })
        }
      })
    } else {
      // empty query clear results
      this.setState({ books: [] })
    }
  }

    render() {
      let bookResults, updatedBooks;
      if(this.state.books.length>0){
        bookResults= this.compareBooks(this.state.books, this.props.booksOnShelf);
        //updatedBooks=this.compareBooks(this.state.books, this.props.booksOnShelf);
        console.log(bookResults);
        console.log("updated results ",updatedBooks);
      }else{
        bookResults=[];
      }
        return (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"
                  //value={this.state.query}
                  onChange={(event) => (this.updateSearchResults(event.target.value))} />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {bookResults.map((book) => (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        {/*if the boog has no image replace it with fallback image*/}
                        {book.imageLinks && <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>}
                        {!book.imageLinks && <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(https://source.unsplash.com/_M-DrbiNFa4)` }}></div>}
                        <div className="book-shelf-changer">
                          <select onChange={(event) => this.props.onUpdate(book, event.target.value)}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading" selected={book.shelf === "currentlyReading"}>Currently Reading</option>
                            <option value="wantToRead" selected={book.shelf === "wantToRead"} >Want to Read</option>
                            <option value="read" selected={book.shelf === "read"}>Read</option>
                            <option value="none" selected={!book.shelf} >None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      {/*if the book had no authors replace it with Unknown*/}
                      {book.authors && <div className="book-authors">{book.authors}</div>}
                      {!book.authors && <div className="book-authors">UNKNOWN</div>}
                    </div>
                  </li>
                ))}

              </ol>
            </div>
                {/*this is for when the user types invalid quesry or when we get no results  */}
                {this.state.books&&this.state.books.error==="empty query"&&(<h1>Sorry no results</h1>)}
                </div>
              )}



    }

    export default SearchBook;
