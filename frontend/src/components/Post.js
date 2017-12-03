import React, { Component } from 'react'
import { Panel, Grid, Row, Col, Badge, Button, ButtonGroup, Tooltip, ButtonToolbar, OverlayTrigger, Glyphicon } from 'react-bootstrap'
import * as Formatter from '../utils/Formatter'
import * as API from '../utils/Api'
import Comment from './Comment'
import VoteScore from './VoteScore'
import EditDeleteButtonGroup from './EditDeleteButtonGroup'
import EditComment from './EditComment'
import EntityType from '../utils/EntityType'
import ActionType from '../utils/ActionType'
import { connect } from 'react-redux'

import { updatePost, fetchPost, changePostUpdateDialogState } from '../actions'

class Post extends Component {

  state = {
    comments: [],
    showCreateCommentDialog: false,
  }

  fetchCommentsForPost = (postId) => {
    API.fetchCommentForPost(postId)
      .then((comments) => comments.sort((a, b) => b.voteScore - a.voteScore))
      .then((comments) => this.setState({ comments: comments }))
  }

  componentDidMount = () => {
    // this.fetchCommentsForPost(this.props.postId)
  }

  onEditPostClick = () => {
    this.props.changePostUpdateDialogState({ showPostDialog: true, postId: this.props.post.id })
  }

  onEditPostCancel = () => {
    this.props.changePostUpdateDialogState({ showPostDialog: false, postId: this.props.post.id })
  }

  // onEditPostSubmit = () => {
  //   this.setState({showEditPostDialog: false})
  // }

  onOpenCreateComment = () => {
    this.setState({ showCreateCommentDialog: true })
  }

  onCreateCommentCancel = () => {
    this.setState({ showCreateCommentDialog: false })
  }

  onCreateCommentSubmit = () => {
    this.setState({ showCreateCommentDialog: false })
  }

  onVoteChange = (voteChange) => {
    console.log(voteChange);
  }

  getComments = () => {
    return this.state.comments.map((comment) => <Comment key={comment.id} comment={comment} />)
  }

  render() {
    const { post, categories, onEditPostSubmit, uiDialogState, changePostUpdateDialogState } = this.props

    console.log(post)

    return (
      <Panel header={Formatter.formatAuthorAndTimestamp('Posted', post.author, post.timestamp)}>
        <Grid>
          <Row>
            <Col>
              <ButtonToolbar>
                <EditDeleteButtonGroup entityType={EntityType.Post} onEditClick={this.onEditPostClick} />
                <ButtonGroup>
                  <OverlayTrigger placement='top' overlay={<Tooltip id='create-comment'>{ActionType.Create.name} {EntityType.Comment.name}</Tooltip>}>
                    <Button onClick={this.onOpenCreateComment}>
                      <Glyphicon glyph='plus' />
                    </Button>
                  </OverlayTrigger>
                </ButtonGroup>
              </ButtonToolbar>
            </Col>
            <Col><h3>{post.title}</h3></Col>
          </Row>
          <Row><h4>{post.body}</h4></Row>
          <VoteScore voteScore={post.voteScore} onVoteChange={this.onVoteChange} />
          <Row>Number of Comments: <Badge>{post.commentCount}</Badge></Row>
        </Grid>
        <div className='comments'>
          {this.getComments()}
        </div>

        {this.state.showCreateCommentDialog && <EditComment
          actionType={ActionType.Create}
          entityType={EntityType.Comment}
          entity={{}}
          onCancel={this.onCreateCommentCancel}
          onSubmit={this.onCreateCommentSubmit} />}

        {uiDialogState.showPostUpdateDialog && uiDialogState.postId === post.id && <EditComment
          actionType={ActionType.Edit}
          entityType={EntityType.Post}
          entity={post}
          onCancel={this.onEditPostCancel}
          onSubmit={onEditPostSubmit}
          categories={categories} />}

      </Panel>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categories,
    post: state.posts.filter((post) => post.id === ownProps.postId)[0],
    uiDialogState: state.uiDialogState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEditPostSubmit: (postData) => { dispatch(updatePost(postData)) },
    fetchPost: (postId) => { dispatch(fetchPost(postId)) },
    changePostUpdateDialogState: (dialogState) => { dispatch(changePostUpdateDialogState(dialogState)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
