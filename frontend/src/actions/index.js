import * as API from '../utils/Api'
import * as UUID from '../utils/UUID'

export const CREATE_POST = 'CREATE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_POST_VOTE = 'UPDATE_POST_VOTE'

export const CREATE_COMMENT = 'CREATE_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const UPDATE_COMMENT_VOTE = 'UPDATE_COMMENT_VOTE'

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_POST = 'FETCH_POST'
export const FETCH_COMMENTS = 'FETCH_COMMENTS'

export const CHANGE_POST_CREATE_DIALOG_STATE = 'CHANGE_POST_CREATE_DIALOG_STATE'
export const CHANGE_POST_UPDATE_DIALOG_STATE = 'CHANGE_POST_UPDATE_DIALOG_STATE'
export const CHANGE_POST_DELETE_DIALOG_STATE = 'CHANGE_POST_DELETE_DIALOG_STATE'
export const CHANGE_POST_VOTE_STATE = 'CHANGE_POST_VOTE_STATE'

export const CHANGE_COMMENT_CREATE_DIALOG_STATE = 'CHANGE_COMMENT_CREATE_DIALOG_STATE'
export const CHANGE_COMMENT_UPDATE_DIALOG_STATE = 'CHANGE_COMMENT_UPDATE_DIALOG_STATE'
export const CHANGE_COMMENT_DELETE_DIALOG_STATE = 'CHANGE_COMMENT_DELETE_DIALOG_STATE'
export const CHANGE_COMMENT_VOTE_STATE = 'CHANGE_COMMENT_VOTE_STATE'


export const changePostCreateDialogState = (dialogState) => {
  return {
    type: CHANGE_POST_CREATE_DIALOG_STATE,
    dialogState
  }
}

export const changePostUpdateDialogState = (dialogState) => {
  return {
    type: CHANGE_POST_UPDATE_DIALOG_STATE,
    dialogState
  }
}

export const changePostDeleteDialogState = (dialogState) => {
  return {
    type: CHANGE_POST_DELETE_DIALOG_STATE,
    dialogState
  }
}

export const changePostVoteState = (state) => {
  return {
    type: CHANGE_POST_VOTE_STATE,
    state
  }
}

export const changeCommentCreateDialogState = (dialogState) => {
  return {
    type: CHANGE_COMMENT_CREATE_DIALOG_STATE,
    dialogState
  }
}

export const changeCommentUpdateDialogState = (dialogState) => {
  return {
    type: CHANGE_COMMENT_UPDATE_DIALOG_STATE,
    dialogState
  }
}

export const changeCommentDeleteDialogState = (dialogState) => {
  return {
    type: CHANGE_COMMENT_DELETE_DIALOG_STATE,
    dialogState
  }
}

export const changeCommentVoteState = (state) => {
  return {
    type: CHANGE_COMMENT_VOTE_STATE,
    state
  }
}

export const fetchCategories = () => dispatch => (
  API.fetchCategories()
    .then((response) => (response.json()))
    .then((json) => (json.categories))
    .then((categories) => dispatch(
      {
        type: FETCH_CATEGORIES,
        categories
      }
    ))
)

export const fetchPosts = (category) => dispatch => (
  API.fetchPosts(category)
    .then((response) => (response.json()))
    .then((posts) => dispatch(
      {
        type: FETCH_POSTS,
        posts
      }
    ))
)

export const fetchPost = (postId) => dispatch => (
  API.fetchPost(postId)
    .then((post) => dispatch(
      {
        type: FETCH_POST,
        post
      }
    ))
)

export const createPost = (postData) => dispatch => {
  postData.timestamp = Date.now()
  postData.id = UUID.create()

  API.createPost(postData)
    .then((response) => {
      if (response.ok) {
        dispatch(changePostCreateDialogState({ showPostDialog: false }))
        return response.json();
      } else {
        dispatch(changePostCreateDialogState({ showPostDialog: true, error: `error-code: ${response.status} (${response.statusText})` }))
      }
    })
    .then((post) => dispatch(
      {
        type: CREATE_POST,
        post
      }
    ))
    .catch((err) => dispatch(changePostCreateDialogState({ showPostDialog: true, error: `error-code: ${err}` }))
    )
}

export const updatePost = (postData) => dispatch => {

  API.updatePost(postData)
    .then((response) => {
      if (response.ok) {
        dispatch(changePostUpdateDialogState({ postId: postData.id, showPostDialog: false }))
        return response.json();
      } else {
        dispatch(changePostUpdateDialogState({ postId: postData.id, showPostDialog: true, error: `error-code: ${response.status} (${response.statusText})` }))
      }
    })
    .then((post) => dispatch(
      {
        type: UPDATE_POST,
        post
      }
    ))
    .catch((err) => dispatch(changePostUpdateDialogState({ showPostDialog: true, error: `error-code: ${err}` })))
}

export const deletePost = (postId) => dispatch => {
  API.deletePost(postId)
    .then((response) => {
      if (response.ok) {
        dispatch(changePostDeleteDialogState({ postId: postId, showPostDialog: false }))
        return response.json();
      } else {
        dispatch(changePostDeleteDialogState({ postId: postId, showPostDialog: true, error: `error-code: ${response.status} (${response.statusText})` }))
        return { deleted: false }
      }
    })
    .then((result) => dispatch(
      {
        type: DELETE_POST,
        postData: result
      }
    ))
    .catch((err) => dispatch(changePostDeleteDialogState({ showPostDialog: true, error: `error-code: ${err}` })))
}

export const updatePostVote = (postData) => dispatch => {
  API.updatePostVote(postData)
    .then((response) => {
      if (response.ok) {
        dispatch(changePostVoteState({ postId: postData.postId, error: null }))
        return Object.assign({}, postData, { success: true })
      } else {
        dispatch(changePostVoteState({ postId: postData.postId, error: `error-code: ${response.status} (${response.statusText})` }))
        return Object.assign({}, postData, { success: false })
      }
    })
    .then((result) => dispatch(
      {
        type: UPDATE_POST_VOTE,
        postData: result
      }
    ))
    .catch((err) => dispatch(changePostVoteState({ postId: postData.postId, error: `error-code: ${err}` })))
}

export const fetchComments = (postId) => dispatch => (
  API.fetchComments(postId)
    .then((comments) => dispatch(
      {
        type: FETCH_COMMENTS,
        comments
      }
    ))
)

export const createComment = (commentData) => dispatch => {
  commentData.timestamp = Date.now()
  commentData.id = UUID.create()

  API.createComment(commentData)
    .then((response) => {
      if (response.ok) {
        dispatch(changeCommentCreateDialogState({ showCommentDialog: false }))
        return response.json();
      } else {
        dispatch(changeCommentCreateDialogState({ showCommentDialog: true, error: `error-code: ${response.status} (${response.statusText})` }))
      }
    })
    .then((comment) => dispatch(
      {
        type: CREATE_COMMENT,
        comment
      }
    ))
    .catch((err) => dispatch(changeCommentCreateDialogState({ showCommentDialog: true, error: `error-code: ${err}` })))
}

export const updateComment = (commentData) => dispatch => {

  API.updateComment(commentData)
    .then((response) => {
      if (response.ok) {
        dispatch(changeCommentUpdateDialogState({ commentId: commentData.id, showPostDialog: false }))
        return response.json();
      } else {
        dispatch(changeCommentUpdateDialogState({ commentId: commentData.id, showPostDialog: true, error: `error-code: ${response.status} (${response.statusText})` }))
      }
    })
    .then((comment) => dispatch(
      {
        type: UPDATE_COMMENT,
        comment
      }
    ))
    .catch((err) => dispatch(changeCommentUpdateDialogState({ showCommentDialog: true, error: `error-code: ${err}` })))
}


export const deleteComment = (commentId) => dispatch => {
  API.deleteComment(commentId)
    .then((response) => {
      if (response.ok) {
        dispatch(changeCommentDeleteDialogState({ commentId: commentId, showCommentDialog: false }))
        return response.json();
      } else {
        dispatch(changeCommentDeleteDialogState({ commentId: commentId, showCommentDialog: true, error: `error-code: ${response.status} (${response.statusText})` }))
        return { deleted: false }
      }
    })
    .then((result) => dispatch(
      {
        type: DELETE_COMMENT,
        commentData: result
      }
    ))
    .catch((err) => dispatch(changeCommentDeleteDialogState({ showCommentDialog: true, error: `error-code: ${err}` })))
}

export const updateCommentVote = (commentData) => dispatch => {
  API.updateCommentVote(commentData)
    .then((response) => {
      if (response.ok) {
        dispatch(changeCommentVoteState({ commentId: commentData.commentId, error: null }))
        return Object.assign({}, commentData, { success: true })
      } else {
        dispatch(changeCommentVoteState({ commentId: commentData.commentId, error: `error-code: ${response.status} (${response.statusText})` }))
        return Object.assign({}, commentData, { success: false })
      }
    })
    .then((result) => dispatch(
      {
        type: UPDATE_COMMENT_VOTE,
        commentData: result
      }
    ))
    .catch((err) => dispatch(changeCommentVoteState({ commentId: commentData.commentId, error: `error-code: ${err}` })))
}


