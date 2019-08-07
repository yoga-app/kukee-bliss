import React, { Component } from 'react';
import './gallery.css';
import GalleryItem from '../gallery-item/GalleryItem';
import axios from 'axios';
import AddGalleryItem from '../gallery-item/AddGalleryItem';


class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      allGalItems: [],
    }
  }
  
  componentDidMount() {
    axios.get('http://localhost:5000/galleryitem/getall')
    .then(allGalItems=> {
      this.setState({allGalItems: allGalItems.data, ready: true})
    })
  }

  updateGallery = () =>{
    axios.get('http://localhost:5000/galleryitem/getall')
    .then(allGalItems=> {
      this.setState({allGalItems: allGalItems.data})
    })
  }

  showGalItems() {
    return this.state.allGalItems.map(eachI=> {
      return (
        <GalleryItem 
        key={eachI._id}
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
      )
    })
  }

  render() {
 
 
    return (
      <div>
        <div className={this.props.theUser && this.props.theUser.isAdmin ? "gallery" : "gallery-flex gallery"}>

          <div>
            {this.state.ready ? this.showGalItems() : <div>Loading ... </div>}
          </div>
        
          {this.props.theUser && this.props.theUser.isAdmin && <AddGalleryItem updateGallery={this.updateGallery}/>}
        </div>
      </div>
    );

   
  }
}

export default Gallery;