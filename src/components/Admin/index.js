import React from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';
import { Table } from 'react-bootstrap';
 
class AdminPage extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      loading: false,
      users: [],
    };
  }
 
  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();
 
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));
      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }
 
  render() {
    const { users, loading } = this.state;

    return (
      <div className="tables">
        <h1>Admin</h1>
        {loading && <div>Loading ...</div>}
 
        <UserList users={users} />
      </div>
    );
  }
}

const UserList = ({ users }) => (
  <div >
  <p>
    The Admin Page is accessible by every signed in admin user.
  </p>
  <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>Username</th>
          <th>Zipcode</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
      {users.map(user => (
      <tr key={user.uid}>
          <td>{user.uid}</td>
          <td>{user.email}</td>
          <td>{user.username}</td>
          <td>{user.zipcode}</td>
          <td>{!!user.roles && (user.roles.ADMIN)}</td>
          
      </tr>
    ))}
      </tbody>
    </Table>
  </div>
);
 
const condition = authUser =>
  authUser && !!authUser.roles[ROLES.ADMIN];
 
export default compose(
  withAuthorization(condition),
  withFirebase,
)(AdminPage);

