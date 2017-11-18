import React, { Component } from 'react'
import {Panel, Grid, Row, Col, Badge, Button, ButtonGroup, Glyphicon} from 'react-bootstrap'
import * as Formatter from '../utils/Formatter'

class Comment extends Component {

  render() {
    const {comment} = this.props
    return (
      <Panel header={Formatter.formatAuthorAndTimestamp('Commented', comment.author, comment.timestamp)}>
        <Grid>
          <Row>
            <Col>
              <ButtonGroup bsSize='xsmall'>
                <Button><Glyphicon glyph='pencil' /></Button>
                <Button><Glyphicon glyph='trash' /></Button>
              </ButtonGroup>
            </Col>
          </Row>
          <Row><h5>{comment.body}</h5></Row>
          <Row>Votescore: <Badge>{comment.voteScore}</Badge></Row>
        </Grid>
      </Panel>
      )
  }
}

export default Comment
