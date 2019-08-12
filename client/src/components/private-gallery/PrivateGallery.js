import React, { Component } from 'react';
import GalleryItem from '../gallery-item/GalleryItem';
import './private-gallery.css';
import { BreakpointProvider } from 'react-socks';

class PrivateGallery extends Component {

  shouldComponentUpdate(nextProps, nextState){
    if(this.props.currentUser.favoritedItems.length === nextProps.currentUser.favoritedItems.length)
    {return false}
    else {return true}
  }


  
  showGalItems() {
    this.props.getCurrentUser()
    return this.props.currentUser.favoritedItems.map((eachI, index)=> {
      return (
        <BreakpointProvider>
          <GalleryItem 
          key={index + eachI._id}
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
        </BreakpointProvider>
      )
    })
  }


  render() {
    return (
      <div>
        {this.props.getCurrentUser()}
        {this.props.currentUser.favoritedItems.length > 0 &&
          <div className="gallery-flex gallery private-gallery each-profile-section">
            <h4>Favorites</h4>
            <div>
              {this.showGalItems()}
            </div>
          </div>
        }
      </div>
    );
  }
}

export default PrivateGallery;