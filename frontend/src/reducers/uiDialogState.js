
import {

  CHANGE_POST_CREATE_DIALOG_STATE,
  CHANGE_POST_UPDATE_DIALOG_STATE,
  CHANGE_POST_DELETE_DIALOG_STATE,
  CHANGE_POST_VOTE_STATE,
  CHANGE_COMMENT_CREATE_DIALOG_STATE,
  CHANGE_COMMENT_UPDATE_DIALOG_STATE,
  CHANGE_COMMENT_DELETE_DIALOG_STATE,
  CHANGE_COMMENT_VOTE_STATE,
} from '../actions'



export const uiDialogState = (state = {}, action) => {
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