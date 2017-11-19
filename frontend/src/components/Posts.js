import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Panel, PageHeader, Button, ToggleButtonGroup, Glyphicon, ToggleButton , ButtonToolbar} from 'react-bootstrap'
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

  onSearchModeChanged = (value) => {
    this.setState({selectedSearchMode: value})
  }

  getClassName = (activeLink, link) => {
    return activeLink === link ? 'active' : ''
  }

  render() {

    const {posts, categories, selectedCategory} = this.props

    return (
      <Panel>
        <PageHeader>Readable <small>A React Nanodegree Project</small></PageHeader>

        <Button bsStyle='primary' className='createPost'><Glyphicon glyph='plus' />&nbsp;&nbsp;Create Post</Button>

        <h4>Show only Posts for Category:</h4>
        <div className='categories settings'>
          {categories.map((category) => (<Link className={this.getClassName(selectedCategory, category)} key={category.path} to={'/categories/' + category.path}> {category.name} </Link>))}
        </div>

        <h4>Sort Posts by:</h4>
        <ButtonToolbar className='searchModes settings'>
          <ToggleButtonGroup type='radio' name='sortMode' defaultValue={this.state.selectedSearchMode}  onChange={this.onSearchModeChanged}>
            {SortMode.enumValues.map((e) => (<ToggleButton key={e.name} value={e}>{e.name}</ToggleButton>))}
          </ToggleButtonGroup>
        </ButtonToolbar>


        {this.sortPosts(posts).map((post) => (<Post key={post.id} post={post}/>))}
      </Panel>
    )
  }
}

export default Posts
