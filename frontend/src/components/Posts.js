import React, { Component } from 'react'
import {NavItem, Nav, Button, ToggleButtonGroup, Glyphicon, ToggleButton , ButtonToolbar} from 'react-bootstrap'
import Post from './Post'

import SortMode from '../utils/SortMode'

class Posts extends Component {

  state = {
    selectedSearchMode: SortMode.voteScore
  }

  sortPosts = (posts) => {
    if (this.state.selectedSearchMode === SortMode.timestamp) {
      return posts.sort((a,b) => b.timestamp - a.timestamp)
    } else {
      return posts.sort((a,b) => b.voteScore - a.voteScore)
    }
  }

  onSelectedCategoryChanged = (category) => {
    let newCategory = ''
    if (category !== this.state.selectedCategory) {
      newCategory = category
    }
    this.setState({selectedCategory: newCategory})
  }

  onSearchModeChanged = (value) => {
    this.setState({selectedSearchMode: value})
  }

  render() {

    const {posts, categories, selectedCategory, onSelectedCategoryChanged} = this.props

    return (
      <div>
        <Button bsStyle='primary' className='createPost'><Glyphicon glyph='plus' />&nbsp;&nbsp;Create Post</Button>
        <h4 className='h4Label'>Show only Posts for Category:</h4>
        <Nav bsStyle='pills' className='categories' activeKey={selectedCategory} onSelect={onSelectedCategoryChanged}>
          {categories.map((category) => (
            <NavItem key={category.name} eventKey={category.path}>{category.name}</NavItem>))}
        </Nav>

        <h4 className='h4Label'>Sort Posts by:</h4>
        <ButtonToolbar className='searchModes'>
          <ToggleButtonGroup type='radio' name='sortMode' defaultValue={this.state.selectedSearchMode}  onChange={this.onSearchModeChanged}>
            {SortMode.enumValues.map((e) => (<ToggleButton key={e.name} value={e}>{e.name}</ToggleButton>))}

          </ToggleButtonGroup>
        </ButtonToolbar>


        {this.sortPosts(posts).map((post) => (<Post key={post.id} post={post}/>))}
      </div>
    )
  }
}

export default Posts
