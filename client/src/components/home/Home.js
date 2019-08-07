import React, { Component } from 'react';
import './home.css';
import Quote from '../quote/Quote.js';
import Hero from '../hero/Hero.js';
import Testimonial from '../testimonial/Testimonial.js';
import Slogan from '../slogan/Slogan.js';
import axios from 'axios';
import Mandala from '../mandala/Mandala';



class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: {},
      testimonials: [],
      ready: false,
    }
  }
  
  componentDidMount() {
    axios.get('http://localhost:5000/quote/randomQuote')
    .then((randomQuote)=> {
      axios.get('http://localhost:5000/testimonial/getall')
      .then(allTestimonials=> {
        this.setState({quote: randomQuote.data, testimonials: allTestimonials.data, ready: true})
      })
      .catch(err => {
        console.log('Sommething went wrong getting all testimonials')
      })
    })
    .catch((err)=> {
      console.log('Something went wrong getting random quote');
    })
  }

  showTestimonials() {
    return this.state.testimonials.map(eachT=> {
      return( 
        <Testimonial
        key={eachT._id}
        text={eachT.text}
        picture={eachT.picture} 
        author={eachT.author}
        rating={eachT.rating}
        attended={eachT.attended} />
      )
    })
  }

  showMandala(opacity) {
    let result = [];
    for(let i=0;i < opacity; i++){
      result.push(<Mandala key={i}/>)
    }
    return <div>{result}</div>
  }

  render() {
    return (
      <div className="home">
        <Hero showMandala={this.showMandala}/>
          {this.state.ready && <Quote text={this.state.quote.text} author={this.state.quote.author}/>}
          <section className="testimonial-cards">
            {this.state.ready && this.showTestimonials()}
          </section>
          <Slogan />
      </div>
    );
  }
}

export default Home;