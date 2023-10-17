import {applyMiddleware, combineReducers, createStore} from 'redux';
import UserReducer from './reducers';
import thunk from 'redux-thunk';
const rootReducer = combineReducers({
  UserReducer,
});
export const store = createStore(rootReducer, applyMiddleware(thunk));
