import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label, Col, Row } from 'reactstrap';

class RegistrationForm extends Component {
  state = {
    name: '',
    email: '',
    country_id: '',
    state_id: '',
    city_id: '',
    phone_number: '',
    address: null,
    about_me: null
  };

  handleSubmit = event => {
    event.preventDefault();
    const dataToSend = { ...this.state };

    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.props.onUpdate();
      })
      .catch(error => console.log(error))
      .finally(() => {
        console.log('POST request sent');
        this.setState({
          name: '',
          email: '',
          country_id: '',
          state_id: '',
          city_id: '',
          phone_number: '',
          address: null,
          about_me: null
        });
        //reset select fields
        [...document.getElementsByClassName('selectField')].forEach(
          element => (element.selected = true)
        );
      });
  };

  handleChange = (title, event) => {
    this.setState({
      [title]: event.target.value
    });
  };

  render() {
    return (
      <Form className='login-form' onSubmit={this.handleSubmit}>
        <h1>Create new user</h1>
        <hr />

        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for='name'>
                Name <span className='text-danger'>*</span>
              </Label>
              <Input
                required
                pattern='[A-Za-z]+'
                title='Only letters'
                type='text'
                placeholder='Name'
                id='name'
                value={this.state.name}
                onChange={event => this.handleChange('name', event)}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for='email'>
                Email <span className='text-danger'>*</span>
              </Label>
              <Input
                required
                pattern='\w+@[a-z]+\.[a-z]+'
                type='email'
                placeholder='Email'
                id='email'
                value={this.state.email}
                onChange={event => this.handleChange('email', event)}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row form>
          <Col md={12}>
            <FormGroup>
              <Label for='country'>
                Country <span className='text-danger'>*</span>
              </Label>
              <Input
                required
                type='select'
                name='country'
                id='country'
                onChange={event => this.handleChange('country_id', event)}
              >
                <option className='selectField' selected />
                {this.props.countries.map(country => (
                  <option key={country[1]} value={country[1]}>
                    {country[0]}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
        </Row>

        <Row form>
          <Col className={this.state.country_id === '1' ? '' : 'hidden'} md={6}>
            <FormGroup>
              <Label for='state'>
                State <span className='text-danger'>*</span>
              </Label>
              <Input
                required
                type='select'
                name='state'
                id='state'
                onChange={event => this.handleChange('state_id', event)}
              >
                <option className='selectField' />
                {this.props.states.map(state => (
                  <option key={state[1]} value={state[1]}>
                    {state[0]}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col className={this.state.state_id !== '' ? '' : 'hidden'} md={6}>
            <FormGroup>
              <Label for='city'>
                City <span className='text-danger'>*</span>
              </Label>
              <Input
                required
                type='select'
                name='city'
                id='city'
                onChange={event => this.handleChange('city_id', event)}
              >
                <option className='selectField' />
                {this.props.cities
                  .filter(city => {
                    return city[1] === this.state.state_id;
                  })
                  .map(city => (
                    <option key={city[1]} value={city[1]}>
                      {city[0]}
                    </option>
                  ))}
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for='phoneNumber'>
                Phone number <span className='text-danger'>*</span>
              </Label>
              <Input
                required
                pattern='\d{10}'
                title='10 numbers without +38, () and -'
                type='text'
                placeholder='Phone number'
                id='phoneNumber'
                value={this.state.phone_number}
                onChange={event => this.handleChange('phone_number', event)}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for='address'>Address</Label>
              <Input
                type='text'
                placeholder='Address'
                id='address'
                value={this.state.address || ''}
                onChange={event => this.handleChange('address', event)}
              />
            </FormGroup>
          </Col>
        </Row>

        <FormGroup>
          <Label for='about'>About</Label>
          <Input
            type='textarea'
            maxLength='500'
            name='text'
            id='about'
            value={this.state.about_me || ''}
            onChange={event => this.handleChange('about_me', event)}
          />
        </FormGroup>

        <Button color='success' className='btn-lg btn-block'>
          Create
        </Button>
      </Form>
    );
  }
}

export default RegistrationForm;
