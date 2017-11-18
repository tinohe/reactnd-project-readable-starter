import React, { Component } from 'react'
import {Row, Glyphicon, SplitButton, MenuItem} from 'react-bootstrap'

class VoteScore extends Component {

  render() {
    const {voteScore} = this.props

    return (
          <Row>VoteScore:&nbsp;
            <SplitButton id='voteScore' bsSize='xsmall' title={voteScore}>
              <MenuItem eventKey='increase'><Glyphicon glyph='circle-arrow-up' /> Increase</MenuItem>
              <MenuItem eventKey='decrease'><Glyphicon glyph='circle-arrow-down' /> Decrease</MenuItem>
            </SplitButton>
          </Row>
          )
  }
}

export default VoteScore
