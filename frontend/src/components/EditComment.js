import React, { Component } from 'react'
import { FormGroup, ControlLabel, FormControl, Modal, Button} from 'react-bootstrap'


class EditComment extends Component {

  onEditClick = () => {
    this.setState({showDialog: true})
  }

  handleBodyChange = (e) => {
    console.log(e.target.value);
  }

  handleAuthorChange = (e) => {
    console.log(e.target.value);
  }

  render() {
    const {actionName, entityType, entity, onCancel, onSubmit} = this.props
    return (
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>{actionName} {entityType}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup>
              <ControlLabel>Body</ControlLabel>
              <FormControl
                type='text'
                componentClass='textarea'
                defaultValue={entity.body}
                onChange={this.handleBodyChange}
              />
              <ControlLabel>Author</ControlLabel>
              <FormControl
                type='textarea'
                defaultValue={entity.author}
                onChange={this.handleAuthorChange}/>
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={onCancel}>
              Cancel
            </Button>
            <Button
              bsStyle='primary'
              onClick={onSubmit}
            type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      )
  }
}

export default EditComment
