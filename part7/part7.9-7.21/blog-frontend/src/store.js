import { createStore,combineReducers,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import userReducer from './reducers/usersReducer'
import loginUserReducers from './reducers/loginUserReducers'
import blogReducer from './reducers/blogReducer'
const reducer = combineReducers({
  blog: blogReducer,
  loginuser: loginUserReducers,
  users: userReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store