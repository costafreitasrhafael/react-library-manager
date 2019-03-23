import React from 'react';
import Book from './BookComponent';
import Author from './AuthorComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import DashBoard from './DashBoardComponent';
import RegisterBook from './RegisterBookComponent'
import RegisterAuthor from './RegisterAuthorComponent'

import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchBooks, putBook, postBook, deleteBook } from '../redux/book/ActionCreators';
import { fetchAuthors, putAuthor, postAuthor, deleteAuthor } from '../redux/author/ActionCreators';

const mapStateToProps = state => {
    return {
        books: state.books,
        authors: state.authors
    }
}

const mapDispatchToProps = (dispatch) => ({

    fetchBooks: () => { dispatch(fetchBooks())},
    fetchAuthors: () => { dispatch(fetchAuthors())},
    
    putBook: (book)=> {dispatch(putBook(book))},
    postBook: (book)=> {dispatch(postBook(book))},
    deleteBook: (book) => {dispatch(deleteBook(book))},
    
    putAuthor: (author)=> {dispatch(putAuthor(author))},
    postAuthor: (author)=> {dispatch(postAuthor(author))},
    deleteAuthor: (author) => {dispatch(deleteAuthor(author))}
})

class Main extends React.Component {
    
    componentDidMount() {
        this.props.fetchBooks();
        this.props.fetchAuthors();
    }

    render() {
        
        const BookWithId = ({match}) => {
            return (
                <RegisterBook book={this.props.books.books.filter((book) => parseInt(book.id, 10) === parseInt(match.params.bookId, 10))[0]}
                              authors={this.props.authors.authors} putBook={this.props.putBook} postBook={this.props.postBook}
                              errMess={this.props.books.errMess}                             
                />                            
            );
        }

        const AuthorWithId = ({match}) => {            
            return (
                <RegisterAuthor author={this.props.authors.authors.filter((author) => parseInt(author.id, 10) === parseInt(match.params.authorId, 10))[0]} 
                                errMess={this.props.authors.errMess} postAuthor={this.props.postAuthor} putAuthor={this.props.putAuthor}                            
                />                            
            );
        }

        return (
            <div>
                <Header />                             
                <Switch location={this.props.location}>
                    <Route path='/books' component={() => <Book books={this.props.books.books} errMess={this.props.books.errMess} authors={this.props.authors.authors} deleteBook={this.props.deleteBook} />} />
                    <Route path='/authors' component={() => <Author authors={this.props.authors.authors} errMess={this.props.authors.errMess} deleteAuthor={this.props.deleteAuthor} />} />
                    <Route path='/dashboard' component={() => <DashBoard />} />                    
                    <Route exact path='/book' component={() => <RegisterBook authors={this.props.authors.authors} postBook={this.props.postBook} />} />} />
                    <Route exact path='/author' component={() => <RegisterAuthor postAuthor={this.props.postAuthor}/>} />} />
                    <Route exact path='/book/:bookId' component={BookWithId} />
                    <Route exact path='/author/:authorId' component={AuthorWithId} />
                    <Redirect to="/dashboard" />
                </Switch>                                                  
                <Footer />                
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));