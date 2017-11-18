export const CREATE_POST = 'CREATE_POST'

export function createPost ({ id, title, body, author, category }) {
  return {
    type: CREATE_POST,
    id,
    title,
    body,
    author,
    category
  }
}
