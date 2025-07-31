import {createStore, applyMiddleware} from 'redux';
import {composeWithDevToolsDevelopmentOnly} from '@redux-devtools/extension';
import logger from 'redux-logger';
import rootReducer from './reducers';

export default createStore(
    rootReducer,
    composeWithDevToolsDevelopmentOnly(applyMiddleware(logger))
);
