import React, { Component } from 'react';
import './home.css';
import Quote from '../quote/Quote.js';
import Hero from '../hero/Hero.js';
import Testimonial from '../testimonial/Testimonial.js';
import Slogan from '../slogan/Slogan.js';
import axios from 'axios';
import Mandala from '../mandala/Mandala';
import Breakpoint, { BreakpointProvider } from 'react-socks';



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
    axios.get(`${process.env.REACT_APP_BASE}quote/randomQuote`)
    .then((randomQuote)=> {
      axios.get(`${process.env.REACT_APP_BASE}testimonial/getall`)
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
        <BreakpointProvider>
          <Hero showMandala={this.showMandala}/>
          {this.state.ready && <Quote text={this.state.quote.text} author={this.state.quote.author}/>}
          <section className="testimonial-cards">
            {this.state.ready && this.showTestimonials()}
          </section>
        </BreakpointProvider>
          <Slogan />
      </div>
    );
  }
}

export default Home;