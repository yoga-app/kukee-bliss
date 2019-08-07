import React, { Component } from 'react';
import './gallery-item.css';
import axios from 'axios';
import Button from "../button/Button";

class GalleryItem extends Component {
  constructor(props) {
    super(props);
   
    this.state ={
      title: `${this.props.title}`,
      text: `${this.props.text}`,
      picture: null,
      video: `${this.props.link}`,
      category: '',
      isEditing: false,
      refresh: false,
      liked: false,
    }
  }
  
    
submitEditForm = (e) => {
  e.preventDefault();
  const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }}
  const formData = new FormData();
  this.state.picture && formData.append('picture', this.state.picture)
  this.state.title && formData.append('title', this.state.title)
  this.state.video && formData.append('video', this.state.video)
  this.state.text && formData.append('text', this.state.text)
  this.state.category && formData.append('category', this.state.category)
  axios.post('http://localhost:5000/galleryitem/updatebyid/'+this.props.id, formData, config)
  .then(response=> {
    this.props.updateGallery();
    this.setState({refresh: !this.state.refresh, isEditing: false})
    console.log(response);
  })
  .catch(err=> {
    console.log(err);
  })
}

onInputChange = (e) => {
  this.setState({[e.target.name]:e.target.value})
}

onPicSelect = (e) => {
  this.setState({picture:e.target.files[0]})
}

toggleEditForm = (e) => {
  e.preventDefault();
  if(this.state.isEditing) {
    this.submitEditForm()
  }
  this.setState({isEditing: !this.state.isEditing})
}

cancel = (e)=> {
  e.preventDefault();
  this.setState({isEditing: false});
}

newVideo = () => {
  return <div>
           <label htmlFor="video">new video:</label>
           <input name="video" id="video" onChange={this.onInputChange} value={this.state.video} />
         </div>
}

newImage = () => {
  return <div>
           <label htmlFor="picture">new picture:</label>
           <input name="picture" id="picture" type="file" onChange={this.onPicSelect} />
         </div>
}

toggleImageVideo = (e, thisAddForm) =>{
  e.preventDefault();
  if(thisAddForm === "image"){
    this.setState({video: ''})
  } else {
    this.setState({video: 'no video selected'})
  }  
}

showEditFields() {
return (

  <div className="add-gallery-item edit-gallery-item">
    <form className="form-add-video-image" onSubmit={this.submitEditForm}>
      <div>
        <label htmlFor="title">new title:</label>
        <input name="title" id="title" onChange={this.onInputChange} value={this.state.title} />
      </div>

      {this.state.video ? this.newVideo() : this.newImage()}
      {this.state.video ? <button className="image-video-button login-signup small-button" onClick = {(e)=> this.toggleImageVideo(e,'image')}>OR CLICK HERE TO SWAP IT FOR AN IMAGE</button> : <button className="image-video-button login-signup small-button" onClick = {(e)=> this.toggleImageVideo(e,'video')}>OR CLICK HERE TO SWAP IT FOR A VIDEO</button>}

      <div>
        <label htmlFor="title">new categories:</label>
        <input name="category" onChange={this.onInputChange} value={this.state.category} />
      </div>

      <div>
        <label htmlFor="text">new description:</label>
        <input name="text" id="text" onChange={this.onInputChange} value={this.state.text} />
      </div>
      <div>
        <Button text="UPDATE" class="login-signup" />
        <button className="cancel-update-gallery login-signup small-button" onClick={(e)=>{this.cancel(e)}}>CANCEL</button>
      </div>
    </form>
  </div>
)
}

componentDidMount ()  {
  if(this.props.theUser && this.props.likedByArr.includes(this.props.theUser._id))
  {
    this.setState({liked: true})
  }
}

addLike = () => {
  axios.post('http://localhost:5000/galleryitem/likebyid/'+this.props.id, {
    direction: 'add',
    userID: this.props.theUser._id 
  })
  .then((response)=> {
    console.log(response);
    this.setState({liked: true})
  })
  .catch(err=> {
    console.log(err);
  })

  axios.post('http://localhost:5000/api/auth/updatefavorited/'+this.props.theUser._id, {
    direction: 'add',
    itemID: this.props.id
  })
  .then(response => {
    this.props.updateGallery()
    console.log(response);
  })
  .catch(err=> {
    console.log(err);
  })
}

removeLike = () => {
  axios.post('http://localhost:5000/galleryitem/likebyid/'+this.props.id, {
    direction: 'remove',
    userID: this.props.theUser._id 
  })
  .then((response)=> {
    console.log(response);
    
    this.setState({liked: false})
  })
  .catch(err=> {
    console.log(err);
  })

  axios.post('http://localhost:5000/api/auth/updatefavorited/'+this.props.theUser._id, {
    direction: 'remove',
    itemID: this.props.id
  })
  .then(response => {
    this.props.updateGallery()
    console.log(response);
  })
  .catch(err=> {
    console.log(err);
  })
}

showInfo() {
  return (<div className="gallery-card" >
  <h3>{this.props.title}</h3>
  

  {this.props.link ? 
  
  <iframe className="gallery-video" title="video"
  //change this size for youtube embed video. Keep 16:9 ratio
  width="448" height="252" 
  src={this.props.link}
  frameBorder="0" 
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
  allowFullScreen></iframe>
  
  :
  <img src={this.props.picture} className="gallery-image" alt="gallery item"/>
  }
  {this.props.theUser && (this.state.liked ? 
    <div className="like-button-div">
      <button className="like-button liked" onClick={this.removeLike}>♥</button>
    </div>
    :
    <div className="like-button-div"> 
      <button className="like-button not-liked" onClick={this.addLike}>♥</button>
    </div>)
  }
  <p>{this.props.text}</p>
  <div className="categories">
    {this.props.categoryArray && this.showCategory()}
  </div>
  <div className="delete-edit-buttons-gallery">
    {this.props.theUser && this.props.theUser.isAdmin && 
    <form onSubmit={this.deleteGalItem}>
      <Button text="DELETE"
      class="delete-gallery-item-button login-signup small-button" 
      />
    </form>}
    {this.props.theUser && this.props.theUser.isAdmin && 
    <form onSubmit={this.toggleEditForm}>
      <Button text="EDIT" class="edit-gallery-item-button login-signup small-button"/>
    </form>}
  </div>

</div>
  )
}


showCategory() {
  return this.props.categoryArray.map((eachC, index) => {
    return(
      <span key={eachC+index} className="gallery-category">{eachC} </span>
    )
  })
}


deleteGalItem = (e) =>{
  e.preventDefault();
  axios.post('http://localhost:5000/galleryitem/deletebyid/'+this.props.id)
  .then(()=> {
    this.props.updateGallery()
  })
  .catch(err=> {
    console.log(err);
  })
}

  render() {
    return (
      <div>
        {this.state.isEditing ? this.showEditFields() : this.showInfo()}
      </div>
    );
  }
}

export default GalleryItem;