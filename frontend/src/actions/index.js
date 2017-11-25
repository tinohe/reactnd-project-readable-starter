export const CREATE_POST = 'CREATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const INC_POST_VOTE = 'INC_POST_VOTE'
export const DEC_POST_VOTE = 'DEC_POST_VOTE'

export const CREATE_COMMENT = 'CREATE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const INC_COMMENT_VOTE = 'INC_COMMENT_VOTE'
export const DEC_COMMENT_VOTE = 'DEC_COMMENT_VOTE'


export createPost = ({ id, title, body, author, category }) => {
  return {
    type: CREATE_POST,
    id,
    title,
    body,
    author,
    category
  }
}

export deletePost = (postId) => {
  return {
    type: DELETE_POST,
    postId
  }
}

export incPostVote = (postId) => {
  return {
    type: INC_POST_VOTE,
    postId
  }
}

export decPostVote = (postId) => {
  return {
    type: DEC_POST_VOTE,
    postId
  }
}

export createComment = ({ id, postId, body, author }) => {
  return {
    type: CREATE_POST,
    id,
    postId,
    title,
    body,
    author,
    category
  }
}

export deleteComment = (commentId) => {
  return {
    type: DELETE_COMMENT,
    commentId
  }
}

export incCommentVote = (commentId) => {
  return {
    type: INC_COMMENT_VOTE,
    commentId
  }
}

export decCommentVote = (commentId) => {
  return {
    type: DEC_COMMENT_VOTE,
    commentId
  }
}
