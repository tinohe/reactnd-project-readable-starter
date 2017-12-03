import React from 'react'
import {Alert} from 'react-bootstrap'

const ValidationAlert = () => {
    return (
      <Alert bsStyle="danger">
        <h4>Validation failed!</h4>
        <p>Please type at least one character into each text field!</p>
      </Alert>
    )
}

export default ValidationAlert
