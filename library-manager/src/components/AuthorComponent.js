import React from 'react';

import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Button, Table, Input } from 'reactstrap';

function Author(props) {

    return (
        <div className="container">                    
            <div className="row align-items-start">   
                <Breadcrumb className="col-12">                        
                    <BreadcrumbItem> <Link to='/dashboard'>DashBoard</Link> </BreadcrumbItem>
                    <BreadcrumbItem active> Authors </BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Authors</h3>
                    <hr />
                </div>
            </div>
            
            <Link to='/author'><Button color="primary" style={{float: 'right'}}> Register User </Button></Link>
            <br />
            <br />

            <div className="card card-body col-12">
                <div className="row col-12">
                    <Input id="name" name="name" placeholder="Author Name" className="form-control col-10" style={{marginRight: '0px'}} />
                    <Button color="primary" className="col-2"> Search</Button>            
                </div>            
            </div>
            
            <div className="row row-content col-12">
                                
                <div className="col-12">
                    <Table hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Date of Birth</th>
                                <th>Email</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {props.authors.map((author) => {
                            return (
                                <tr key={author.id}>
                                    <td>{author.name}</td>
                                    <td>{new Intl.DateTimeFormat('en-US').format(new Date(Date.parse(author.dateBirth)))}</td>
                                    <td>{author.email}</td>
                                    <td>
                                        <Link to={`/author/${author.id}`}><Button color="link"> <span className="fa fa-pencil fa-lg" /> </Button></Link>
                                        <Button color="link" onClick={() => {props.deleteAuthor(author)}}> <span className="fa fa-trash fa-lg" /> </Button>
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
 
export default Author;