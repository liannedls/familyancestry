import React, { Component } from 'react';

class Contact extends Component {

  constructor(props) {
    super(props);
    this.state = {
      status: '',
      isSending: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const form = event.target;
    const formValues = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
      website: form.website.value
    };

    event.preventDefault();
    this.setState({ isSending: true, status: '' });

    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formValues)
    })
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Message failed');
        }
        return response.json();
      })
      .then(function() {
        form.reset();
        this.setState({
          isSending: false,
          status: 'Your message was sent. I will be in touch shortly!'
        });
      }.bind(this))
      .catch(function() {
        this.setState({
          isSending: false,
          status: 'There seems to be a problem with my mail server, your message was not sent.'
        });
      }.bind(this));
  }

  render() {
    const { isSending, status } = this.state;

    return (
        <div>
          <div id="contact">
          <div className="container">
            <div className="col-md-8">
              <div className="row" >
                <div className="section-title">
                  <h2>Get In Touch</h2>
                  <p>Do you know something about the De La Salle family that we missed? Send us a message!</p>
                </div>
                <form id = "myform" className="contact-form"  onSubmit={this.handleSubmit}>
                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <div className="form-group">
                        <input type="text" id="name" name="name" className="form-control" placeholder="Name" required/>
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                    <div className="form-group col-md-6">
                      <div className="form-group">
                        <input type="email" id="email" name="email" className="form-control" placeholder="Email" required />
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                  </div>
                    <input
                      type="text"
                      name="website"
                      tabIndex="-1"
                      autoComplete="off"
                      aria-hidden="true"
                      style={{ position: 'absolute', left: '-10000px' }}
                    />
                    <textarea name="message" id="message" className="form-control" rows="4" placeholder="Message" required></textarea>
                    <p className="help-block text-danger"></p>
                 <button type="submit" value="Send" className="btn btn-custom btn-lg" disabled={isSending}>
                   {isSending ? 'Sending...' : 'Send Message'}
                 </button>
                 {status && <p className="help-block">{status}</p>}
                </form>
              </div>
            </div>
            <div className="col-md-3 col-md-offset-1 contact-info">
              <div className="contact-item">
                <h3>Contact Info</h3>
                <p><span><i className="fa fa-map-marker"></i> Address</span>Ottawa Ontario Canada</p>
              </div>
            </div>
          </div>
      </div>
</div>
    )
  }
}

export default Contact
