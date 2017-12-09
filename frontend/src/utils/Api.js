const HOST_AND_PORT = 'http://localhost:3001'


const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'some-private-key'
}

export const fetchCategories = () => {

  return fetch(`${HOST_AND_PORT}/categories`, { headers, method: 'GET' })
    .then((response) => response.json())
    .then((categories) => categories.categories)
}

export const fetchPosts = (category) => {
  if (category) {
    return fetch(`${HOST_AND_PORT}/${category}/posts`, { headers, method: 'GET' })
      .then((response) => response.json())
  }
  else {
    return fetch(`${HOST_AND_PORT}/posts`, { headers, method: 'GET' })
      .then((response) => response.json())
  }
}

export const fetchPost = (postId) => {

  return fetch(`${HOST_AND_PORT}/posts/${postId}`, { headers, method: 'GET' })
    .then((response) => response.json())
}

export const fetchCommentForPost = (postId) => {

  return fetch(`${HOST_AND_PORT}/posts/${postId}/comments`, { headers, method: 'GET' })
    .then((response) => response.json())
}

export const createComment = (commentData) => {
  return fetch(`${HOST_AND_PORT}/comments`, { headers, method: 'POST', body: JSON.stringify(commentData) })
    .then((response) => response.json())
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

export const updateVote = (postData) => {
  return fetch(`${HOST_AND_PORT}/posts/${postData.postId}`, { headers, method: 'POST', body: JSON.stringify({ option: postData.option }) })
}
