import React from 'react';
import HowWe from './HowWe';
import Address from './Address';
import ContactForm from './ContactForm';

import './style.css'
import SimpleMap from './Map';

const Contact = () => {
  return (
    <>
      <section className="contact">

        <HowWe/>
        <SimpleMap/>
        <ContactForm/>
        <Address/>
        
      </section>
    </>
  )
}

export default Contact