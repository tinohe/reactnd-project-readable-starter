import React, { Component } from 'react'
import { FormGroup, ControlLabel, FormControl, Modal, Button} from 'react-bootstrap'
import EntityType from '../utils/EntityType'

class EditComment extends Component {

  constructor(props) {
      super(props)
      this.state = {
        title: props.entity.title,
        body: props.entity.body,
        category: props.entity.category ? props.entity.category : (props.categories ? props.categories[0].name : null),
        author: props.entity.author,
        id: props.entity.id
      }

      this.handleInputChange = this.handleInputChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log(JSON.stringify(this.state))
    this.props.onSubmit()
  }

  showAdditionaPostInputControls = () => {
    return this.props.entityType === EntityType.Post
  }

  getTitleInput = () => {
    return this.showAdditionaPostInputControls() && (<FormGroup>
      <ControlLabel>Title</ControlLabel>
      <FormControl
        name='title'
        type='text'
        defaultValue={this.state.title}
        onChange={this.handleInputChange}>
      </FormControl>
    </FormGroup>)
  }

  getBodyInput = () => {
    return <FormGroup>
      <ControlLabel>Body</ControlLabel>
      <FormControl
        type='text'
        name='body'
        componentClass='textarea'
        defaultValue={this.state.body}
        onChange={this.handleInputChange}
      />
    </FormGroup>
  }

  getCategoryInput = () => {
    return this.showAdditionaPostInputControls() && (<FormGroup>
      <ControlLabel>Select Category</ControlLabel>
      <FormControl name='category' onChange={this.handleInputChange} componentClass='select' defaultValue={this.state.category}>
        {this.props.categories.map((category) => (<option key={category.name} value={category.name}>{category.name}</option>))}
      </FormControl>
    </FormGroup>)
  }

  getAuthorInput = () => {
  return  <FormGroup>
    <ControlLabel>Author</ControlLabel>
    <FormControl
      type='textarea'
      name='author'
      defaultValue={this.state.author}
      onChange={this.handleInputChange}/>
  </FormGroup>
  }

  render() {
    const {actionType, entityType, onCancel} = this.props
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
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={onCancel}> Cancel</Button>
            <Button bsStyle='primary'onClick={this.handleSubmit} type="submit">Submit</Button>
          </Modal.Footer>
        </Modal.Dialog>
      )
  }
}

export default EditComment
