const initialState ={
    books:[],
    editBook:{},
    currentPage:1
};

export const BookReducer = (state=initialState,action)=>{
    // if(action.type==='ADD_BOOK'){
    //     return{
    //         ...state,
    //         books: state.books.push(action.book)
    //     }
    // }
    if(action.type==='SET_BOOKS'){
        return{
            ...state,
            books: action.books
        }
    }
    if(action.type==='SET_CURRENT_PAGE'){
        return{
            ...state,
            currentPage: action.page
        }
    }
    if(action.type==='EDIT_BOOK'){
        return{
            ...state,
            editBook: action.book
        }
    }

    if(action.type==='DELETE_BOOK'){
        let updatedBooks  = state.books.filter((book)=>{
            return book._id !== action._id;
        });

        return{
            ...state,
            books:updatedBooks
        }
    }

    return state;
    
} 