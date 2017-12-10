import React, { Component } from 'react'
import { Panel, Grid, Row, Col, ButtonToolbar } from 'react-bootstrap'
import * as Formatter from '../utils/Formatter'
import EntityType from '../utils/EntityType'
import ActionType from '../utils/ActionType'
import VoteScore from './VoteScore'
import EditCreateModal from './EditCreateModal'
import ConfirmDeletionModal from './ConfirmDeletionModal'

import EditDeleteButtonGroup from './EditDeleteButtonGroup'
import { connect } from 'react-redux'
import { updateComment, changeCommentUpdateDialogState, deleteComment, changeCommentDeleteDialogState, updateCommentVote } from '../actions'


class Comment extends Component {

  onEditCommentClick = () => {
    this.props.changeCommentUpdateDialogState({ showCommentDialog: true, commentId: this.props.comment.id })
  }

  onEditCommentCancel = () => {
    this.props.changeCommentUpdateDialogState({ showCommentDialog: false, commentId: this.props.comment.id })
  }

  onDeleteCommentClick = () => {
    this.props.changeCommentDeleteDialogState({ showCommentDialog: true, commentId: this.props.comment.id })
  }

  onDeleteCommentCancel = () => {
    this.props.changeCommentDeleteDialogState({ showCommentDialog: false, commentId: this.props.comment.id })
  }

  onDeleteCommentConfirm = () => {
    this.props.deleteComment(this.props.comment.id)
    this.setState({ showConfirmDeleteComment: false })
  }

  onVoteChange = (voteChange) => {
    this.props.updateCommentVote({ commentId: this.props.comment.id, option: voteChange })
  }


  render() {
    const { comment, uiDialogState, onEditCommentSubmit } = this.props
    return (
      <Panel header={Formatter.formatAuthorAndTimestamp('Commented', comment.author, comment.timestamp)}>
        <Grid>
          <Row>
            <Col>
              <ButtonToolbar>
                <EditDeleteButtonGroup entityType={EntityType.Comment} bsSize='xsmall' onEditClick={this.onEditCommentClick} onDeleteClick={this.onDeleteCommentClick} />
              </ButtonToolbar>
            </Col>
          </Row>
          <Row><h5>{comment.body}</h5></Row>
          <VoteScore voteScore={comment.voteScore} onVoteChange={this.onVoteChange} />
        </Grid>

        {uiDialogState.showCommentUpdateDialog && uiDialogState.commentId === comment.id && <EditCreateModal
          actionType={ActionType.Edit}
          entityType={EntityType.Comment}
          entity={comment}
          onCancel={this.onEditCommentCancel}
          onSubmit={onEditCommentSubmit} />}

        {uiDialogState.showCommentDeleteDialog && uiDialogState.commentId === comment.id && <ConfirmDeletionModal
          entityType={EntityType.Comment}
          error={uiDialogState.deleteError}
          onCancel={this.onDeleteCommentCancel}
          onConfirm={this.onDeleteCommentConfirm} />}

      </Panel>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    uiDialogState: state.uiDialogState,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEditCommentSubmit: (commentData) => { dispatch(updateComment(commentData)) },
    changeCommentUpdateDialogState: (dialogState) => { dispatch(changeCommentUpdateDialogState(dialogState)) },
    changeCommentDeleteDialogState: (dialogState) => { dispatch(changeCommentDeleteDialogState(dialogState)) },
    deleteComment: (commentId) => dispatch(deleteComment(commentId)),
    updateCommentVote: (commentId) => dispatch(updateCommentVote(commentId)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Comment)
