import React, { Component } from 'react'
import { FormGroup, ControlLabel, FormControl, Modal, Button } from 'react-bootstrap'
import EntityType from '../utils/EntityType'
import ActionType from '../utils/ActionType'
import ValidationAlert from './ValidationAlert'
import SubmissionAlert from './SubmissionAlert'

import { connect } from 'react-redux'

const SUCCESS_STATE = 'success'
const ERROR_STATE = 'error'

class EditCreateModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showValidationAlert: false,
      entityData: {
        parentId: props.entity.parentId,
        id: props.entity.id,
        title: props.entity.title,
        body: props.entity.body,
        category: props.entity.category ? props.entity.category : (props.categories.length > 0 ? props.categories[0].name : null),
        author: props.entity.author
      }
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(event) {
    const name = event.target.name
    const value = event.target.value
    const isValid = this.areAllInputsValid(Object.assign({}, this.state.entityData, { [name]: value }))

    this.setState((prevState) => {
      return {
        showValidationAlert: prevState.showValidationAlert ? !isValid : false,
        entityData: {
          ...prevState.entityData,
          [name]: value
        }
      }
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.areAllInputsValid(this.state.entityData)) {
      this.props.onSubmit(this.state.entityData)
    } else {
      this.setState({ showValidationAlert: true })
    }
  }

  showAdditionaPostInputControls = () => {
    return this.props.entityType === EntityType.Post
  }

  isInputValid(value) {
    const length = value ? value.trim().length : 0
    return length > 0 ? SUCCESS_STATE : ERROR_STATE
  }

  areAllInputsValid = (inputs) => {
    return inputs ? (
      (!this.showAdditionaPostInputControls() || this.isInputValid(inputs.title) === SUCCESS_STATE)
      && this.isInputValid(inputs.body) === SUCCESS_STATE
      && this.isInputValid(inputs.author) === SUCCESS_STATE) : false
  }

  getTitleInput = () => {
    return this.showAdditionaPostInputControls() && (<FormGroup validationState={this.isInputValid(this.state.entityData.title)}>
      <ControlLabel>Title</ControlLabel>
      <FormControl
        name='title'
        type='text'
        defaultValue={this.state.entityData.title}
        onChange={this.handleInputChange}>
      </FormControl>
    </FormGroup>)
  }

  getBodyInput = () => {
    return <FormGroup validationState={this.isInputValid(this.state.entityData.body)}>
      <ControlLabel>Body</ControlLabel>
      <FormControl
        type='text'
        name='body'
        componentClass='textarea'
        defaultValue={this.state.entityData.body}
        onChange={this.handleInputChange}
      />
    </FormGroup>
  }

  getCategoryInput = () => {
    const disableState = this.props.actionType === ActionType.Edit
    return this.showAdditionaPostInputControls() && (<FormGroup>
      <ControlLabel>Select Category</ControlLabel>
      <FormControl disabled={disableState} name='category' onChange={this.handleInputChange} componentClass='select' defaultValue={this.state.entityData.category}>
        {this.props.categories.map((category) => (<option key={category.name} value={category.name}>{category.name}</option>))}
      </FormControl>
    </FormGroup>)
  }

  getAuthorInput = () => {
    const disableState = this.props.actionType === ActionType.Edit
    return <FormGroup validationState={this.isInputValid(this.state.entityData.author)}>
      <ControlLabel>Author</ControlLabel>
      <FormControl
        disabled={disableState}
        type='textarea'
        name='author'
        defaultValue={this.state.entityData.author}
        onChange={this.handleInputChange} />
    </FormGroup>
  }

  render() {
    const { actionType, entityType, onCancel, uiDialogState } = this.props
    return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>{actionType.name} {entityType.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.getTitleInput()}
          {this.getBodyInput()}
          {this.getCategoryInput()}
          {this.getAuthorInput()}
          {this.state.showValidationAlert && <ValidationAlert />}
          {uiDialogState.error && <SubmissionAlert error={uiDialogState.error} />}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onCancel}> Cancel</Button>
          <Button bsStyle='primary' onClick={this.handleSubmit} type="submit">Submit</Button>
        </Modal.Footer>
      </Modal.Dialog>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    uiDialogState: state.uiDialogState
  }
}

export default connect(mapStateToProps)(EditCreateModal)