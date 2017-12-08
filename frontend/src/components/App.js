import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import ErrorPage from './ErrorPage'
import Posts from './Posts'
import Post from './Post'
import { connect } from 'react-redux'
import { fetchCategories, fetchPosts } from '../actions'
import { PageHeader } from 'react-bootstrap'

class App extends Component {

  componentDidMount = () => {
    this.props.fetchCategories()
    this.props.fetchPosts()
  }

  render() {

    return (
      <div>
        <PageHeader>Readable <small>A React Nanodegree Project</small></PageHeader>

        <Switch>
          <Route exact path='/' render={(props) => (<Posts {...props}/>)} />
          <Route exact path='/:category' render={(props) => (<Posts {...props} />)} /> />
          <Route exact path='/:category/:post_id' render={(props) => (<Post {...props}/>)} />
          <Route render={() => (<ErrorPage />)} />
        </Switch>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: () => { dispatch(fetchCategories()) },
    fetchPosts: () => { dispatch(fetchPosts()) }
  }
}

export default connect(null, mapDispatchToProps)(App)
