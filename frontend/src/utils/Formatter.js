
export const formatTimestamp = (timestamp) => {

  const date = new Date(timestamp)
  return `${date.toLocaleDateString()}`
}

export const formatAuthorAndTimestamp = (actionName, author, timestamp) => {
  return `${actionName} by ${author} on ${formatTimestamp(timestamp)}`
}
