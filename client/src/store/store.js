import {createStore} from 'redux';
import {BookReducer} from './reducers/bookReducer';


const configureStore = ()=>{
    return createStore(BookReducer); //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() -->For adding redux extention
}

export {configureStore};