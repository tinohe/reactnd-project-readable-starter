import { combineReducers } from 'redux'

import {
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  UPDATE_POST_VOTE,
  CREATE_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT_VOTE,
  FETCH_POSTS,
  FETCH_POST,
  FETCH_CATEGORIES,
  FETCH_COMMENTS,
  CHANGE_POST_CREATE_DIALOG_STATE,
  CHANGE_POST_UPDATE_DIALOG_STATE,
  CHANGE_POST_DELETE_DIALOG_STATE,
  CHANGE_POST_VOTE_STATE,
  CHANGE_COMMENT_CREATE_DIALOG_STATE,
  CHANGE_COMMENT_UPDATE_DIALOG_STATE,
  CHANGE_COMMENT_DELETE_DIALOG_STATE,
  CHANGE_COMMENT_VOTE_STATE,
} from '../actions'

import { KEY_INC, KEY_DEC } from '../components/VoteScore'


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
    case CHANGE_COMMENT_CREATE_DIALOG_STATE: {
      return Object.assign({}, state, { showCommentCreateDialog: action.dialogState.showCommentDialog, error: action.dialogState.error })
    }
    case CHANGE_COMMENT_UPDATE_DIALOG_STATE: {
      return Object.assign({}, state, { showCommentUpdateDialog: action.dialogState.showCommentDialog, commentId: action.dialogState.commentId, error: action.dialogState.error })
    }
    case CHANGE_COMMENT_DELETE_DIALOG_STATE: {
      return Object.assign({}, state, { showCommentDeleteDialog: action.dialogState.showCommentDialog, commentId: action.dialogState.commentId, deleteError: action.dialogState.error })
    }
    case CHANGE_COMMENT_VOTE_STATE: {
      return Object.assign({}, state, { commentId: action.state.commentId, changeVoteError: action.state.error })
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
      return [].concat(action.posts)
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
    case CREATE_COMMENT: {
      if (action.comment) {
        const postToChange = Object.assign({}, state.find((post) => (post.id === action.comment.parentId)))
        const newState = state.filter((post) => (post.id !== action.comment.parentId))
        postToChange.commentCount = postToChange.commentCount + 1
        return newState.concat(postToChange)
      }
      else {
        return state
      }
    }
    case DELETE_COMMENT: {
      if (action.commentData.deleted) {
        const postToChange = Object.assign({}, state.find((post) => (post.id === action.commentData.parentId)))
        const newState = state.filter((post) => (post.id !== action.commentData.parentId))
        postToChange.commentCount = postToChange.commentCount - 1
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

const comments = (state = [], action) => {
  switch (action.type) {

    case FETCH_COMMENTS: {
      return state.concat(action.comments)
    }
    case CREATE_COMMENT: {
      if (action.comment) {
        return state.concat(action.comment)
      }
      else {
        return state
      }
    }
    case UPDATE_COMMENT: {
      if (action.comment) {
        return state.filter((c) => (c.id !== action.comment.id)).concat(action.comment)
      }
      else {
        return state
      }
    }
    case DELETE_COMMENT: {
      if (action.commentData.deleted) {
        return state.filter((c) => (c.id !== action.commentData.id))
      }
      else {
        return state
      }
    }
    case UPDATE_COMMENT_VOTE: {

      if (action.commentData.success) {
        const commmentToChange = Object.assign({}, state.find((comment) => (comment.id === action.commentData.commentId)))
        const newState = state.filter((comment) => (comment.id !== action.commentData.commentId))
        if (action.commentData.option === KEY_INC) {
          commmentToChange.voteScore = commmentToChange.voteScore + 1
        }
        if (action.commentData.option === KEY_DEC) {
          commmentToChange.voteScore = commmentToChange.voteScore - 1
        }
        return newState.concat(commmentToChange)
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
  comments
})
