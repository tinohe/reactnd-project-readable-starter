import React, { Component } from 'react'
import {Button, ButtonGroup, Tooltip, OverlayTrigger, Glyphicon,} from 'react-bootstrap'

import ActionType from '../utils/ActionType'

class EditDeleteButtonGroup extends Component {


  render() {
    const {entityType, bsSize, onEditClick} = this.props

    return (
          <ButtonGroup>
            <OverlayTrigger placement='top' overlay={<Tooltip id={ActionType.Edit.name}>{ActionType.Edit.name} {entityType.name}</Tooltip>}>
              <Button bsSize={bsSize} onClick={onEditClick}>
                <Glyphicon glyph='pencil' />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger placement='top' overlay={<Tooltip id={ActionType.Delete.name}>{ActionType.Delete.name} {entityType.name}</Tooltip>}>
              <Button bsSize={bsSize}>
                <Glyphicon glyph='trash' />
              </Button>
            </OverlayTrigger>
          </ButtonGroup>
      )
  }
}

export default EditDeleteButtonGroup
