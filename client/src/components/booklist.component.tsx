import React, { Component } from 'react';
import Book from './book';
import { Table, Container, Row ,Button} from 'reactstrap';
import Pagination from './pagination.component';
import {browserHistory} from 'react-router';
import { connect } from 'react-redux';

class BookList extends Component<any, {}>{
  constructor(props: any) {
    super(props);
  }

  render() {
    const books = this.props.bookList;
    let bookList;

    const per_page = 10;
    const pages = Math.ceil(books.length / per_page);
    const current_page = this.props.currentPage;
    const start_offset = (current_page - 1) * per_page;
    let start_count = 0;

    if (books && books.length > 0) {
      bookList = books.map((book: Book, index: any) => {
        if (index >= start_offset && start_count < per_page) {
          start_count++;
          return (
            <tr key={book.name}>
              <td>{book.name}</td>
              <td>{book.author}</td>
              <td>{book.cost}</td>
              <td>{book.pages}</td>
              <td>
                <Button className="inlineBlock btnMargin" onClick={()=>this.props.editBook(book)}>Edit</Button>
                <Button className="inlineBlock btnMargin" onClick={()=>this.props.deleteBook(book._id)}>Delete</Button>
              </td>
            </tr>
          );
        }
      });
    }


    return (
      <div className="App">
        <Table striped >
          <thead>
            <tr>
              <th>Book Name</th>
              <th>Author</th>
              <th>Cost</th>
              <th>Pages</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {bookList}
          </tbody>
        </Table>
        {books.length == 0 ? "No books Available" : ""}

        {books.length != 0 ?
          <Container>
            <Row>
              <Pagination items={pages} activePage={current_page}>
              </Pagination>
            </Row>
          </Container> : ""
        }

      </div>
    );
  }
}

export default BookList;
