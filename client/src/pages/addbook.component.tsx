import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import * as bookApi from '../api/bookapi';
import { Col, Button, Form, FormGroup ,Alert } from 'reactstrap';

interface State{
    showAlert:boolean
    showError: boolean
}

class AddBook extends Component<any,State>{
    bookname: any;
    author: any;
    cost: any;
    pages: any;
    ErrorMessage:any;

    constructor(props: any) {
        super(props);
        this.state={
            showAlert:false,
            showError: false
        }
        this.saveBook = this.saveBook.bind(this);
        this.validate = this.validate.bind(this);
    }

    saveBook() {
        let book = {
            name: this.bookname.value,
            author: this.author.value,
            cost: this.cost.value,
            pages: this.pages.value
        };
        if(this.validate()){
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
    }

    validate(){
        if(this.bookname.value===""){
            this.ErrorMessage = "Book name field can not be empty";
            this.setState({
                showError: true
            });
            return false;
        }
        if(this.author.value===""){
            this.ErrorMessage = "Author field can not be empty";
            this.setState({
                showError: true
            });
            return false;
        }
        if(this.cost.value==="" || !(/^\d+$/).test(this.cost.value)){
            this.ErrorMessage = "Cost field can't be empty and It should be a number";
            this.setState({
                showError: true
            });
            return false;
        }
        if(this.pages.value==="" || !(/^\d+$/).test(this.pages.value)){
            this.ErrorMessage = "Pages field can not be empty and It should be a number";
            this.setState({
                showError: true
            });
            return false;
        }

        this.setState({
            showError: false
        });
        return true;
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
                {this.state.showError && 
                    <Alert color="danger" className="margin20">
                        {this.ErrorMessage}
                    </Alert>
                }

                {this.state.showAlert?
                    <Alert color="success" className="margin20">
                        Book Saved Successfully !!
                    </Alert>:""
                }
            </div>
        );
    }
}



export default AddBook;