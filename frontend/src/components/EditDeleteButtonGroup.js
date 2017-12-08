import React from 'react'
import { Button, ButtonGroup, Tooltip, OverlayTrigger, Glyphicon, } from 'react-bootstrap'

import ActionType from '../utils/ActionType'

const EditDeleteButtonGroup = ({entityType, bsSize, onEditClick, onDeleteClick}) => {

  return (
    <ButtonGroup>
      <OverlayTrigger placement='top' overlay={<Tooltip id={ActionType.Edit.name}>{ActionType.Edit.name} {entityType.name}</Tooltip>}>
        <Button bsSize={bsSize} onClick={onEditClick}>
          <Glyphicon glyph='pencil' />
        </Button>
      </OverlayTrigger>
      <OverlayTrigger placement='top' overlay={<Tooltip id={ActionType.Delete.name}>{ActionType.Delete.name} {entityType.name}</Tooltip>}>
        <Button bsSize={bsSize} onClick={onDeleteClick}>
          <Glyphicon glyph='trash' />
        </Button>
      </OverlayTrigger>
    </ButtonGroup>
  )
}

export default EditDeleteButtonGroup
