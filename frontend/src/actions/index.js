import * as API from '../utils/Api'
import * as UUID from '../utils/UUID'

export const CREATE_POST = 'CREATE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const INC_POST_VOTE = 'INC_POST_VOTE'
export const DEC_POST_VOTE = 'DEC_POST_VOTE'

export const CREATE_COMMENT = 'CREATE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const INC_COMMENT_VOTE = 'INC_COMMENT_VOTE'
export const DEC_COMMENT_VOTE = 'DEC_COMMENT_VOTE'

export const FETCH_CATEGORIES ='FETCH_CATEGORIES'
export const FETCH_POSTS ='FETCH_POSTS'
export const FETCH_POST ='FETCH_POST'

export const UPDATE_POST_DIALOG_STATE = 'UPDATE_POST_DIALOG_STATE'
export const UPDATE_COMMENT_DIALOG_STATE = 'UPDATE_COMMENT_DIALOG_STATE'


export const updatePostDialogState = (dialogState) => {
  return {
      type: UPDATE_POST_DIALOG_STATE,
      dialogState
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

export const fetchPosts = () => dispatch => (
  API.fetchPosts()
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
  postData.timestamp=Date.now()
  postData.id=UUID.create()

  API.createPost(postData)
    .then((post) => dispatch(
      {
        type: CREATE_POST,
        post
      }
    ))
}

export const updatePost = (postData) => dispatch => {

  API.updatePost(postData)
    .then((post) => dispatch(
      {
        type: UPDATE_POST,
        post
      }
    ))
}

export const deletePost = (postId) => {
  return {
    type: DELETE_POST,
    postId
  }
}

export const incPostVote = (postId) => {
  return {
    type: INC_POST_VOTE,
    postId
  }
}

export const decPostVote = (postId) => {
  return {
    type: DEC_POST_VOTE,
    postId
  }
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
