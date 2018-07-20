import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom'
import './App.css'

class SearchBook extends React.Component {

    state={
        books:[],
        //query:''
    }

    updateSearchResults=(query)=>{
      //this.setState({query:query})
      //
        BooksAPI.search(query).then((books)=>{
          if(books){
          this.setState({books:books}) 
          }else{
            this.setState({books:[]})
          }
          console.log(query, this.state.books)
        })
         
  //
     
    }

    render() {
      let bookResults;
      if(this.state.books.length>0){
        bookResults=this.state.books;
      }else{
        bookResults=[];
      }
      console.log(' inside render: the book state is ',this.state.books)   
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
                      <input type="text" placeholder="Search by title or author" 
                      //value={this.state.query}
                      onChange={(event)=>(this.updateSearchResults(event.target.value))}/>
      
                    </div>
                  </div>
                  <div className="search-books-results">
                    <ol className="books-grid">
                    {bookResults.map((book)=>(
                       <li key= {book.id}>
                       <div className="book">
                         <div className="book-top">
                       { book.imageLinks&&<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>}
                       {!book.imageLinks&&<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(https://source.unsplash.com/_M-DrbiNFa4)`}}></div>}
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
                {/*this is for when the user types invalid quesry or when we get no results  */}
                {this.state.books&&this.state.books.error==="empty query"&&(<h1>Sorry no results</h1>)}
                </div>
              )}



    }

    export default SearchBook;
