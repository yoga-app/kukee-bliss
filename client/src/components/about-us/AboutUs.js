import React, { Component } from 'react';
import './about-us.css';
import MapContainer from '../googleMap/MapContainer.js'

class AboutUs extends Component {
  render() {
    return (
      <div className="about-us">
        <div className="about-your-guruji">
          <h2>About your teacher</h2>
          <p>Valeria Ingold is a writer and yoga instructor from Venezuela. On a mission to make yoga affordable 
            and accessible to people of all ages, shapes, and sizes, she offers $10 classes at Chris Chiropractic Services in Taylors. 
            Valeria has been in love with yoga for over 5 years because it allows her to feel her best at all times and at all places. 
            She enjoys discovering nature spots to practice with her Beagle, Samson.
            <br/><br/>
            "I love teaching yoga because it helps others feel empowered and inspired to grow. 
            Life is movement, and  we connect with it to our fullest as we flow in our practice." <br />Valeria
            </p>
        </div>
        <div className="about-us2">
          <h2>Welcome to Kukee Bliss Yoga!</h2>
          <p>Experience the best things in life with a clear mind and healthy body.  
            <br/>Whether you are trying yoga for the first time, returning from a long break, or already 
            enjoying the benefits of the practice, we have a sequence made just for you! <br/><br/>In case you 
            are wondering why our prices are so low, here’s the reason: <br/>Everyone could enjoy a richer life 
            by continuously practicing awareness of their bodies. When we step onto our mats, we are setting 
            intentions for ourselves – to maintain the proper function of our bodies, prevent back injuries, 
            avoid joint deterioration, boost our mood, and gain mental focus. Yoga helps you achieve all these, 
            but many people hesitate to practice it consistently because of the high costs and studio memberships 
            associated with it. To encourage you to take control of your well-being, we make our classes affordable 
            and even offer class packages to save you more money! <br/><br/>There is a beautiful world out there waiting 
            for you to explore it, why not experience every step of the journey as your best self? <br/><br/>Grab a mat, 
            set your purpose, and  <br/><span className="live-your-happiness">live your happiness!</span> <br/><br/>Valeria</p>
        </div>
        <div className="our-mission">
          <h2>Mission statement</h2>
          <p>Kukee Bliss Yoga is on a mission to make yoga available to everyone! No more excuses! We want to 
            support your growth and health, so we offer classes to each of you regardless of economical or physical 
            limitations. Ready to feel aligned and in sync with your body and mind? 
            <br />
            Enrich your life through yoga, sign up today!</p>
        </div>
        <div className="map-wrap">
          <h2>Where to find us</h2>
          <div className="contact-info">
            <p>(954)544-7806</p>
            <p>Chris Chiropractic Services</p>
            <p>100, E Lee Road, Suite D, Taylors, SC 29687</p>
          </div>
          <MapContainer width={'650px'} height={'450px'}/>
        </div>
      </div>
    );
  }
}

export default AboutUs;