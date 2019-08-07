import React, { Component } from 'react';
import './gallery-item.css';
import axios from 'axios';
import Button from "../button/Button";

class AddGalleryItem extends Component {
  constructor(props) {
    super(props);
    this.state ={
      title: '',
      text: '',
      picture: null,
      video: '',
      category: '',
      videoInput: true,
    };
  };
  
onFormSubmit = (e) => {
  e.preventDefault();
  const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }}
  const formData = new FormData();
  formData.append('picture', this.state.picture)
  formData.append('title', this.state.title)
  formData.append('video', this.state.video)
  formData.append('text', this.state.text)
  formData.append('category', this.state.category)
  axios.post('http://localhost:5000/galleryitem/create', formData, config)
  .then(response=> {
    this.props.updateGallery();
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

addVideo = () => {
  return <div>
           <label htmlFor="video">link from YouTube:</label>
           <input name="video" id="video" onChange={this.onInputChange} value={this.state.video}/>
         </div>
}

addImage = () => {
  return <div>
           <label htmlFor="picture">picture:</label>
           <input name="picture" id="picture" type="file" onChange={this.onPicSelect} />
         </div>
}


toggleImageVideo = (e, thisAddForm) =>{
  e.preventDefault();
  if(thisAddForm === "image"){
    this.setState({videoInput: false})
  } else {
    this.setState({videoInput: true})
  }  
}


  render() {
    return (
      
      <div className="add-gallery-item">
        <form className="form-add-video-image" onSubmit={this.onFormSubmit}>
          <div>
            <label htmlFor="title">title:</label>
            <input name="title" id="title" onChange={this.onInputChange} value={this.state.title}/>
          </div>
          
          {this.state.videoInput ? this.addVideo() : this.addImage()}
          {this.state.videoInput ? <button className="image-video-button login-signup small-button" onClick = {(e)=> this.toggleImageVideo(e,'image')}>OR CLICK HERE TO ADD AN IMAGE</button> : <button className="image-video-button login-signup small-button" onClick = {(e)=> this.toggleImageVideo(e,'video')}>OR CLICK HERE TO ADD A VIDEO</button>}
          <div>
            <label htmlFor="category">categories: </label>
            <input name="category" id="category" onChange={this.onInputChange} value={this.state.category}/>
          </div>
          <div>
            <label htmlFor="text">description: </label>
            <input name="text" id="text" onChange={this.onInputChange} value={this.state.text}/>
          </div>
          <Button text="SUBMIT" class="login-signup" />
        </form>
      </div>
      
    );
  }
}

export default AddGalleryItem;