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
    book.shelf=shelf;
    BooksAPI.update(book, shelf).then((res) => {
    //updatedbook is the list of books that are on shelf excluding the book ta=hat just chnaged a shelf
    updatedBooks = this.state.books.filter(b=>b.id!==book.id)  
    this.setState({ books: updatedBooks.concat(book)});
      
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
