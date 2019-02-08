import React, { Component } from 'react';
import BookList from '../components/booklist.component';
import Book from '../components/book';
import { browserHistory } from 'react-router';
import * as bookApi from '../api/bookapi';
import { connect } from 'react-redux';
import { setBooks } from '../store/actions/bookActions';
import { Button, Container, Row, Col, Jumbotron, Label, Modal, ModalBody, ModalHeader, ModalFooter,Alert} from 'reactstrap';

interface State {
    books: any,
    modal: boolean,
    bookDeleted: boolean,
    errorMessage:any
}

class HomePage extends Component<any, State>{
    books: Array<Book> = [];
    deleteBookId: any;
    //search Properties
    searchByType: any;
    searchByText: any;

    //sorting property
    sortByType: any;

    constructor(props: any) {
        super(props);
        this.state = {
            books: [],
            modal: false,
            bookDeleted: false,
            errorMessage:null
        };

        this.searchBooks = this.searchBooks.bind(this);
        this.sortBooks = this.sortBooks.bind(this);
        this.editBook = this.editBook.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
        this.toggle = this.toggle.bind(this);
        this.deleteConfimation = this.deleteConfimation.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    deleteConfimation(_id: any) {
        if (!this.state.modal) {
            this.toggle();
            this.deleteBookId = _id;
        }
        else {
            this.deleteBook(this.deleteBookId);
            this.toggle();
        }
    }

    addBooks() {
        browserHistory.push('/addbook');
    }

    editBook(book: any) {
        this.props.editBook(book);
        browserHistory.push('/addbook');
    }

    deleteBook(id: any) {
        let Book_id = {
            _id: id
        }
        bookApi.deleteBook(Book_id)
            .then((result) => {
                console.log("Book deleted!");
                this.setState({
                    bookDeleted: true
                });
                this.props.deleteBook(id);
                setTimeout(()=>{
                    this.setState({
                        bookDeleted: false
                    });
                },2000);
            })
            .catch((err) => {
                this.setState({
                    errorMessage:"Error while deleting a book:"+{err}
                });
            });
    }

    componentDidMount() {
        bookApi.getBooks()
            .then((result) => {
                this.books = result;
                this.props.setBooks(this.books);
            })
            .catch((err) => {
                this.setState({
                    errorMessage:"Error while fetching books:"+{err}
                });
            });
    }


    searchBooks() {
        let books = this.books;
        let filterByType = this.searchByType.value;
        let filterByText = this.searchByText.value;

        let filteredBooks = books.filter((book: Book) => {
            if (filterByType === 'name') {
                return book.name.indexOf(filterByText) >= 0;
            }
            if (filterByType === 'author') {
                return book.author.indexOf(filterByText) >= 0;
            }
        });

        if (filterByText === "") {
            filteredBooks = books;
        }
        this.props.setBooks(filteredBooks);
    }

    sortBooks() {
        let books = this.books;
        let sortByType = this.sortByType.value;

        let sortedBooks = books.sort((a: any, b: any) => {
            if (sortByType != "cost" && sortByType != "pages")
                return a[sortByType].localeCompare(b[sortByType]);
            else
                return parseFloat(a[sortByType]) - parseFloat(b[sortByType]);
        });

        this.props.setBooks(sortedBooks);
        this.forceUpdate();
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <div className="AppNav">Book Store App</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="7">
                            <BookList bookList={this.props.books} currentPage={this.props.current_page} editBook={this.editBook} deleteBook={this.deleteConfimation}></BookList>
                        </Col>
                        <Col xs="5">
                            <Button className="margin20" color="info" onClick={this.addBooks}>Add Books</Button>
                            <Jumbotron>
                                <h4>Search Criteria</h4>
                                <div className="form-group">
                                    <Label for="searchByType">Search By:</Label>
                                    <select className="form-control" name="searchByType" id="searchByType" ref={(input) => { this.searchByType = input }}>
                                        <option value="name">Name</option>
                                        <option value="author">Author</option>
                                    </select>
                                    <input className="form-control" type="text" ref={(input) => { this.searchByText = input }}></input>
                                </div>
                                <Button color="info" onClick={this.searchBooks}>Search</Button>
                            </Jumbotron>

                            <Jumbotron>
                                <h4>Sort Criteria</h4>
                                <div className="form-group">
                                    <label>Sort By :</label>
                                    <select className="form-control" id="sortByType" name="sortByType" ref={(input) => { this.sortByType = input }}>
                                        <option value="name">Name</option>
                                        <option value="author">Author</option>
                                        <option value="cost">Cost</option>
                                        <option value="pages">Pages</option>
                                    </select>
                                </div>
                                <Button color="info" onClick={this.sortBooks}>Sort</Button>
                            </Jumbotron>
                        </Col>
                        {this.state.bookDeleted && 
                            <Alert color="success" className="margin20">
                                Book Deleted Successfully !!
                            </Alert> 
                        }
                    </Row>
                </Container>
                {this.state.errorMessage ?
                    <Alert color="danger" className="margin20">
                        {this.state.errorMessage}
                    </Alert> : ""
                }

                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete Book ?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Cancel</Button>{' '}
                        <Button color="secondary" onClick={this.deleteConfimation}>Delete</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        books: state.books,
        current_page: state.currentPage
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    setBooks: (books: any) => dispatch(setBooks(books)),
    editBook: (book: any) => dispatch({ type: 'EDIT_BOOK', book: book }),
    deleteBook: (id: any) => dispatch({ type: 'DELETE_BOOK', _id: id })
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);