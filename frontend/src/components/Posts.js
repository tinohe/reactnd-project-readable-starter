import React, { Component } from 'react'
import { Alert, Nav, NavItem, Panel, Button, ToggleButtonGroup, Glyphicon, ToggleButton, ButtonToolbar } from 'react-bootstrap'
import Post from './Post'
import EditCreateModal from './EditCreateModal'

import EntityType from '../utils/EntityType'
import ActionType from '../utils/ActionType'

import SortMode from '../utils/SortMode'
import { connect } from 'react-redux'

import { fetchPosts } from '../actions'

import { changePostCreateDialogState, createPost } from '../actions'

class Posts extends Component {

  state = {
    selectedSearchMode: SortMode.voteScore,
  }

  componentDidMount = () => {
    this.props.fetchPosts(this.props.activeCategory)
  }

  sortPosts = (posts) => {
    if (this.state.selectedSearchMode === SortMode.timestamp) {
      return posts.sort((a, b) => b.timestamp - a.timestamp)
    } else {
      return posts.sort((a, b) => b.voteScore - a.voteScore)
    }
  }

  onSearchModeChanged = (value) => {
    this.setState({ selectedSearchMode: value })
  }

  onOpenCreatePost = () => {
    this.props.changePostCreateDialogState({ showPostDialog: true })
  }

  onCreatePostCancel = () => {
    this.props.changePostCreateDialogState({ showPostDialog: false })
  }

  onCreatePostSubmit = (postData) => {
    this.props.onPostSubmit(postData)
  }

  arePostsAvailable = () => {
    return this.props.posts.length > 0
  }

  render() {
    const { posts, categories, activeCategory, uiDialogState } = this.props

    return (
      <div>
        <Nav bsStyle='tabs' activeKey={activeCategory ? activeCategory : ''} >
          <NavItem eventKey='' href='/'><Glyphicon glyph='home' /></NavItem>
          {categories && categories.map(category => (
            <NavItem key={category.path} eventKey={category.name} href={`/${category.path}`}>{category.name}</NavItem>
          ))}
        </Nav>
        <Panel>

          <Button bsStyle='primary' className='createPost' onClick={this.onOpenCreatePost}>
            <Glyphicon glyph='plus' />&nbsp;&nbsp;{ActionType.Create.name} {EntityType.Post.name}
          </Button>

          {this.arePostsAvailable() &&
            <div>
              <h5>Sort Posts by:</h5>
              <ButtonToolbar className='searchModes settings'>
                <ToggleButtonGroup type='radio' name='sortMode' defaultValue={this.state.selectedSearchMode} onChange={this.onSearchModeChanged}>
                  {SortMode.enumValues.map((e) => (<ToggleButton key={e.name} value={e}>{e.name}</ToggleButton>))}
                </ToggleButtonGroup>
              </ButtonToolbar>
            </div>
          }

          {!this.arePostsAvailable() &&
            <Alert bsStyle="info">
              <h4>No posts found!</h4>
            </Alert>
          }

          {this.sortPosts(posts).map((post) => (<Post key={post.id} postId={post.id} showPostDetails={false} />))}

          {uiDialogState.showPostCreateDialog && <EditCreateModal
            actionType={ActionType.Create}
            entityType={EntityType.Post}
            entity={{}}
            onCancel={this.onCreatePostCancel}
            onSubmit={this.onCreatePostSubmit}
            categories={categories} />}
        </Panel>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const activeCategory = ownProps.match.params.category

  return {
    categories: state.categories,
    activeCategory: activeCategory,
    posts: state.posts.filter((post) => (activeCategory ? (post.category === activeCategory) : true)),
    uiDialogState: state.uiDialogState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPostSubmit: (postData) => { dispatch(createPost(postData)) },
    changePostCreateDialogState: (dialogState) => { dispatch(changePostCreateDialogState(dialogState)) },
    fetchPosts: (category) => { dispatch(fetchPosts(category)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
