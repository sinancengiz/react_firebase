import React from 'react';
 
import { withAuthorization } from '../Session';
import { Container, Row, Col,Table,Jumbotron} from 'react-bootstrap';
import { FavoriteWebsites } from '../FavoritWebsites';
 
class HomePage extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      loading: false,
      user_id:"",
      username: '',
      zipcode:"",
      current_city:"",
      description: "",
      humidity:"",
      temp:"",
      temp_min:"",
      temp_max:"",
      pressure:"",
      wind_speed:"",
      websites:[],
    };
  }
 
  componentDidMount() {
    this.setState({ loading: true });
    let user_id = this.props.authUser.uid

    this.props.firebase.user(this.props.authUser.uid).once('value').then((snapshot) => {
      let name = (snapshot.val() && snapshot.val().username) || 'Anonymous';
      let code = (snapshot.val() && snapshot.val().zipcode) || 'No Zipcode';
      let websites = (snapshot.val() && snapshot.val().favoriteWebsites) || [];
      console.log(websites)

      fetch("https://api.openweathermap.org/data/2.5/weather?zip="+code+",us&appid=a1fa6d245b03b290a8f678bb5b15a5bd")
      .then(response => response.json())
      .then(data => 
        this.setState({ 
          current_city: data.name,
          description: data.weather[0].description,
          humidity:data.main.humidity,
          temp:data.main.temp,
          temp_min:data.main.temp_min,
          temp_max:data.main.temp_max,
          pressure:data.main.pressure,
          wind_speed:data.wind.speed,
          websites: websites,
        }))

      this.setState({
        user_id:user_id,
        username: name,
        loading: false,
        zipcode: code,
      });

    });

  }

  componentWillUnmount() {
    this.props.firebase.user().off();
  }

  delete_website = (website) => {
    // the function deletes a website
    this.setState({
      websites: [...this.state.websites].filter(site => site !== website),
      
    });

    this.props.firebase.user(this.props.authUser.uid).update({
      favoriteWebsites : [...this.state.websites].filter(site => site !== website)
    }, function(error) {
      if (error) {
        // The write failed...
      } else {
        // Data saved successfully!
      }
    });
  }

  edit_website = (website) => {
    // this is a function to edit a selecte website
      let new_website = prompt("enter new website:")
      let index_of_edit_website = this.state.websites.indexOf(website)
      let website_list = this.state.websites
      website_list[index_of_edit_website] = new_website
      this.setState({
        websites: [...website_list],
        
      });

      this.props.firebase.user(this.props.authUser.uid).update({
        favoriteWebsites : [...this.state.websites]
      }, function(error) {
        if (error) {
          // The write failed...
        } else {
          // Data saved successfully!
        }
      });
  }

  add_new_website = (new_website) => {
    //this function add new website to database and state
    if(this.state.websites.includes(new_website)){
      alert("this website already exist in your favorites")
    }else{
        this.setState({
          websites: [...this.state.websites, new_website],
          
        });

        this.props.firebase.user(this.props.authUser.uid).update({

          favoriteWebsites : [...this.state.websites, new_website]
        }, function(error) {
          if (error) {
            // The write failed...
          } else {
            // Data saved successfully!
          }
        });
      }
            
      }



  render() {
    const { user_id, username, zipcode, loading ,current_city, description,humidity,temp,temp_min,temp_max, pressure, wind_speed} = this.state;
 
    return (
      
      <div>
        {loading && <div>Loading ...</div>}
        <User user_id= {user_id} username={username} zipcode={zipcode} current_city={current_city} description= {description} 
        add_new_website = {this.add_new_website} delete_website = {this.delete_website}  edit_website = {this.edit_website}
        humidity={humidity} temp={temp} temp_min={temp_min} temp_max={temp_max} pressure={pressure} wind_speed={wind_speed} websites={this.state.websites} />
      </div>
      
    );
  }
}

const User = ({user_id, username, zipcode,current_city,description,humidity,temp,temp_min,temp_max, pressure, wind_speed, websites , add_new_website, delete_website , edit_website}) => (
      <Container>
        <Row>
        <Col>
        <Jumbotron>
          <h1>Welcome to Your Home Page</h1>
          <p>
          {username}, This is your home page, below you can see current weather data in the eather data table and see your favorite websites 
          </p>
        </Jumbotron>
        </Col>
        </Row>
        <Row>
         <Col>
          <FavoriteWebsites user_id={user_id} websites = {websites} add_new_website ={add_new_website} delete_website ={delete_website} edit_website ={edit_website}/>
        </Col>
        <Col>
        <Table striped bordered hover>
            <thead>
              <tr>
                <th colSpan="2">Current Weather Data</th>
              </tr>
                
            </thead>
            <tbody>
              <tr>
                <td>Weather description</td>
                <td>{description}</td>
              </tr>
              <tr>
                <td>Wind Speed</td>
                <td>{wind_speed} meter/sec</td>
              </tr>
              <tr>
                <td>Humidity </td>
                <td>%{humidity}</td>
              </tr>
              <tr>
                <td>Avarage Temperature</td>
                <td>{temp} Kelvin</td>
              </tr>
              <tr>
                <td>Min Temp  </td>
                <td>{temp_min} Kelvin</td>
              </tr>
              <tr>
                <td>Max Temp</td>
                <td>{temp_max} Kelvin</td>
              </tr>
              <tr>
                <td>Pressure </td>
                <td>{pressure} hPa</td>
              </tr>
            </tbody>
            <caption>Weather Data for {current_city}, Your Zipcode: {zipcode}</caption>
          </Table>
          </Col>
        </Row>
      </Container>
      
);

 
const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(HomePage);