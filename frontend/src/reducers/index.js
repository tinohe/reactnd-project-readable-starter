import { combineReducers } from 'redux'

import {
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  INC_POST_VOTE,
  DEC_POST_VOTE,
  CREATE_COMMENT,
  DELETE_COMMENT,
  INC_COMMENT_VOTE,
  DEC_COMMENT_VOTE,
  FETCH_POSTS,
  FETCH_POST,
  FETCH_CATEGORIES,
  UPDATE_POST_DIALOG_STATE,
  UPDATE_COMMENT_DIALOG_STATE
} from '../actions'


const uiDialogState = (state = { showPostDialog: false, showCommentDialog: false }, action) => {

  switch (action.type) {

    case UPDATE_POST_DIALOG_STATE: {
      return Object.assign({}, state, { showPostDialog: action.dialogState.showPostDialog })
    }

    case UPDATE_COMMENT_DIALOG_STATE: {
      return Object.assign({}, state, { showCommentDialog: action.dialogState.showCommentDialog })
    }

    default: {
      return state
    }
  }
}

const categories = (state = [], action) => {

  switch (action.type) {

    case FETCH_CATEGORIES: {
      return state.concat(action.categories)
    }
    default: {
      return state
    }
  }
}

const posts = (state = [], action) => {
  console.log(action);
  switch (action.type) {

    case FETCH_POSTS: {
      return state.concat(action.posts)
    }
    case FETCH_POST: {
      return [].concat(action.post)
    }
    case CREATE_POST: {
      return state.concat(action.post)
    }
    case UPDATE_POST: {
      return state.filter((p) => (p.id !== action.post.id)).concat(action.post)
    }
    default: {
      return state
    }
  }
}

export const rootReducer = combineReducers({
  uiDialogState,
  categories,
  posts,
})
