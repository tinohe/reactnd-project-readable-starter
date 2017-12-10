import { combineReducers } from 'redux'

import {uiDialogState} from './uiDialogState'
import {categories} from './categories'
import {posts} from './posts'
import {comments} from './comments'

export const rootReducer = combineReducers({
  uiDialogState,
  categories,
  posts,
  comments
})
