import {createStore} from 'redux';
import {BookReducer} from './reducers/bookReducer';


const configureStore = ()=>{
    return createStore(BookReducer);
}

export {configureStore};