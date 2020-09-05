import React from 'react';
import {Row, Col, Container} from 'react-bootstrap';
// import Plot from "react-plotly.js";
import Plotly from "plotly.js";

import createPlotlyComponent from "react-plotly.js/factory";
const Plot = createPlotlyComponent(Plotly);

class Chart extends React.Component {
  render() {
    
    return (
      <Container>
      <Row>
        <Col className="charts" lg={6}>
            <Plot 
          data = {[
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: this.props.avarage_temp,
              title: { text: "Tempreture in "+this.props.current_city},
              type: "indicator",
              mode: "gauge+number",
              delta: { reference: 400 },
              gauge: { axis: { range: [null, 150] } },

            }
          ]}
          
          layout = {{ width: 400, height: 300 }}

        />
        </Col>
      <Col className="charts" lg={6}>
      <Plot 
          data = {[
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: this.props.humidity,
              title: { text: "Humidity in "+this.props.current_city },
              type: "indicator",
              mode: "gauge+number",
              delta: { reference: 200 },
              gauge: { axis: { range: [null, 100] } }
            }
          ]}
          
          layout = {{ width: 400, height: 300 }}
        />
      </Col>
 

    </Row>
    <Row>
        <Col className="charts" lg={6}>
            <Plot 
          data = {[
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: this.props.wind_speed,
              title: { text: "Wind Speed in "+this.props.current_city},
              type: "indicator",
              mode: "gauge+number",
              delta: { reference: 400 },
              gauge: { axis: { range: [null, 25] } }
            }
          ]}
          
          layout = {{ width: 400, height: 300 }}
        />
        </Col>
      <Col className="charts" lg={6}>
      <Plot 
          data = {[
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: this.props.pressure,
              title: { text: "Pressure in "+this.props.current_city },
              type: "indicator",
              mode: "gauge+number",
              delta: { reference: 200 },
              gauge: { axis: { range: [800, 1200] } }
            }
          ]}
          
          layout = {{ width: 400, height: 300 }}
        />
      </Col>
 

    </Row>
    </Container>
      );
    }
  }
  
export {Chart};
