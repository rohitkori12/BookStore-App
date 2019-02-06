import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import * as bookApi from '../api/bookapi';
import { Col, Button, Form, FormGroup ,Alert } from 'reactstrap';
import PropTypes from 'prop-types';

interface State{
    showAlert:boolean
}

class AddBook extends React.Component<any,State>{
    bookname: any;
    author: any;
    cost: any;
    pages: any;

    constructor(props: any) {
        super(props);
        this.state={
            showAlert:false
        }
        this.saveBook = this.saveBook.bind(this);
    }

    saveBook() {
        let book = {
            name: this.bookname.value,
            author: this.author.value,
            cost: this.cost.value,
            pages: this.pages.value
        };

        bookApi.saveBooks(book)
            .then((res: any) => {
                console.log(res);
                this.setState({
                    showAlert :true
                });

                setTimeout(()=>{
                    browserHistory.push('/');
                },2000);
            });
    }

    render() {
        return (
            <div>
                <h3 className="text-center margin20">Enter Book Details</h3>
                <Col xs="6" className="mAuto">
                    <Form>
                        <FormGroup>
                            <label>Name :</label>
                            <input className="form-control" type="text" id="bookname" ref={(input) => { this.bookname = input }}></input>
                        </FormGroup>
                        <FormGroup>
                            <label>Author :</label>
                            <input className="form-control" type="text" id="author" ref={(input) => { this.author = input }}></input>
                        </FormGroup>
                        <FormGroup>
                            <label>Cost :</label>
                            <input className="form-control" type="text" id="cost" ref={(input) => { this.cost = input }}></input>
                        </FormGroup>
                        <FormGroup>
                            <label>Pages :</label>
                            <input className="form-control" type="text" id="pages" ref={(input) => { this.pages = input }}></input>
                        </FormGroup>
                        <Button color="success" onClick={this.saveBook}>Save</Button>
                    </Form>
                </Col>

                {this.state.showAlert?
                    <Alert className="margin20" color="success">
                        Book Saved Successfully !!
                    </Alert>:""
                }
            </div>
        );
    }
}



export default AddBook;