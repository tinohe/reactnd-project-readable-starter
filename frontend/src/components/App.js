import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import ErrorPage from './ErrorPage'
import Posts from './Posts'
import Post from './Post'
import { connect } from 'react-redux'
import { fetchCategories, fetchPosts } from '../actions'

class App extends Component {

  componentDidMount = () => {
    this.props.dispatch(fetchCategories())
    this.props.dispatch(fetchPosts())
  }

  render() {
    const categories = this.props.categories
    const categoriesForRouting = [{ name: '', path: '/' }, { name: '', path: '/categories' }].concat(categories)

    const posts = this.props.posts

    return (
      <div>
        <Switch>
          {categoriesForRouting.map((category) => (
            <Route key={category.path}
              exact path={category.name ? `/categories/${category.path}` : category.path}
              render={() => (<Posts />)}
            />))}

          {posts.map((post) => (
            <Route key={post.id}
              exact path={`/posts/${post.id}`}
              render={() => (<Post postId={post.id} />)}
            />))}

          {<Route
            render={() => (<ErrorPage />)}
          />}
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    posts: state.posts
  }
}

export default connect(mapStateToProps)(App)
