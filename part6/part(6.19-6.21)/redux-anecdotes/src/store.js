import {createStore, combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import displayReducer from './reducers/notificationDisplayReducer'

const reducer = combineReducers({
    anecdote:anecdoteReducer,
    filter: filterReducer,
    display: displayReducer,
    notification: notificationReducer
})

const store = createStore(
    reducer,
    applyMiddleware(thunk)
)

export default store