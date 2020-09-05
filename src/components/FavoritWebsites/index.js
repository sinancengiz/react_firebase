import React from 'react';
import {Row, Col,Table, Form, Button} from 'react-bootstrap';
import { Website } from '../Website';

const INITIAL_STATE = {
  new_website: '',
  onEditBoolen: true,
  error: null,
};

class FavoriteWebsites extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    event.preventDefault()
    const { new_website } = this.state;
    this.props.add_new_website(new_website)
    event.currentTarget.reset()
    this.setState({ new_website:"" });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { new_website} = this.state;
    var websites_list = [];

    for (let i = 0; i < this.props.websites.length; i++){
      websites_list.push(
        <Website user_id={this.props.user_id} website = {this.props.websites[i]} delete_website ={this.props.delete_website} save_new_website ={this.props.save_new_website} />
          )
      }

    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th colSpan="2">Your Favorite Websites </th>
            </tr>
          </thead>
          <tbody>
            {websites_list}
            <tr>
              <Row>
                <Col lg={12}>
                  <Form onSubmit={this.onSubmit}>
                    <Form.Row>
                      <Col xs={9}>
                        <Form.Group as={Col} controlId="formGridPassword1">
                          <Form.Control           
                          name="new_website"
                          value={new_website}
                          onChange={this.onChange}
                          type="website"
                          placeholder="New Website" />
                        </Form.Group>
                      </Col>
                      <Col xs={3}>
                        <Button variant="primary"  type="submit">
                          Add Website
                        </Button>
                      </Col>
                    </Form.Row>
                  </Form>
                </Col>
              </Row>
            </tr>
          </tbody>
      </Table>
    </div>
      );
    }
  }
  
export {FavoriteWebsites};
