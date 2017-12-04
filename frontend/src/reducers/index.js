import { combineReducers } from 'redux'

import {
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  UPDATE_POST_VOTE,
  CREATE_COMMENT,
  DELETE_COMMENT,
  INC_COMMENT_VOTE,
  DEC_COMMENT_VOTE,
  FETCH_POSTS,
  FETCH_POST,
  FETCH_CATEGORIES,
  CHANGE_POST_CREATE_DIALOG_STATE,
  CHANGE_POST_UPDATE_DIALOG_STATE,
  CHANGE_POST_DELETE_DIALOG_STATE,
  CHANGE_POST_VOTE_STATE,
  UPDATE_COMMENT_DIALOG_STATE
} from '../actions'

import { VoteScore, KEY_INC, KEY_DEC } from '../components/VoteScore'


const uiDialogState = (state = {}, action) => {
  switch (action.type) {

    case CHANGE_POST_CREATE_DIALOG_STATE: {
      return Object.assign({}, state, { showPostCreateDialog: action.dialogState.showPostDialog, error: action.dialogState.error })
    }
    case CHANGE_POST_UPDATE_DIALOG_STATE: {
      return Object.assign({}, state, { showPostUpdateDialog: action.dialogState.showPostDialog, postId: action.dialogState.postId, error: action.dialogState.error })
    }
    case CHANGE_POST_DELETE_DIALOG_STATE: {
      return Object.assign({}, state, { showPostDeleteDialog: action.dialogState.showPostDialog, postId: action.dialogState.postId, deleteError: action.dialogState.error })
    }
    case CHANGE_POST_VOTE_STATE: {
      return Object.assign({}, state, { postId: action.state.postId, changeVoteError: action.state.error })
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
  
  switch (action.type) {

    case FETCH_POSTS: {
      return state.concat(action.posts)
    }
    case FETCH_POST: {
      return [].concat(action.post)
    }
    case CREATE_POST: {
      if (action.post) {
        return state.concat(action.post)
      }
      else {
        return state
      }
    }
    case UPDATE_POST: {
      if (action.post) {
        return state.filter((p) => (p.id !== action.post.id)).concat(action.post)
      }
      else {
        return state
      }
    }
    case DELETE_POST: {
      if (action.postData.deleted) {
        return state.filter((p) => (p.id !== action.postData.id))
      }
      else {
        return state
      } 
    }
    case UPDATE_POST_VOTE: {
      
      if (action.postData.success) {
        const postToChange = Object.assign({}, state.find((post) => (post.id === action.postData.postId)))
        const newState = state.filter((post) => (post.id !== action.postData.postId))
        if (action.postData.option === KEY_INC) {
          postToChange.voteScore = postToChange.voteScore + 1
        }
        if (action.postData.option === KEY_DEC) {
          postToChange.voteScore = postToChange.voteScore - 1
        }
        return newState.concat(postToChange)
      }
      else {
        return state
      }
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
