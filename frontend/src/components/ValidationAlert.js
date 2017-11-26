import React from 'react'
import {Alert} from 'react-bootstrap'

const ValidationAlert = () => {
    return (
      <Alert bsStyle="danger">
        <h4>Please type at least one character into each text field!</h4>
      </Alert>
    )
}

export default ValidationAlert
