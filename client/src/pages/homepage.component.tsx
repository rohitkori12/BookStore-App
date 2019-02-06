import React, { Component } from 'react';
import BookList from '../components/booklist.component';
import Book from '../components/book';
import { browserHistory } from 'react-router';
import * as bookApi from '../api/bookapi';
import { connect } from 'react-redux';
import { setBooks } from '../store/actions/bookActions';
import { Button, Container, Row, Col, Jumbotron,Label } from 'reactstrap';

interface State {
    books: any;
}

class HomePage extends Component<any, State>{
    books: Array<Book> = [];

    //search Properties
    searchByType: any;
    searchByText: any;

    //sorting property
    sortByType: any;

    constructor(props: any) {
        super(props);
        this.searchBooks = this.searchBooks.bind(this);
        this.sortBooks = this.sortBooks.bind(this);
    }

    addBooks() {
        browserHistory.push('/addbook');
    }

    componentDidMount() {
        bookApi.getBooks()
            .then((result) => {
                this.books = result;
                this.props.setBooks(this.books);
            })
            .catch((err) => {
                console.log(err);
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
            if(sortByType!="cost" && sortByType!="pages")
                return a[sortByType].localeCompare(b[sortByType]);
            else
                return parseFloat(a[sortByType])-parseFloat(b[sortByType]);
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
                        <Col xs="6">
                            <BookList bookList={this.props.books} currentPage={this.props.current_page}></BookList>
                        </Col>
                        <Col xs="6">
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
                    </Row>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        books: state.books,
        current_page:state.currentPage
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    setBooks: (books: any) => dispatch(setBooks(books))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);