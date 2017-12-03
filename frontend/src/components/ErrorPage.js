import React from 'react'
import {Link} from 'react-router-dom'
import {Jumbotron} from 'react-bootstrap'

const ErrorPage = (props) => {
  return (
    <Jumbotron>
      <h1>Oops, couldn't find your site!</h1>
      <p>Let's try the <Link to='/'>main page</Link> instead.</p>
    </Jumbotron>
 )
}

export default ErrorPage
