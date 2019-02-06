const initialState ={
    books:[],
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

    return state;
    
} 