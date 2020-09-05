import React from 'react';
import {Row, Col, Button, Nav} from 'react-bootstrap';


class Website extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing :false,
      new_website:"",
    };
  }

  edit_state = () => {
    // this is a function turns website editing true
    this.setState({
      isEditing: true,
      
    });
  }

  save_state = () => {
      //turns editing false and calls save_new_website function
      this.props.save_new_website(this.props.website , this.state.new_website)
      this.setState({
        isEditing: false,
      });
    }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };


  render() {
      const { new_website} = this.state;
      let show_website;
      if (!this.state.isEditing) {
        show_website = 
         <Row>
          <Col xs={7} md={8}>
            <Nav.Link href={"http://" +this.props.website} target="_blank">{this.props.website}</Nav.Link>
          </Col>
          <Col xs={1.5}>
            <Button variant="success"  onClick ={() => this.edit_state()} >
              Edit
            </Button>
          </Col>
          <Col xs={2}>
            <Button variant="danger" onClick ={() => this.props.delete_website(this.props.website)}>
              Delete
            </Button>
          </Col>
          
          </Row>;
      } else {
        show_website = 
          <Row>
          <Col xs={8}>
            <input type="text" id="new_website" name="new_website" onChange={this.onChange} value={new_website} placeholder="Edit Website"></input>
          </Col>
          <Col  xs={1.5}>
            <Button variant="primary"  onClick ={() => this.save_state()} >
              Save
            </Button>
          </Col>
          </Row>;
      }

    return (
          <tr>
            {show_website}
          </tr>
      );
    }
  }
  
export {Website};
