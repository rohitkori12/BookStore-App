import Book from '../components/book';
import appConfig from '../appConfig';


export async function saveBooks(book:Book){
    const response = await fetch(appConfig.API_URL +'addBook', {
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

    const response = await fetch(appConfig.API_URL+'getBooks/');
    const json = await response.json();
    books = json;
    return books;
}

export async function updateBook(book:Book){
    const response = await fetch(appConfig.API_URL+'updateBook',{
        method:'PUT',
        headers:{
            "Content-Type":'application/json'
        },
        body:JSON.stringify(book)
    });
    const json = await response.json();
    return json;
}

export async function deleteBook(id:any){
    const response = await fetch(appConfig.API_URL+'deleteBook',{
        method:'DELETE',
        headers:{
            "Content-Type":'application/json'
        },
        body:JSON.stringify(id)
    });
    const json = await response.json();
    return json;
}