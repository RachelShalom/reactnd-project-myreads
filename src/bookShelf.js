import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'

class BookShelf extends React.Component {

  
render(){

    //the filtered list of books by a shelf
    let booksOfShelf= this.props.books.filter((book)=>{ return book.shelf.toUpperCase()===this.props.title.replace(/\s/g, "").toUpperCase()
    //console.log(this.props.title.replace(/\s/g, "").toUpperCase(), book.shelf.toUpperCase());
    //console.log(book.shelf.toUpperCase()===this.props.title.replace(/\s/g, "").toUpperCase());
})
console.log(booksOfShelf);
    return(
        <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
          {booksOfShelf.map((book)=>(
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
    )
}

}

export default BookShelf;