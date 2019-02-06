// export const bookAction = (book)=>{
//     return {
//         type:'ADD_BOOK',
//         book:book 
//     }
// };

export const setCurrentPage =(currentPage)=>{
    return {
        type:'SET_CURRENT_PAGE',
        page:currentPage
    }
}

export const setBooks = (books)=>{
    return {
        type:'SET_BOOKS',
        books:books
    }
}