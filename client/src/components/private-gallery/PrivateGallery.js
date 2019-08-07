import React, { Component } from 'react';
import GalleryItem from '../gallery-item/GalleryItem';
import './private-gallery.css';

class PrivateGallery extends Component {

  shouldComponentUpdate(nextProps, nextState){
    if(this.props.currentUser.favoritedItems.length === nextProps.currentUser.favoritedItems.length)
    {return false}
    else {return true}
  }

  showGalItems() {
    this.props.getCurrentUser()
    return this.props.currentUser.favoritedItems.map(eachI=> {
      return (
        <GalleryItem 
        key={eachI._id}
        id={eachI._id}
        link={eachI.video}
        picture={eachI.picture}
        title={eachI.title}
        text={eachI.text}
        categoryArray={eachI.category}
        updateGallery={this.props.getCurrentUser}
        theUser={this.props.currentUser}
        likedByArr={eachI.likedBy}
        />
      )
    })
  }


  render() {
    return (
      <div className="gallery-flex gallery private-gallery">
        <h4>Favorites</h4>
        <div>
          {this.showGalItems()}
        </div>
      </div>
    );
  }
}

export default PrivateGallery;