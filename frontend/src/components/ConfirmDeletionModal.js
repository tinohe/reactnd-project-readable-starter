import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const ConfirmDeletionModal = ({ entityType, onCancel, onConfirm }) => {

  return (
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Confirm deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>You really want to delete that {entityType.name}?</div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onCancel}> No</Button>
        <Button bsStyle='primary' onClick={onConfirm} type="submit"> Yes</Button>
      </Modal.Footer>
    </Modal.Dialog>
  )
}

export default ConfirmDeletionModal