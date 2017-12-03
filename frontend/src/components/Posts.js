import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Panel, PageHeader, Button, ToggleButtonGroup, Glyphicon, ToggleButton , ButtonToolbar} from 'react-bootstrap'
import Post from './Post'
import EditComment from './EditComment'

import EntityType from '../utils/EntityType'
import ActionType from '../utils/ActionType'

import SortMode from '../utils/SortMode'
import {connect} from 'react-redux'

import {updatePostDialogState, createPost} from '../actions'

class Posts extends Component {

  state = {
    selectedSearchMode: SortMode.voteScore,
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

  onOpenCreatePost = () => {
    this.props.updatePostDialogState({showPostDialog: true})
  }

  onCreatePostCancel = () => {
    this.props.updatePostDialogState({showPostDialog: false})
  }

  onCreatePostSubmit = (postData) => {
    this.props.updatePostDialogState({showPostDialog: false})
    this.props.onPostSubmit(postData)
  }

  getClassName = (activeLink, link) => {
    return activeLink === link ? 'active' : ''
  }

  render() {
    const {posts, categories, selectedCategory, uiDialogState} = this.props

    return (
      <Panel>
        <PageHeader>Readable <small>A React Nanodegree Project</small></PageHeader>

        <Button bsStyle='primary' className='createPost' onClick={this.onOpenCreatePost}>
          <Glyphicon glyph='plus' />&nbsp;&nbsp;{ActionType.Create.name} {EntityType.Post.name}
        </Button>

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

        {this.sortPosts(posts).map((post) => (<Post key={post.id} postId={post.id}/>))}

        {uiDialogState.showPostDialog && <EditComment
          actionType={ActionType.Create}
          entityType={EntityType.Post}
          entity={{}}
          onCancel={this.onCreatePostCancel}
          onSubmit={this.onCreatePostSubmit}
          categories={categories}/>}
      </Panel>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    // category: state.selectedCategory,
    // posts: state.posts.filter((post) => (state.selectedCategory ? (post.category === state.selectedCategory) : true)),
    posts: state.posts,
    categories: state.categories,
    uiDialogState: state.uiDialogState

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPostSubmit: (postData) => {dispatch(createPost(postData))},
    updatePostDialogState: (dialogState) => {dispatch(updatePostDialogState(dialogState))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
