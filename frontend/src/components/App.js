import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import ErrorPage from './ErrorPage'
import Posts from './Posts'
import Post from './Post'
import { connect } from 'react-redux'
import { fetchCategories } from '../actions'
import { PageHeader } from 'react-bootstrap'

class App extends Component {

  componentDidMount = () => {
    this.props.fetchCategories()
  }

  render() {

    return (
      <div>
        <PageHeader><a href='/'>Readable <small>A React Nanodegree Project</small></a></PageHeader>

        <Switch>
          <Route exact path='/' render={(props) => (<Posts {...props}/>)} />
          <Route exact path='/:category' render={(props) => (<Posts {...props} />)} /> />
          <Route exact path='/:category/:postId' render={(props) => (<Post {...props} showPostDetails={true}/>)} />
          <Route render={() => (<ErrorPage />)} />
        </Switch>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: () => { dispatch(fetchCategories()) },
  }
}

export default connect(null, mapDispatchToProps)(App)
