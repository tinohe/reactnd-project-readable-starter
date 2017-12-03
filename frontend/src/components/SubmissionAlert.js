import React from 'react'
import {Alert} from 'react-bootstrap'

const SubmissionAlert = (props) => {
    return (
      <Alert bsStyle="danger">
        <h4>Submission failed!</h4>
        <p>{props.error}</p>
        <p>Please try again later!</p>
      </Alert>
    )
}

export default SubmissionAlert
