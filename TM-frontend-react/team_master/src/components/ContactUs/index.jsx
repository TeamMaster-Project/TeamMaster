import React, { Component } from "react";
import "./index.css";
import contact_3 from "../../assets/images/contact_3.gif";

class ContactUs extends Component {
  render() {
    return (
      <div
        class="container"
        style={{
          backgroundImage: `url(${contact_3})`,
        }}
      >
        <h4 class="h4-header">GET IN TOUCH</h4>
        <div class="full-content">
          <div class="icon">
            <p class="contact-way">
              <i class="fa fa-map-marker"></i> 123/2 Galle Road, Colombo 03.
            </p>
            <p class="contact-way">
              <i class="fa fa-phone"></i> Telephone : +(94) 76 687 3396
            </p>
            <p class="contact-way">
              <i class="fa fa-fax"></i> FAX : +(94) 41 568 7754
            </p>
            <p class="contact-way">
              <i class="fa fa-envelope-o"></i> Email :
              <a href="mailto:pvkchathuranga060@mail.com">
                info@teammaster.com
              </a>
            </p>
          </div>
          <div class="map-w3layouts">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18451.05437903347!2d79.92609419051306!3d6.974392066324805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x12c707892cabde33!2z4Laa4LeQ4LeF4Lar4LeS4La6IOC3gOC3kuC3geC3iuC3gOC3gOC3kuC2r-C3iuKAjeC2uuC3j-C2veC2ug!5e0!3m2!1ssi!2slk!4v1620929143857!5m2!1ssi!2slk"
              width="600"
              height="500"
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactUs;
