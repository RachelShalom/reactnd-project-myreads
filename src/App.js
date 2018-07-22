import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './bookShelf' 
import {Link} from 'react-router-dom'
import {Route} from 'react-router-dom'
import SearchBook from './searchBook';
class BooksApp extends React.Component {
  state = {
  
      books: [],
  }
  //make the fetcg request in the componenDidmount life cycle event
  componentDidMount(){
    BooksAPI.getAll().then((books)=>{ 
      this.setState({books:books})})
  }
  //a function to update a book shelf every time the user selects ashelf from the menu options
  updateBook = (book, shelf) => {
    let updatedBooks;
    BooksAPI.update(book, shelf).then((res) => {
      //in case this is an existing book on shelf
      if (this.state.books.find(b => b.id === book.id)) {
        //console.log("changed book on the shelf: ",this.state.books.find(b => b.id === book.id))
        updatedBooks = this.state.books.map(b => {
          if (b.id === book.id)
            b.shelf = shelf;
          return b;
        })
        //in case this is a new book to add to a shelf
      } else {
        let changedBook = book
        changedBook.shelf = shelf;
        updatedBooks = this.state.books.push(changedBook)
      }


      this.setState({ books: updatedBooks });
      console.log("the new state now is: ", this.state.books)
    })

         

  }
  render() {
    return (
      <div className="app">
          <div className="list-books">
            <div className="list-books-content">
            <Route exact path="/"
            render={()=>(
              <div>
              <BookShelf title='Currently Reading' books={this.state.books} onUpdate={this.updateBook}/>
              <BookShelf title='Want To Read' books={this.state.books} onUpdate={this.updateBook}/>
              <BookShelf title='Read' books={this.state.books} onUpdate={this.updateBook}/>
            </div>
            )}
            />
            </div>
            <Route exact path="/" render={()=>(<div className="open-search">
             <Link to="/search"> Add a book</Link>
            </div>)}/>
            
          </div>
              <Route path="/search" render={
              ()=>(<SearchBook booksOnShelf={this.state.books} onUpdate={this.updateBook}/>)
            }/>
      </div>
    )
  }
}

export default BooksApp
