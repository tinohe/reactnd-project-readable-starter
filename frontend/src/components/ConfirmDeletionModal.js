import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import SubmissionAlert from './SubmissionAlert'

const ConfirmDeletionModal = ({ entityType, onCancel, onConfirm, error }) => {

  return (
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Confirm deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>You really want to delete that {entityType.name}?</div>
        {error && <SubmissionAlert error={error} />}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onCancel}> No</Button>
        <Button bsStyle='primary' onClick={onConfirm} type="submit"> Yes</Button>
      </Modal.Footer>
    </Modal.Dialog>
  )
}

export default ConfirmDeletionModal