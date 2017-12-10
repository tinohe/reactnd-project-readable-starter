import {
  CREATE_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT_VOTE,
  FETCH_COMMENTS
} from '../actions'

import { KEY_INC, KEY_DEC } from '../components/VoteScore'

export const comments = (state = [], action) => {
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
        const commmentToChange = {...state.find((comment) => (comment.id === action.commentData.commentId))}
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