import * as API from '../utils/Api'
import * as UUID from '../utils/UUID'

export const CREATE_POST = 'CREATE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_POST_VOTE = 'UPDATE_POST_VOTE'

export const CREATE_COMMENT = 'CREATE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const INC_COMMENT_VOTE = 'INC_COMMENT_VOTE'
export const DEC_COMMENT_VOTE = 'DEC_COMMENT_VOTE'

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_POST = 'FETCH_POST'

export const CHANGE_POST_CREATE_DIALOG_STATE = 'CHANGE_POST_CREATE_DIALOG_STATE'
export const CHANGE_POST_UPDATE_DIALOG_STATE = 'CHANGE_POST_UPDATE_DIALOG_STATE'
export const CHANGE_POST_DELETE_DIALOG_STATE = 'CHANGE_POST_DELETE_DIALOG_STATE'
export const CHANGE_POST_VOTE_STATE = 'CHANGE_POST_VOTE_STATE'


export const UPDATE_COMMENT_DIALOG_STATE = 'UPDATE_COMMENT_DIALOG_STATE'


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

export const updateCommentDialogState = (dialogState) => {
  return {
    type: UPDATE_COMMENT_DIALOG_STATE,
    dialogState
  }
}

export const fetchCategories = () => dispatch => (
  API.fetchCategories()
    .then((categories) => dispatch(
      {
        type: FETCH_CATEGORIES,
        categories
      }
    ))
)

export const fetchPosts = (category) => dispatch => (
  API.fetchPosts(category)
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
}

export const deletePost = (postId) => dispatch => {
  API.deletePost(postId)
    .then((response) => {
      if (response.ok) {
        dispatch(changePostDeleteDialogState({ postId: postId, showPostDialog: false }))
        return response.json();
      } else {
        dispatch(changePostDeleteDialogState({ postId: postId, showPostDialog: true, error: `error-code: ${response.status} (${response.statusText})` }))
        return {deleted: false}
      }
    })
    .then((result) => dispatch(
      {
        type: DELETE_POST,
        postData: result
      }
    ))
}

export const updatePostVote = (postData) => dispatch => {
  API.updateVote(postData)
    .then((response) => {
      if (response.ok) {
        dispatch(changePostVoteState({ postId: postData.postId, error: null }))
        return Object.assign({}, postData, {success: true})
      } else {
        dispatch(changePostVoteState({ postId: postData.postId, error: `error-code: ${response.status} (${response.statusText})` }))
        return Object.assign({}, postData, {success: false})
      }
    })
    .then((result) => dispatch(
      {
        type: UPDATE_POST_VOTE,
        postData: result
      }
    ))
}

export const createComment = ({ id, postId, body, author }) => {
  return {
    type: CREATE_POST,
    id,
    postId,
    body,
    author,
  }
}

export const deleteComment = (commentId) => {
  return {
    type: DELETE_COMMENT,
    commentId
  }
}

export const incCommentVote = (commentId) => {
  return {
    type: INC_COMMENT_VOTE,
    commentId
  }
}

export const decCommentVote = (commentId) => {
  return {
    type: DEC_COMMENT_VOTE,
    commentId
  }
}
