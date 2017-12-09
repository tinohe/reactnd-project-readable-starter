import React, { Component } from 'react'
import { Panel, Alert, Grid, Row, Col, Badge, Button, Tooltip, ButtonToolbar, OverlayTrigger, Glyphicon } from 'react-bootstrap'
import * as Formatter from '../utils/Formatter'
import Comment from './Comment'
import VoteScore from './VoteScore'
import EditDeleteButtonGroup from './EditDeleteButtonGroup'
import EditCreateModal from './EditCreateModal'
import EntityType from '../utils/EntityType'
import ActionType from '../utils/ActionType'
import { connect } from 'react-redux'
import ConfirmDeletionModal from './ConfirmDeletionModal'
import SubmissionAlert from './SubmissionAlert'

import { updatePost, fetchPost, fetchComments, changePostUpdateDialogState, deletePost, changePostDeleteDialogState, updatePostVote } from '../actions'

class Post extends Component {

  state = {
    comments: [],
    showCreateCommentDialog: false,
  }

  componentDidMount = () => {
    if (this.props.showPostDetails) {
      this.props.fetchPost(this.props.postId)
      this.props.fetchComments(this.props.postId)
    }
  }

  onEditPostClick = () => {
    this.props.changePostUpdateDialogState({ showPostDialog: true, postId: this.props.post.id })
  }

  onEditPostCancel = () => {
    this.props.changePostUpdateDialogState({ showPostDialog: false, postId: this.props.post.id })
  }

  onDeletePostClick = () => {
    this.props.changePostDeleteDialogState({ showPostDialog: true, postId: this.props.post.id })
  }

  onDeletePostCancel = () => {
    this.props.changePostDeleteDialogState({ showPostDialog: false, postId: this.props.post.id })
  }

  onDeletePostConfirm = () => {
    this.props.deletePost(this.props.post.id)
    this.setState({ showConfirmDeletePost: false })
  }

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
    this.props.updatePostVote({ postId: this.props.post.id, option: voteChange })
  }

  createComments = () => {
    return this.props.comments.map((comment) => <Comment key={comment.id} comment={comment} />)
  }

  render() {
    const { post, categories, onEditPostSubmit, uiDialogState, showPostDetails } = this.props

    if (!post) {
      return <Alert bsStyle="info">
        <h4>No post found!</h4>
      </Alert>
    }

    return (
      <Panel header={Formatter.formatAuthorAndTimestamp('Posted', post.author, post.timestamp)}>
        <Grid>
          <Row>
            <Col>
              <ButtonToolbar>
                {!showPostDetails &&
                  <OverlayTrigger placement='top' overlay={<Tooltip id='show details'>Show details</Tooltip>}>
                    <Button href={`/${post.category}/${post.id}`}>
                      <Glyphicon glyph='info-sign' />
                    </Button>
                  </OverlayTrigger>}
                {showPostDetails && <EditDeleteButtonGroup entityType={EntityType.Post} onEditClick={this.onEditPostClick} onDeleteClick={this.onDeletePostClick} />}
                {showPostDetails &&
                  <OverlayTrigger placement='top' overlay={<Tooltip id='create-comment'>{ActionType.Create.name} {EntityType.Comment.name}</Tooltip>}>
                    <Button onClick={this.onOpenCreateComment}>
                      <Glyphicon glyph='plus' />
                    </Button>
                  </OverlayTrigger>}

              </ButtonToolbar>
            </Col>
            <Col><h3>{post.title}</h3></Col>
          </Row>
          <Row><h4>{post.body}</h4></Row>
          <Row><h5>Category: {post.category}</h5></Row>
          <VoteScore voteScore={post.voteScore} onVoteChange={this.onVoteChange} />
          <Row>Number of Comments: <Badge>{post.commentCount}</Badge></Row>
        </Grid>
        {uiDialogState.changeVoteError && uiDialogState.postId === post.id && <SubmissionAlert error={uiDialogState.changeVoteError} />}

        {showPostDetails &&
          <div className='comments'>
            {this.createComments()}
          </div>}

        {uiDialogState.showPostDeleteDialog && uiDialogState.postId === post.id && <ConfirmDeletionModal
          entityType={EntityType.Post}
          error={uiDialogState.deleteError}
          onCancel={this.onDeletePostCancel}
          onConfirm={this.onDeletePostConfirm} />}

        {this.state.showCreateCommentDialog && <EditCreateModal
          actionType={ActionType.Create}
          entityType={EntityType.Comment}
          entity={{}}
          onCancel={this.onCreateCommentCancel}
          onSubmit={this.onCreateCommentSubmit} />}

        {uiDialogState.showPostUpdateDialog && uiDialogState.postId === post.id && <EditCreateModal
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
  const postId = ownProps.postId ? ownProps.postId : ownProps.match.params.postId
  return {
    categories: state.categories,
    postId: postId,
    post: state.posts.filter((post) => post.id === postId)[0],
    comments: state.comments.sort((a, b) => b.voteScore - a.voteScore),
    uiDialogState: state.uiDialogState,
    showPostDetails: ownProps.showPostDetails
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEditPostSubmit: (postData) => { dispatch(updatePost(postData)) },
    fetchPost: (postId) => { dispatch(fetchPost(postId)) },
    fetchComments: (postId) => { dispatch(fetchComments(postId)) },
    changePostUpdateDialogState: (dialogState) => { dispatch(changePostUpdateDialogState(dialogState)) },
    changePostDeleteDialogState: (dialogState) => { dispatch(changePostDeleteDialogState(dialogState)) },
    deletePost: (postId) => dispatch(deletePost(postId)),
    updatePostVote: (postId) => dispatch(updatePostVote(postId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
