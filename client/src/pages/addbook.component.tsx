import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import * as bookApi from '../api/bookapi';
import { Col, Button, Form, FormGroup, Alert } from 'reactstrap';
import { connect } from 'react-redux';

interface State {
    showSaveAlert: boolean,
    showValidationError: boolean,
    showEditAlert: boolean,
    errorMessage:any
}

class AddBook extends Component<any, State>{
    bookname: any;
    author: any;
    cost: any;
    pages: any;
    validationErrorMessage: any;

    constructor(props: any) {
        super(props);
        this.state = {
            showSaveAlert: false,
            showEditAlert: false,
            showValidationError: false,
            errorMessage:null
        }
        this.saveBook = this.saveBook.bind(this);
        this.validate = this.validate.bind(this);
    }

    

    componentWillMount() {
        if (this.props.editBook) {
            this.bookname = this.props.editBook.name;
            this.author = this.props.editBook.author;
            this.cost = this.props.editBook.cost;
            this.pages = this.props.editBook.pages;
        }
    }

    saveBook() {
        let book = {
            _id: "",
            name: this.bookname.value,
            author: this.author.value,
            cost: this.cost.value,
            pages: this.pages.value
        };
        if (this.validate()) {
            if (this.props.editBook && this.props.editBook._id!=="") {
                book._id = this.props.editBook._id;
                bookApi.updateBook(book)
                    .then((res: any) => {
                        this.setState({
                            showEditAlert: true
                        });
                        setTimeout(() => {
                            browserHistory.push('/');
                        }, 2000);
                    })
                    .catch((err)=>{
                        this.setState({
                            errorMessage:"Error while Updating the book:"+{err}
                        });
                    })
            }
            else {
                bookApi.saveBooks(book)
                    .then((res: any) => {
                        console.log(res);
                        this.setState({
                            showSaveAlert: true
                        });
                        setTimeout(() => {
                            browserHistory.push('/');
                        }, 2000);
                    })
                    .catch((err)=>{
                        this.setState({
                            errorMessage:"Error while Saving the book:"+{err}
                        });
                    });
            }
        }
    }

    componentWillUnmount() {
        // setting editBook state to empty
        this.props.setEditBook(null);
    }

    validate() {
        if (this.bookname.value === "") {
            this.validationErrorMessage = "Book name field can not be empty";
            this.setState({
                showValidationError: true
            });
            return false;
        }
        if (this.author.value === "") {
            this.validationErrorMessage = "Author field can not empty";
            this.setState({
                showValidationError: true
            });
            return false;
        }
        if (this.cost.value === "" || !(/^\d+$/).test(this.cost.value)) {
            this.validationErrorMessage = "Cost field can't be empty and It should be a number";
            this.setState({
                showValidationError: true
            });
            return false;
        }
        if (this.pages.value === "" || !(/^\d+$/).test(this.pages.value)) {
            this.validationErrorMessage = "Pages field can not be empty and It should be a number";
            this.setState({
                showValidationError: true
            });
            return false;
        }

        this.setState({
            showValidationError: false
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
                            <input className="form-control" type="text" id="bookname" defaultValue={this.bookname ? this.bookname : ""} ref={(input) => { this.bookname = input }}></input>
                        </FormGroup>
                        <FormGroup>
                            <label>Author :</label>
                            <input className="form-control" type="text" id="author" defaultValue={this.author ? this.author : ""} ref={(input) => { this.author = input }}></input>
                        </FormGroup>
                        <FormGroup>
                            <label>Cost :</label>
                            <input className="form-control" type="text" id="cost" defaultValue={this.cost ? this.cost : ""} ref={(input) => { this.cost = input }}></input>
                        </FormGroup>
                        <FormGroup>
                            <label>Pages :</label>
                            <input className="form-control" type="text" id="pages" defaultValue={this.pages ? this.pages : ""} ref={(input) => { this.pages = input }}></input>
                        </FormGroup>
                        <Button color="success" onClick={this.saveBook}>Save</Button>
                    </Form>
                </Col>
                {this.state.showValidationError &&
                    <Alert color="danger" className="margin20">
                        {this.validationErrorMessage}
                    </Alert>
                }
                {this.state.showSaveAlert ?
                    <Alert color="success" className="margin20">
                        Book Saved Successfully !!
                    </Alert> : ""
                }
                {this.state.showEditAlert ?
                    <Alert color="success" className="margin20">
                        Book Updated Successfully !!
                    </Alert> : ""
                }
                {this.state.errorMessage ?
                    <Alert color="danger" className="margin20">
                        {this.state.errorMessage}
                    </Alert> : ""
                }
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        editBook: state.editBook,
        books: state.books
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        setEditBook: (book: any) => { dispatch({ type: 'EDIT_BOOK', book: book }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBook);