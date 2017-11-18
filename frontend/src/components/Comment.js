import React, { Component } from 'react'
import {Panel, Grid, Row, Col, ButtonToolbar} from 'react-bootstrap'
import * as Formatter from '../utils/Formatter'
import VoteScore from './VoteScore'

import EditDeleteButtonGroup from './EditDeleteButtonGroup'

class Comment extends Component {

  render() {
    const {comment} = this.props
    return (
      <Panel header={Formatter.formatAuthorAndTimestamp('Commented', comment.author, comment.timestamp)}>
        <Grid>
          <Row>
            <Col>
              <ButtonToolbar>
                <EditDeleteButtonGroup entity='Comment' bsSize='xsmall'/>
              </ButtonToolbar>
              </Col>
          </Row>
          <Row><h5>{comment.body}</h5></Row>
          <VoteScore voteScore={comment.voteScore}/>
        </Grid>
      </Panel>
      )
  }
}

export default Comment
