import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom'
import './App.css'

class SearchBook extends React.Component {

    state={
        books:[],
        query:''
    }

    render() {
        return (
         
                <div className="search-books">
                  <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                      {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
      
                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                      */}
                      <input type="text" placeholder="Search by title or author"/>
      
                    </div>
                  </div>
                  <div className="search-books-results">
                    <ol className="books-grid">
                    {this.state.books.map((book)=>(
                       <li key= {book.id}>
                       <div className="book">
                         <div className="book-top">
                           <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                           <div className="book-shelf-changer">
                             <select onChange={(event)=>this.props.onUpdate(book, event.target.value)}>
                               <option value="move" disabled>Move to...</option>
                               <option value="currentlyReading" selected={book.shelf==="currentlyReading"}>Currently Reading</option>
                               <option value="wantToRead" selected={book.shelf==="wantToRead"} >Want to Read</option>
                               <option value="read" selected={book.shelf==="read"}>Read</option>
                               <option value="none">None</option>
                             </select>
                           </div>
                         </div>
                         <div className="book-title">{book.title}</div>
                         <div className="book-authors">{book.authors}</div>
                       </div>
                     </li>
          ))}
                    
                    </ol>
                  </div>
                </div>
              )}



    }

    export default SearchBook;
