import React, { Component } from 'react';
import './App.css';
import RegistrationForm from './components/RegistrationForm';
import Users from './components/Users';

class App extends Component {
  state = {
    users: [],
    countries: [],
    cities: [],
    states: []
  };

  getLocation(type) {
    fetch(`http://localhost:3000/${type}`)
      .then(response => response.json())
      .then(data =>
        data.map(data => {
          this.setState(prevState => ({
            [type]: [
              ...prevState[type],
              [
                data.name,
                data.state_id
                  ? data.state_id
                  : data.id
                  ? data.id
                  : data.country_id
              ]
            ]
          }));
        })
      )
      .catch(error => console.log(error))
      .finally(() => console.log('Request sent ', type));
  }

  componentDidMount() {
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(users => {
        this.setState({ users });
      })
      .catch(error => console.log(error))
      .finally(() => console.log('Request sent ', 'users'));

    this.getLocation('countries');
    this.getLocation('states');
    this.getLocation('cities');
  }

  getUsersAfterUpdate = () => {
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(users => {
        this.setState({ users });
      })
      .catch(error => console.log(error))
      .finally(() => console.log('Request sent', 'updating users'));
  };

  render() {
    return (
      <div className='App'>
        <RegistrationForm
          countries={this.state.countries}
          states={this.state.states}
          cities={this.state.cities}
          onUpdate={this.getUsersAfterUpdate}
        />
        <Users
          users={this.state.users}
          countries={this.state.countries}
          states={this.state.states}
          cities={this.state.cities}
        />
      </div>
    );
  }
}

export default App;
