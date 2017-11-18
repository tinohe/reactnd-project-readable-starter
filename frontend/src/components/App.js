import React, { Component } from 'react'
import {Panel, PageHeader} from 'react-bootstrap'
import Posts from './Posts'
import * as API from '../utils/Api'

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

  onSelectedCategoryChanged = (category) => {
    let newCategory = ''
    if (category !== this.state.selectedCategory) {
      newCategory = category
    }
    this.setState({selectedCategory: newCategory})
  }

  render() {
    return (
      <div>
        <Panel>
          <PageHeader>Readable <small>A React Nanodegree Project</small></PageHeader>
          <Posts
            onSelectedCategoryChanged={this.onSelectedCategoryChanged}
            categories={this.state.categories}
            selectedCategory={this.state.selectedCategory}
            posts={this.state.posts.filter((post) => (this.state.selectedCategory ? (post.category === this.state.selectedCategory) : true))}
          />

          </Panel>
      </div>
    )
  }
}

export default App
