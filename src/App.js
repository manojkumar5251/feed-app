import React from "react"
import Header from "./components/Header"
import { Modal, Form, Button, Container, Card } from "react-bootstrap"
import { withFirebase } from "./components/Firebase/context"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showCreateFeed: false,
      file: "",
      feed: "",
      author: "",
      isPosting: false,
      feedsList: []
    }
  }

  componentDidMount() {
    this.props.firebase.db
      .ref("feeds/")
      .on(
        "value",
        res =>
          res.val() &&
          this.setState({ feedsList: Object.values(res.val()).reverse() })
      )
  }

  createFeed = async e => {
    e.preventDefault()
    if (
      (this.state.feed === "" && this.state.file === "") ||
      this.state.author === ""
    ) {
      return
    }
    this.setState({ isPosting: true })
    let file = {}
    if (this.state.file !== "") {
      file = await this.props.firebase.uploadFile(this.state.file)
    }
    this.props.firebase
      .pushToDB("feeds/", {
        file,
        author: this.state.author,
        feed: this.state.feed
      })
      .then(() =>
        this.setState({
          showCreateFeed: false,
          file: "",
          feed: "",
          author: "",
          isPosting: false
        })
      )
  }

  render() {
    return (
      <React.Fragment>
        <Header createFeed={() => this.setState({ showCreateFeed: true })} />

        <Modal
          show={this.state.showCreateFeed}
          onHide={() => this.setState({ showCreateFeed: false })}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Feed</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.createFeed}>
              <Form.Control
                value={this.state.author}
                onChange={e => this.setState({ author: e.target.value })}
                placeholder="Author Name"
              />

              <Form.Control
                value={this.state.feed}
                onChange={e => this.setState({ feed: e.target.value })}
                as="textarea"
                className="mt-3"
                placeholder="Write something here"
              />

              <Form.File
                custom
                className="mt-3"
                label={
                  this.state.file?.name
                    ? this.state.file.name.slice(0, 40) +
                      (this.state.file.name.slice(40) ? "..." : "")
                    : "Choose File"
                }
                onChange={e =>
                  this.setState({
                    file: e.target.files[0],
                    uploaded: false,
                    progress: 0
                  })
                }
              />

              <Button
                type="submit"
                className="w-100 mt-3"
                disabled={this.state.isPosting}
              >
                {this.state.isPosting ? "Posting" : "Post"}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        <Container
          style={{ width: "40%" }}
          className="container d-flex flex-column mt-5 p-3 rounded"
        >
          {this.state.feedsList.map((feed, i) => {
            return (
              <Card key={i} className="mt-3">
                <Card.Body>
                  <Card.Title>{feed.author}</Card.Title>
                  {feed?.feed && (
                    <Card.Subtitle className="mb-2 text-muted">
                      {feed.feed}
                    </Card.Subtitle>
                  )}
                </Card.Body>
                {feed?.file && feed?.file.type === "image" && (
                  <Card.Img variant="top" src={feed.file.url} />
                )}
                {feed?.file && feed.file.type === "video" && (
                  <video controls className="card-img-top">
                    <source src={feed.file.url} />
                    Your browser does not support HTML video.
                  </video>
                )}
              </Card>
            )
          })}
        </Container>
      </React.Fragment>
    )
  }
}

export default withFirebase(App)
