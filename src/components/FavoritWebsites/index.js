import React from 'react';

import {  Row, Col,Table, Form, Button,Nav} from 'react-bootstrap';

const INITIAL_STATE = {
  new_website: '',
  onEditBoolen: false,
  error: null,
};

class FavoriteWebsites extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };
  }

  user_input = React.createRef();


  onSubmit = event => {
    event.preventDefault()
    const { new_website } = this.state;
    this.props.add_new_website(new_website)
    event.currentTarget.reset()
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };


     render() {
      const { new_website} = this.state;

      var websites_list = [];

      for (let i = 0; i < this.props.websites.length; i++){

          websites_list.push(<tr >
            <Row>
              <Col lg={8}>
              <td> <Nav.Link href={"http://" +this.props.websites[i]} target="_blank">{this.props.websites[i]}</Nav.Link>
              </td>
              </Col>
            <Col lg={1}>
              <Button variant="success"  onClick ={() => this.props.edit_website(this.props.websites[i])} >
                Edit
              </Button>
            </Col>
            <Col lg={2}>
              <Button variant="danger" onClick ={() => this.props.delete_website(this.props.websites[i])}>
                Delete
              </Button>
            </Col>
            </Row>


          
          </tr>

          )
          }

      return (
        <div>
        <Table striped bordered hover>
        <thead>
          <tr>
            <th colSpan="2">Favorite Websites </th>

          </tr>
            
        </thead>
        <tbody>
          {websites_list}
          
        </tbody>

      </Table>

      <Form onSubmit={this.onSubmit}>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridPassword1">
          <Form.Control           
          name="new_website"
          value={new_website}
          onChange={this.onChange}
          type="website"
          placeholder="New Website" />

        </Form.Group>
        <Button variant="primary"  type="submit">
          Add Website
        </Button>
      </Form.Row>

    </Form>
      </div>
      );
    }
  }

  
export { FavoriteWebsites};
