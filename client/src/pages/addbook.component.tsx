import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import * as bookApi from '../api/bookapi';
import { Col, Button, Form, FormGroup, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import Book from '../components/book';

interface State {
    showSaveAlert: boolean,
    showValidationError: boolean,
    showEditAlert: boolean,
    errorMessage: any,
    book: Book
}

class AddBook extends Component<any, State>{
    // bookname: any;
    // author: any;
    // cost: any;
    // pages: any;
    validationErrorMessage: any;

    constructor(props: any) {
        super(props);
        this.state = {
            showSaveAlert: false,
            showEditAlert: false,
            showValidationError: false,
            errorMessage: null,
            book: {
                _id: "",
                name: "",
                author: "",
                cost: 0,
                pages: 0
            }
        }
        this.saveBook = this.saveBook.bind(this);
        this.validate = this.validate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e: any) {
        if (e.target.name === "name") {
            this.state.book.name = e.target.value;
        }
        else if (e.target.name === "author") {
            this.state.book.author = e.target.value;
        }
        else if (e.target.name === "cost") {
            this.state.book.cost = e.target.value;
        }
        else if (e.target.name === "pages") {
            this.state.book.pages = e.target.value;
        }
        //console.log(e);
    }

    componentWillMount() {
        if (this.props.editBook) {
            // this.bookname = this.props.editBook.name;
            // this.author = this.props.editBook.author;
            // this.cost = this.props.editBook.cost;
            // this.pages = this.props.editBook.pages;
            this.setState({
                book: this.props.editBook
            });
        }
    }

    saveBook() {
        // let book = {
        //     _id: "",
        //     name: this.bookname.value,
        //     author: this.author.value,
        //     cost: this.cost.value,
        //     pages: this.pages.value
        // };
        let book: Book = this.state.book;
        if (this.validate()) {
            if (this.props.editBook && this.props.editBook._id !== "") {
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
                    .catch((err) => {
                        this.setState({
                            errorMessage: "Error while Updating the book:" + { err }
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
                    .catch((err) => {
                        this.setState({
                            errorMessage: "Error while Saving the book:" + { err }
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
        if (this.state.book.name === "") {
            this.validationErrorMessage = "Book name field can not be empty";
            this.setState({
                showValidationError: true
            });
            return false;
        }
        if (this.state.book.author === "") {
            this.validationErrorMessage = "Author field can not empty";
            this.setState({
                showValidationError: true
            });
            return false;
        }
        if (this.state.book.cost === 0 || !(/^\d+$/).test((this.state.book.cost).toString())) {
            this.validationErrorMessage = "Cost field can't be empty and It should be a number";
            this.setState({
                showValidationError: true
            });
            return false;
        }
        if (this.state.book.pages === 0 || !(/^\d+$/).test((this.state.book.pages).toString())) {
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
                            <input className="form-control" type="text" id="bookname" name="name" defaultValue={this.state.book.name} onChange={this.handleChange}></input>
                        </FormGroup>
                        <FormGroup>
                            <label>Author :</label>
                            <input className="form-control" type="text" id="author" name="author" defaultValue={this.state.book.author} onChange={this.handleChange}></input>
                        </FormGroup>
                        <FormGroup>
                            <label>Cost :</label>
                            <input className="form-control" type="text" id="cost" name="cost" defaultValue={this.state.book.cost.toString()} onChange={this.handleChange}></input>
                        </FormGroup>
                        <FormGroup>
                            <label>Pages :</label>
                            <input className="form-control" type="text" id="pages" name="pages" defaultValue={this.state.book.pages.toString()} onChange={this.handleChange}></input>
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