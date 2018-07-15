import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'

class BookShelf extends React.Component {
render() {
    let shelves = ["wantToRead", "currentlyReading", "read"]; 
    //the filtered list of books by a shelf
    let booksOfShelf = this.props.books.filter((book) =>  {
      return book.shelf.toUpperCase() === this.props.title.replace(/\s/g, "").toUpperCase()
})
console.log(booksOfShelf); 

    
    return( < div className = "bookshelf" >  < h2 className = "bookshelf-title" >  {this.props.title} </h2 >  < div className = "bookshelf-books" >  < ol className = "books-grid" >  {booksOfShelf.map((book) => ( < li key =  {book.id} >  < div className = "book" >  < div className = "book-top" >  < div className = "book-cover"style =  { {width:128, height:193, backgroundImage:`url($ {book.imageLinks.thumbnail})`}} ></div >  < div className = "book-shelf-changer" >  < select >  < option value = "move"disabled > Move to... </option >  < option value = "currentlyReading" > Currently Reading </option >  < option value = "wantToRead" > Want to Read </option >  < option value = "read" > Read </option >  < option value = "none" > None </option >  </select >  </div >  </div >  < div className = "book-title" >  {book.title} </div >  < div className = "book-authors" >  {book.authors} </div >  </div >  </li > 
          ))} {/*    
            <li>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: 'url("http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api")' }}></div> < div className = "book-shelf-changer" >  < select >  < option value = "move"disabled > Move to... </option >  < option value = "currentlyReading" > Currently Reading </option >  < option value = "wantToRead" > Want to Read </option >  < option value = "read" > Read </option >  < option value = "none" > None </option >  </select >  </div >  </div >  < div className = "book-title" > Ender's Game</div>
                <div className="book-authors">Orson Scott Card</div>
              </div>
            </li> */}
          </ol>
        </div>
      </div>
    )
}

}

export default BookShelf;