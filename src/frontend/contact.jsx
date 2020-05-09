import React, { Component } from 'react';
import emailjs from 'emailjs-com';

class Contact extends Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {

    var form_values = {
      "name": event.target.name.value,
      "email": event.target.email.value,
      "message": event.target.message.value
    }

    event.preventDefault();
    emailjs.send('default_service', 'template_49yMrNtD', form_values, 'user_jezpq79gZJgVOjwUgvmHa').then(function(response) {
         console.log('SUCCESS!', response.status, response.text);
         alert('Your mail is sent, I will be in touch shortly!')
      }, function(error) {
         console.log('FAILED...', error);
         alert('There seems to be a problem with my mail server, your email was unfortunately not sent.');
      });
      document.getElementById("myform").reset();
    }

  render() {

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
                        <input type="text" id="name" className="form-control" placeholder="Name" required/>
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                    <div className="form-group col-md-6">
                      <div className="form-group">
                        <input type="email" id="email" className="form-control" placeholder="Email" required />
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                  </div>
                    <textarea name="message" id="message" className="form-control" rows="4" placeholder="Message" required></textarea>
                    <p className="help-block text-danger"></p>
                 <button type="submit"  value="Send" className="btn btn-custom btn-lg">Send Message</button>
                </form>
              </div>
            </div>
            <div className="col-md-3 col-md-offset-1 contact-info">
              <div className="contact-item">
                <h3>Contact Info</h3>
                <p><span><i className="fa fa-map-marker"></i> Address</span>Ottawa Ontario Canada</p>
              </div>
              <div className="contact-item">
                <p><span><i className="fa fa-phone"></i> Phone</span>+1-613-608-6215</p>
              </div>
              <div className="contact-item">
                <p><span><i className="fa fa-envelope-o"></i> Email</span>liannedelasalle@gmail.com</p>
              </div>
            </div>
          </div>
      </div>
</div>
    )
  }
}

export default Contact
