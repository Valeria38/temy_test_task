import React, { Component } from 'react';
import {
  ListGroup,
  ListGroupItem,
  Col,
  ListGroupItemHeading,
  ListGroupItemText
} from 'reactstrap';

class Users extends Component {
  state = {
    isLoaded: false
  };

  static getDerivedStateFromProps(nextProps) {
    if (
      nextProps.countries.length > 0 &&
      nextProps.states.length > 23 &&
      nextProps.cities.length > 23
    ) {
      return {
        isLoaded: true
      };
    }
  }

  convertNumberToLocation = (type, id) => {
    const { countries, states, cities } = this.props;
    const { isLoaded } = this.state;

    if (isLoaded) {
      switch (type) {
        case 'country_id':
          return countries.find(country => country[1] === id)[0];
        case 'state_id':
          return states.find(state => state[1] === id)[0];
        case 'city_id':
          return cities.find(city => city[1] === id)[0];
      }
    }
  };

  render() {
    const { users } = this.props;

    return (
      <>
        <p>Users:</p>
        <Col xs='12' md={{ size: 8, offset: 2 }}>
          <ListGroup>
            {users.map(user => (
              <ListGroupItem color='success' key={user.id}>
                <ListGroupItemHeading>{user.name}</ListGroupItemHeading>
                <ListGroupItemText>{user.email}</ListGroupItemText>
                <ListGroupItemText>{user.phone_number}</ListGroupItemText>
                <ListGroupItemText>
                  {this.convertNumberToLocation('country_id', +user.country_id)}
                </ListGroupItemText>
                <ListGroupItemText>
                  {this.convertNumberToLocation('state_id', user.state_id)}
                </ListGroupItemText>
                <ListGroupItemText>
                  {this.convertNumberToLocation('city_id', user.city_id)}
                </ListGroupItemText>
                <ListGroupItemText>
                  {new Date(user.createdAt).toLocaleString()}
                </ListGroupItemText>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
      </>
    );
  }
}

export default Users;
