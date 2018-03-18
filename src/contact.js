import React, { Component } from 'react';
import './contact.css';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nameValidationMessage: '',
      email: '',
      emailValidationMessage: '',
      content: '',
      contentValidationMessage: '',
      showInvalidMessage: false,
      showReceived: false
    };
  }

  update(field) {
    return (e) => {
      this.setState({
        [field]: e.target.value
      }, () => {
        this.validate(field);
      });
    };
  }

  validate(field) {
    let message = '';

    if (field === 'name') {
      if (this.state.name === '') {
        message = 'We need your name.';
      }
    } else if (field === 'email') {
      if (this.state.email === '') {
        message = 'We need your email address.';
      } else if (this.isValidEmail(this.state.email) === false) {
        message = 'Please use a valid email address.';
      }
    }

    this.setState({
      [field + 'ValidationMessage']: message
    });

    return message === '';
  }

  isValidEmail(email) {
    // https://stackoverflow.com/a/46181
    // eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  send(e) {
    e.preventDefault();

    this.setState({
      showInvalidMessage: false
    });

    const validName = this.validate('name');
    const validEmail = this.validate('email');
    const validContent = this.validate('content');

    if (validName && validEmail && validContent) {
      this.setState({
        showReceived: true
      });
    } else {
      this.setState({
        showInvalidMessage: true
      });
    }
  }

  render() {
    return (
      <div id="contact">
        <h2>We would love to hear from you</h2>
        {this.state.showReceived ?
          (<span>
            Thank you, we have received your message.
           </span>
          ) :
          (<form onSubmit={this.send.bind(this)}>
            {this.state.showInvalidMessage &&
              <span>Please complete the form and try again.</span>
            }
            <br />
            <input type="text" placeholder="name" onChange={this.update('name').bind(this)} />
            <span>{this.state.nameValidationMessage}</span>
            <br />
            <input type="text" placeholder="email" onBlur={this.update('email').bind(this)} />
            <span>{this.state.emailValidationMessage}</span>
            <br />
            <textarea onChange={this.update('content').bind(this)}></textarea>
            <br />
            <input type="submit" value="Send" />
          </form>
          )
        }
      </div>
    );
  }
}

export default Contact;
