const HOST_AND_PORT = 'http://localhost:3001'


const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'some-private-key'
}

export const fetchCategories = () => {
  return fetch(`${HOST_AND_PORT}/categories`, { headers, method: 'GET' })
}

export const fetchPosts = (category) => {
  if (category) {
    return fetch(`${HOST_AND_PORT}/${category}/posts`, { headers, method: 'GET' })
  }
  else {
    return fetch(`${HOST_AND_PORT}/posts`, { headers, method: 'GET' })
  }
}

export const fetchPost = (postId) => {

  return fetch(`${HOST_AND_PORT}/posts/${postId}`, { headers, method: 'GET' })
    .then((response) => response.json())
}

export const fetchComments = (postId) => {

  return fetch(`${HOST_AND_PORT}/posts/${postId}/comments`, { headers, method: 'GET' })
    .then((response) => response.json())
}

export const createComment = (commentData) => {
  return fetch(`${HOST_AND_PORT}/comments`, { headers, method: 'POST', body: JSON.stringify(commentData) })
}

export const updateComment = (commentData) => {
  return fetch(`${HOST_AND_PORT}/comments/${commentData.id}`, { headers, method: 'PUT', body: JSON.stringify({ body: commentData.body }) })
}

export const updateCommentVote = (commentData) => {
  return fetch(`${HOST_AND_PORT}/comments/${commentData.commentId}`, { headers, method: 'POST', body: JSON.stringify({ option: commentData.option }) })
}

export const deleteComment = (commentId) => {
  return fetch(`${HOST_AND_PORT}/comments/${commentId}`, { headers, method: 'DELETE' })
}

export const createPost = (postData) => {
  return fetch(`${HOST_AND_PORT}/posts`, { headers, method: 'POST', body: JSON.stringify(postData) })
}

export const updatePost = (postData) => {
  return fetch(`${HOST_AND_PORT}/posts/${postData.id}`, { headers, method: 'PUT', body: JSON.stringify({ title: postData.title, body: postData.body }) })
}

export const deletePost = (postId) => {
  return fetch(`${HOST_AND_PORT}/posts/${postId}`, { headers, method: 'DELETE' })
}

export const updatePostVote = (postData) => {
  return fetch(`${HOST_AND_PORT}/posts/${postData.postId}`, { headers, method: 'POST', body: JSON.stringify({ option: postData.option }) })
}
