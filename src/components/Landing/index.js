import React from 'react';
import { Container, Row, Col,Jumbotron } from 'react-bootstrap';
import sun_image from '../../images/clouds_sun.png'
import weather_image from '../../images/weather_types.png'


const landingStyle = {
  backgroundColor: "lightblue",
  padding:50,
  width: "100%",
};

const leftBoxStyle = {
  
  backgroundImage: `url(${sun_image})`,
  marginTop: "50px",
  color:"purple",
  height:"400px"
};

const rightBoxStyle = {
  backgroundImage: `url(${weather_image})`,
  marginTop: "50px",
  color:"purple",
  height:"400px"
};

const Landing = () => (

<Container style={landingStyle}>
  <Row>
    <Col>
    <Jumbotron className="landing_jumbotron" >
      <h1>React Weather Dashboard!</h1>
      <p>
        View complete climate conditions with our weather dashboard, built for localized data monitoring, analyzed by city or even specific sub-regions. Comply to global norms with our Celsius/Fahrenheit toggle and keep an eye on acceptable thresholds, ensuring air quality remains in-line. Embed the dashboard inside more overarching apps like day planners, driver assistance, and navigation tools to keep users informed.
      </p>
      
    </Jumbotron>
    </Col>
  </Row>
  <Row>
    <Col md={12} lg={6}>
    <Jumbotron style={leftBoxStyle}>
      <p>
       Find current weather information in your city 
      </p>
      </Jumbotron>
    </Col>
    <Col md={12} lg={6}>
    <Jumbotron style={rightBoxStyle}>
      <p>
        You can add and manage your favarite websites in this application  
      </p>
      </Jumbotron>
    </Col>
  </Row>
</Container>
);
 
export default Landing;