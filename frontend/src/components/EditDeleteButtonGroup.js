import React, { Component } from 'react'
import {Button, ButtonGroup, Tooltip, OverlayTrigger, Glyphicon,} from 'react-bootstrap'

class EditDeleteButtonGroup extends Component {


  render() {
    const {entity, bsSize, onEditClick} = this.props

    return (
          <ButtonGroup>
            <OverlayTrigger placement='top' overlay={<Tooltip id='edit'>Edit {entity}</Tooltip>}>
              <Button bsSize={bsSize} onClick={onEditClick}>
                <Glyphicon glyph='pencil' />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger placement='top' overlay={<Tooltip id='delete'>Delete {entity}</Tooltip>}>
              <Button bsSize={bsSize}>
                <Glyphicon glyph='trash' />
              </Button>
            </OverlayTrigger>
          </ButtonGroup>
      )
  }
}

export default EditDeleteButtonGroup
