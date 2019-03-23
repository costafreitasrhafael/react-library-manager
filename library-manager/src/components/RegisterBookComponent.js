import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, FormFeedback, Label, Input} from 'reactstrap';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class RegisterBook extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            isbn: '',
            title: '',
            author: '',
            publisher: '',
            pages: '',
            website: '',
            published: new Date(),
            touched: {
                isbn: false,
                title: false,                
                pages: false,
                website: false,            
                publisher: false,
            }
        }
        this.handleBlur = this.handleBlur.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
    }
    
    componentDidMount() {
        if (this.props.book) {            
            this.setState({
                id: this.props.book.id,
                isbn: this.props.book.isbn,
                title: this.props.book.title,
                pages: this.props.book.pages,
                author: this.props.book.author,
                website: this.props.book.website,
                publisher: this.props.book.publisher,
                published: new Date(this.props.book.published)
            });
        }    
    }

    handleSubmit() {        
        console.log('Current State is: ' + JSON.stringify(this.state));            
        if (this.state.id) {
            const newBook = {
                id: this.state.id,
                isbn: this.state.isbn,
                title: this.state.title,
                pages: this.state.pages,
                author: this.state.author,
                website: this.state.website,
                publisher: this.state.publisher,
                published: this.state.published.toISOString()
            };
            this.props.putBook(newBook);            
        }
        else {
            const newBook = {                
                isbn: this.state.isbn,
                title: this.state.title,
                pages: this.state.pages,
                author: this.state.author,
                website: this.state.website,
                publisher: this.state.publisher,
                published: this.state.published.toISOString()
            };
            this.props.postBook(newBook);
        }
    }
    
    handleBlur = (field) => (event) => {
        this.setState({
            touched: { ...this.setState.touched, [field]: true }
        });        
    }

    handleInputChange(event) {        
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    handleDatePickerChange(published) {
        this.setState({
            published: published
        });
    }

    validate(isbn, title, website, pages, publisher) {                
        const errors = {
            isbn: '',
            title: '',                
            pages: '',
            website: '',     
            publisher: '',
        };
        
        if (this.state.touched.isbn && isbn.length < 1)
            errors.name = 'ISBN should be >= 1 characters';        
        else if (this.state.touched.isbn && isbn.length > 15)
            errors.name = 'Name should be <= 15 characters';        

        if (this.state.touched.title && title.length < 3)
            errors.name = 'Name should be >= 3 characters';        
        else if (this.state.touched.title && title.length > 30)
            errors.name = 'Name should be <= 30 characters';        

        if (this.state.touched.website && website.length < 3) 
            errors.name = 'Website should be >= 3 characters';        
        else if (this.state.touched.website && website.length > 30)
            errors.name = 'Website should be <= 30 characters';        

        if (this.state.touched.publisher && publisher.length < 3) 
            errors.name = 'Publisher should be >= 3 characters';        
        else if (this.state.touched.title && publisher.length > 30) 
            errors.name = 'Publisher should be <= 30 characters';        

        const reg = /^\d+$/;
        if (this.state.touched.pages && !reg.test(pages))
            errors.pages = 'Pages should contain only numbers';
        

        return errors;
    }

    render() {
        const errors = this.validate(this.state.isbn, this.state.title, this.state.website, this.state.pages, this.state.publisher);
        return (
            <div className="container">
                <div className="row">   
                    <Breadcrumb className="col-12">                        
                        <BreadcrumbItem> <Link to='/books'>Book</Link> </BreadcrumbItem>
                        <BreadcrumbItem active> Register Books </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Register Books</h3>
                        <hr />
                    </div>

                    <div className="col-12">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label htmlFor="isbn">ISBN</Label>
                                <Input  id="isbn" name="isbn" placeholder="ISBN" className="form-control"
                                        value={this.state.isbn}
                                        valid={errors.isbn === ''}
                                        invalid={errors.isbn !== ''}
                                        onBlur={this.handleBlur('isbn')}
                                        onChange={this.handleInputChange}/>
                                <FormFeedback>{errors.isbn}</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="title">Title</Label>
                                <Input  id="title" name="title" placeholder="Title" className="form-control"
                                        value={this.state.title}
                                        valid={errors.title === ''}
                                        invalid={errors.title !== ''}
                                        onBlur={this.handleBlur('title')}
                                        onChange={this.handleInputChange}/>
                                <FormFeedback>{errors.title}</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="author">Author</Label>
                                <Input  id="author" type="select" name="author" placeholder="Author" className="form-control"
                                        value={this.state.author}
                                        onBlur={this.handleBlur('author')}
                                        onChange={this.handleInputChange}>
                                    {this.props.authors.map((author) => {
                                        return (<option key={author.id}>{author.name}</option>);
                                    })}     
                                </Input>  
                            </FormGroup>
                            
                            <FormGroup>
                                <Label htmlFor="publisher">Publisher</Label>
                                <Input  id="publisher" name="publisher" placeholder="Publisher" className="form-control"
                                        value={this.state.publisher}
                                        valid={errors.publisher === ''}
                                        invalid={errors.publisher !== ''}
                                        onBlur={this.handleBlur('publisher')}
                                        onChange={this.handleInputChange}/>
                                <FormFeedback>{errors.publisher}</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="pages">Pages</Label>
                                <Input  id="pages" name="pages" placeholder="Pages" className="form-control"
                                        value={this.state.pages}
                                        valid={errors.pages === ''}
                                        invalid={errors.pages !== ''}
                                        onBlur={this.handleBlur('pages')}
                                        onChange={this.handleInputChange}/>
                                <FormFeedback>{errors.pages}</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="website">Website</Label>
                                <Input  id="website" name="website" placeholder="Website" className="form-control"
                                        value={this.state.website}
                                        valid={errors.website === ''}
                                        invalid={errors.website !== ''}
                                        onBlur={this.handleBlur('website')}
                                        onChange={this.handleInputChange}/>
                                <FormFeedback>{errors.website}</FormFeedback>
                            </FormGroup>
                            
                            <FormGroup>
                                <Label className="form-label" htmlFor="published">Published</Label> <br />
                                <DatePicker id="published" className="form-control" 
                                            selected={this.state.published} 
                                            onChange={this.handleDatePickerChange}/>                                
                            </FormGroup>

                            <div>
                                <Link to="/books"><Button color="primary" className="col-2" style={{marginLeft: '20px', float: 'right'}}>Cancel</Button></Link>
                                <Link to="/books"><Button onClick={this.handleSubmit} color="primary" className="col-2" style={{float: 'right'}}>Save</Button></Link>
                            </div>
                        </Form>
                    </div>
                </div>
                <br />
            </div>
        );
    }
}

 
export default RegisterBook;