import React, { Component } from 'react'
import {Panel, Grid, Row, Col, ButtonToolbar} from 'react-bootstrap'
import * as Formatter from '../utils/Formatter'
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

  render() {
    const {comment} = this.props
    return (
      <Panel header={Formatter.formatAuthorAndTimestamp('Commented', comment.author, comment.timestamp)}>
        <Grid>
          <Row>
            <Col>
              <ButtonToolbar>
                <EditDeleteButtonGroup entity='Comment' bsSize='xsmall' onEditClick={this.onEditClick}/>
              </ButtonToolbar>
            </Col>
          </Row>
          <Row><h5>{comment.body}</h5></Row>
          <VoteScore voteScore={comment.voteScore}/>
        </Grid>
        {this.state.showEditDialog && <EditComment
          actionName='Edit'
          entityType='Comment'
          entity={comment}
          onCancel={this.onEditCancel}
          onSubmit={this.onEditSubmit}/>}
      </Panel>



      )
  }
}

export default Comment
