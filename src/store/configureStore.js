import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';


const customMiddleWare = state => next => action => {
    next(action);
    // console.log(action);
    if (state.getState().items && state.getState().items.length > 0) {
        localStorage.setItem('appState', JSON.stringify(state.getState().items));
    }
};


export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk, customMiddleWare)
    );
}
