import React, { Component } from 'react'
import {Panel, Grid, Row, Col, ButtonToolbar} from 'react-bootstrap'
import * as Formatter from '../utils/Formatter'
import EntityType from '../utils/EntityType'
import ActionType from '../utils/ActionType'
import VoteScore from './VoteScore'
import EditComment from './EditComment'

import EditDeleteButtonGroup from './EditDeleteButtonGroup'

class Comment extends Component {

  state = {showEditDialog: false}

  onEditClick = () => {
    this.setState({showEditDialog: true})
  }

  onEditCancel = () => {
    this.setState({showEditDialog: false})
  }

  onEditSubmit = () => {
    this.setState({showEditDialog: false})
  }

  onVoteChange = (voteChange) => {
    console.log(voteChange);
  }

  render() {
    const {comment} = this.props
    return (
      <Panel header={Formatter.formatAuthorAndTimestamp('Commented', comment.author, comment.timestamp)}>
        <Grid>
          <Row>
            <Col>
              <ButtonToolbar>
                <EditDeleteButtonGroup entityType={EntityType.Comment} bsSize='xsmall' onEditClick={this.onEditClick}/>
              </ButtonToolbar>
            </Col>
          </Row>
          <Row><h5>{comment.body}</h5></Row>
          <VoteScore voteScore={comment.voteScore} onVoteChange={this.onVoteChange}/>
        </Grid>
        {this.state.showEditDialog && <EditComment
          actionType={ActionType.Edit}
          entityType={EntityType.Comment}
          entity={comment}
          onCancel={this.onEditCancel}
          onSubmit={this.onEditSubmit}/>}
      </Panel>



      )
  }
}

export default Comment
