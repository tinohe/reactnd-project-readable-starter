import React, { Component } from 'react'
import { FormGroup, ControlLabel, FormControl, Modal, Button} from 'react-bootstrap'
import EntityType from '../utils/EntityType'

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

  handleTitleChange = (e) => {
    console.log(e.target.value);
  }

  showAdditionalInputs = () => {
    return this.props.entityType === EntityType.Post
  }

  getAdditionalInputs = () => {
    return (
      <FormGroup>
        <ControlLabel>Title</ControlLabel>
        <FormControl
          type='text'
          defaultValue={this.props.entity.title}
          onChange={this.props.handleTitleChange}>
        </FormControl>
        <ControlLabel>Select Category</ControlLabel>
        <FormControl componentClass='select' placeholder='Select Category' defaultValue={this.props.entity.category}>
          {this.props.categories.map((category) => (<option key={category.path} value={category.name}>{category.name}</option>))}
        </FormControl>
      </FormGroup>
    )
  }

  render() {
    const {actionType, entityType, entity, onCancel, onSubmit} = this.props
    return (
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>{actionType.name} {entityType.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.showAdditionalInputs() && this.getAdditionalInputs() }
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
