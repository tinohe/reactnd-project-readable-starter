import React, { Component } from 'react'
import {Panel, Grid, Row, Col, Badge, Button, ButtonGroup, Glyphicon} from 'react-bootstrap'
import * as Formatter from '../utils/Formatter'
import * as API from '../utils/Api'
import Comment from './Comment'

class Post extends Component {

  state = {comments:[]}

  fetchCommentsForPost = (postId) => {
    API.fetchCommentForPost(postId)
    .then((comments) => comments.sort((a,b) =>  b.voteScore - a.voteScore))
    .then((comments) => this.setState({comments: comments}))
  }

  componentDidMount = () => {
    this.fetchCommentsForPost(this.props.post.id)
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props !== nextProps) {
      this.fetchCommentsForPost(nextProps.post.id)
    }
  }

  render() {
    const {post} = this.props

    return (
      <Panel header={Formatter.formatAuthorAndTimestamp('Posted', post.author, post.timestamp)}>
        <Grid>
          <Row>
            <Col>
              <ButtonGroup>
                <Button><Glyphicon glyph='pencil' /></Button>
                <Button><Glyphicon glyph='trash' /></Button>
              </ButtonGroup>
            </Col>
            <Col><h3>{post.title}</h3></Col>
          </Row>
          <Row><h4>{post.body}</h4></Row>
          <Row>Votescore: <Badge>{post.voteScore}</Badge></Row>
        </Grid>
        <div className='comments'>
          {this.state.comments.map((comment) => <Comment key={comment.id} comment={comment}/>)}
        </div>
      </Panel>
      )
  }
}

export default Post
