import React, { Component } from 'react'
import Posts from './Posts'
import * as API from '../utils/Api'
import { Route, Switch } from 'react-router-dom';

class App extends Component {

  state = {
    categories: [],
    posts: [],
    selectedCategory: '',
  }

  componentDidMount = () => {
    API.fetchCategories()
      .then((categories) => this.setState({categories: categories}))
    API.fetchPosts()
      .then((posts) => this.setState({posts: posts}))
  }

  render() {
    const categories = this.state.categories
    const categoriesForRouting = [{name: '', path:'/'}, {name: '', path: '/categories'}].concat(categories)
    return (
      <div>
        <Switch>
          {categoriesForRouting.map((category) => (
            <Route key={category.path} exact path={category.name ? `/categories/${category.path}` : category.path} render={() => (
              <Posts
              categories={categories}
              selectedCategory={category}
              posts={this.state.posts.filter((post) => (category.name ? (post.category === category.name) : true))}
            />)}
            />))}
            </Switch>
            </div>
          )
  }
}

export default App
