import React, { Component } from 'react';
import './gallery.css';
import GalleryItem from '../gallery-item/GalleryItem';
import axios from 'axios';
import AddGalleryItem from '../gallery-item/AddGalleryItem';
import Breakpoint, { BreakpointProvider } from 'react-socks';


class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      allGalItems: [],
    }
  }
  
  componentDidMount() {
    axios.get(`${process.env.REACT_APP_BASE}galleryitem/getall`)
    .then(allGalItems=> {
      this.setState({allGalItems: allGalItems.data, ready: true})
    })
  }

  updateGallery = () =>{
    axios.get(`${process.env.REACT_APP_BASE}galleryitem/getall`)
    .then(allGalItems=> {
      this.setState({allGalItems: allGalItems.data})
    })
  }

  showGalItems() {
    return this.state.allGalItems.map((eachI, index)=> {
      return (
        <BreakpointProvider>
          <GalleryItem 
          key={eachI._id + index}
          id={eachI._id}
          link={eachI.video}
          picture={eachI.picture}
          title={eachI.title}
          text={eachI.text}
          categoryArray={eachI.category}
          updateGallery={this.updateGallery}
          theUser={this.props.theUser}
          likedByArr={eachI.likedBy}
          />
        </BreakpointProvider>
      )
    })
  }

  render() {
 
 
    return (
      <div>
        <Breakpoint small down>
        <div className={this.props.theUser && this.props.theUser.isAdmin ? "gallery" : "no-form gallery"}>

            <div>
              {this.state.ready ? this.showGalItems() : <div>Loading ... </div>}
            </div>
            <BreakpointProvider>
              {this.props.theUser && this.props.theUser.isAdmin && <AddGalleryItem updateGallery={this.updateGallery}/>}
            </BreakpointProvider>
          </div>
        </Breakpoint>
        <Breakpoint medium up>
          <div className={this.props.theUser && this.props.theUser.isAdmin ? "gallery" : "gallery-flex gallery"}>

            <div>
              {this.state.ready ? this.showGalItems() : <div>Loading ... </div>}
            </div>
            <BreakpointProvider>
              {this.props.theUser && this.props.theUser.isAdmin && <AddGalleryItem updateGallery={this.updateGallery}/>}
            </BreakpointProvider>
          </div>
        </Breakpoint>

      </div>
    );

   
  }
}

export default Gallery;