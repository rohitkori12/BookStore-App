import Book from '../components/book'

export async function saveBooks(book:Book){
    const response = await fetch('http://localhost:8080/book/addBook', {
        method: 'POST',
        headers:{
            "Content-Type":'application/json'
        },
        body: JSON.stringify(book)
    });
    const json = await response.json();
    return json;
}

export async function getBooks(){
    let books:Array<Book>;

    const response = await fetch('http://localhost:8080/book/getBooks/');
    const json = await response.json();
    books = json;
    return books;
}