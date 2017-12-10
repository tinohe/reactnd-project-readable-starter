import {
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  UPDATE_POST_VOTE,
  CREATE_COMMENT,
  DELETE_COMMENT,
  FETCH_POSTS,
  FETCH_POST
} from '../actions'

import { KEY_INC, KEY_DEC } from '../components/VoteScore'

export const posts = (state = [], action) => {

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