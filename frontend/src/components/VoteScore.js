import React from 'react'
import { Row, Glyphicon, SplitButton, MenuItem } from 'react-bootstrap'

export const KEY_INC = 'upVote'
export const KEY_DEC = 'downVote'

export const VoteScore = ({ voteScore, onVoteChange }) => {
  return (
    <Row>VoteScore:&nbsp;
            <SplitButton id='voteScore' bsSize='xsmall' title={voteScore} onSelect={onVoteChange}>
        <MenuItem eventKey={KEY_INC}><Glyphicon glyph='circle-arrow-up' /> Increase</MenuItem>
        <MenuItem eventKey={KEY_DEC}><Glyphicon glyph='circle-arrow-down' /> Decrease</MenuItem>
      </SplitButton>
    </Row>
  )
}

export default VoteScore
