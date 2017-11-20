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

export const fetchPosts = () => {

  return fetch(`${HOST_AND_PORT}/posts`, { headers, method: 'GET' })
    .then((response) => response.json())
}

export const fetchCommentForPost = (postId) => {

  return fetch(`${HOST_AND_PORT}/posts/${postId}/comments`, { headers, method: 'GET' })
    .then((response) => response.json())
}

export const createComment = (commentData) => {
  return fetch(`${HOST_AND_PORT}/comments`, { headers, method: 'POST',  body: JSON.stringify(commentData)})
    .then((response) => response.json())
}
