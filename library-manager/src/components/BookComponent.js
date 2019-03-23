import React from 'react';

import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Button, Table, Input, Label } from 'reactstrap';

function Book(props) {

    return (
        <div className="container">
            <div className="row align-items-start">   
                <Breadcrumb className="col-12">                        
                    <BreadcrumbItem> <Link to='/dashboard'>DashBoard</Link> </BreadcrumbItem>
                    <BreadcrumbItem active> Books </BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Books</h3>
                    <hr />
                </div>
            </div>
            
            <Link to='/book'><Button color="primary" style={{float: 'right'}}> Register Book </Button></Link>
            <br />
            <br />
            
            <div className="card card-body col-12">
                <div className="row col-12">
                    <Label className="form-label col-1" htmlFor="published">Name</Label>
                    <Input name="bookname" placeholder="Book name" className="form-control col-2" style={{marginRight: '10px'}} />
                    
                    <Label className="form-label col-2" htmlFor="publisher">Publisher</Label>
                    <Input name="publisher" placeholder="publisher" className="form-control col-2" style={{marginRight: '10px'}} />
                                        
                    <Label className="form-label col-1" htmlFor="author">Author</Label>
                    <Input type="select" id="author" name="author" className="form-control col-2">
                        {props.authors.map((author) => {
                            return (<option key={author.id}>{author.name}</option>);
                        })}     
                    </Input> 

                    <Button color="primary" className="col-1" style={{float: 'right'}}> Search</Button>            
                </div>            
            </div>

            <div className="row row-content col-12">
                <div className="col-12"> 
                    <Table hover>
                        <thead>
                            <tr>                                
                                <th>Title</th>                                            
                                <th>Authors</th>
                                <th>Publisher</th>
                                <th>Published</th>
                                <th>Pages</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.books.map((book) => {
                                return (
                                    <tr key={book.isbn}>                                
                                        <td>{book.title}</td>                                                    
                                        <td>{book.author}</td>
                                        <td>{book.publisher}</td>
                                        <td>{new Intl.DateTimeFormat('en-US').format(new Date(Date.parse(book.published)))}</td>
                                        <td>{book.pages}</td>
                                        <td>
                                            <Link to={`/book/${book.id}`}><Button color="link"> <span className="fa fa-pencil fa-lg" /></Button></Link>
                                            <Button color="link" onClick={() => {props.deleteBook(book)}}> <span className="fa fa-trash fa-lg" /> </Button>
                                        </td>
                                    </tr>
                                );
                            })}                                                       
                        </tbody>
                    </Table>                
                </div>
            </div>                
        </div>
    );      
}

export default Book;