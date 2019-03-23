import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, FormFeedback, Label, Input } from 'reactstrap';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class RegisterAuthor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            name: '',
            email: '',
            dateBirth: new Date(),
            touched: {
                name: false,
                email: false,
                dateBirth: false,                
            }
        }
        this.handleBlur = this.handleBlur.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        if (this.props.author) {            
            this.setState({
                id: this.props.author.id,
                name: this.props.author.name, 
                email: this.props.author.email,
                dateBirth: new Date(this.props.author.dateBirth)
            });
        }
    }

    handleSubmit(event) {        
        console.log('Current State is: ' + JSON.stringify(this.state));     
        if (this.state.id) {
            const newAuthor = {
                id: this.state.id, 
                name: this.state.name,
                email: this.state.email,
                dateBirth: this.state.dateBirth.toISOString()      
            };
            this.props.putAuthor(newAuthor);            
        }
        else {
            const newAuthor = {
                name: this.state.name,
                email: this.state.email,
                dateBirth: this.state.dateBirth.toISOString()      
            };
            this.props.postAuthor(newAuthor);
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
    
    handleChange(dateBirth) {
        this.setState({
            dateBirth: dateBirth
        });
    }

    validate(name, email) {                
        const errors = {
            name: '',
            email: '',
        };
        
        if (this.state.touched.name && name.length < 3) {
            errors.name = 'Name should be >= 3 characters';
        }
        else if (this.state.touched.name && name.length > 30) {
            errors.name = 'Name should be <= 30 characters';
        }
            
        if (this.state.touched.email && email.split('').filter(x => x === '@').length !== 1) {
            errors.email = 'Email should contain a @';
        } 

        return errors;
    }

    render() {
        const errors = this.validate(this.state.name, this.state.email);

        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb className="col-12">
                        <BreadcrumbItem> <Link to='/authors'>Authors</Link> </BreadcrumbItem>
                        <BreadcrumbItem active> Register Authors </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Register Authors</h3>
                        <hr />
                    </div>

                    <div className="col-12">
                        <Form>
                           
                            <FormGroup>
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" placeholder="Name" className="form-control"
                                       value={this.state.name}
                                       valid={errors.name === ''}
                                       invalid={errors.name !== ''}
                                       onBlur={this.handleBlur('name')}
                                       onChange={this.handleInputChange}
                                />
                                <FormFeedback>{errors.name}</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="email">Email</Label>
                                <Input  id="email" name="email" placeholder="Email" className="form-control"
                                        value={this.state.email}
                                        valid={errors.email === ''}
                                        invalid={errors.email !== ''}
                                        onBlur={this.handleBlur('email')}
                                        onChange={this.handleInputChange}
                                />
                                <FormFeedback>{errors.email}</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="dateBirth">Date of Birth</Label><br/>
                                <DatePicker id="dateBirth" className="form-control" 
                                            selected={this.state.dateBirth} 
                                            onBlur={this.handleBlur('dateBirth')}
                                            onChange={this.handleChange}/>                                
                            </FormGroup>

                            <div>
                                <Link to="/authors"><Button color="primary" className="col-2" style={{marginLeft: '20px', float: 'right'}}>Cancel</Button></Link>
                                <Link to="/authors"><Button onClick={this.handleSubmit} color="primary" className="col-2" style={{float: 'right'}}>Save</Button></Link>
                            </div>
                        </Form>
                    </div>
                </div>
                <br/>
            </div>
        );
    }
}
 
export default RegisterAuthor;