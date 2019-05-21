import React, { Component } from 'react';
import { Col, ListGroup, ListGroupItem } from 'reactstrap';

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
    return null;
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
        <h1>Users:</h1>
        <Col xs={{ size: 10, offset: 1 }} sm='10' md={{ size: 6, offset: 3 }}>
          {users.map(user => (
            <ListGroup key={user.id}>
              <ListGroupItem color='success'>
                <b>Name:</b> {user.name}, <b>Email:</b> {user.email},{' '}
                <b>Phone:</b> {user.phone_number}, <b>Location:</b>{' '}
                {this.convertNumberToLocation('country_id', +user.country_id)},{' '}
                {this.convertNumberToLocation('state_id', user.state_id)},{' '}
                {this.convertNumberToLocation('city_id', user.city_id)},{' '}
                <b>Created at:</b> {new Date(user.createdAt).toLocaleString()}
              </ListGroupItem>
            </ListGroup>
          ))}
        </Col>
      </>
    );
  }
}

export default Users;
