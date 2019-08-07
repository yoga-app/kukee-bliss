import React, { Component } from "react";
import "./profiletop.css";
import Button from "../button/Button";
import axios from 'axios';

class ProfileTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      firstName: `${this.props.currentUser.firstName}`,
      lastName: `${this.props.currentUser.lastName}`,
      username: `${this.props.currentUser.username}`,
      showEditPicButton: false,
      file: null,

    };
  }

  toggleEditForm = (e) => {
    e.preventDefault();
    if(this.state.isEditing) {
      this.submitForm()
    }
    this.setState({isEditing: !this.state.isEditing})
  }

  submitForm() {
    axios.post('http://localhost:5000/api/auth/updateuserinfo/'+this.props.currentUser._id, {
      firstName:this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
    })
    .then((freshUser)=> {
      console.log(freshUser);
      this.props.getCurrentUser()
    })
    .catch((err)=> {
      console.log(err);
    })
  }


  onFormSubmit = (e) => {
    e.preventDefault();
    this.fileUpload(this.state.file)
    .then((response)=>{
      this.props.getCurrentUser()
      console.log(response.data);
      this.setState({showEditPicButton: false})
    })
  }

  fileUpload(file){
    const url = 'http://localhost:5000/api/auth/updateuserinfo/'+this.props.currentUser._id;
    const formData = new FormData();
    formData.append('picture',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return  axios.post(url, formData,config)
  }

  triggerInputFile = () => {
    this.fileInput.click();
    this.setState({showEditPicButton: true});

  }

  onPicSelect = (e) => {
    this.setState({file:e.target.files[0]})
  }
  cancel = ()=> {
    this.setState({showEditPicButton: false});
  }

  showInfo() {
    return (
    <section className="user-info">
    <div className="user-pic-wrapper">
      <img
        src={this.props.currentUser.picture}
        alt="user profile"
        className="user-pic-round"
        onClick={this.triggerInputFile}
      />
       <form onSubmit={this.onFormSubmit}>
           <input 
            ref={fileInput => this.fileInput = fileInput} 
            type="file" 
            hidden 
            name="picture"
            onChange={this.onPicSelect}
            />
          <button className={this.state.showEditPicButton ? `visible` : `invisible`}>Save Picture</button>
       </form>
       <button onClick={this.cancel} className={this.state.showEditPicButton ? `visible` : `invisible`}>Cancel</button>
            
         
     
    </div>
    <div className="user-info-wrapper profile-info">
      <h4 className="inline">{this.props.currentUser.firstName} </h4> 
      <h4 className="inline">{this.props.currentUser.lastName}</h4>
      <p>{this.props.currentUser.username}</p>
    </div>
    <div className="edit-button-wrapper">
    <form onSubmit={this.toggleEditForm}>
    <Button text="EDIT PROFILE" class="login-signup small-button"/>
    </form>
    <form onSubmit={this.deleteProfile}>
      <Button text="DELETE PROFILE" class="login-signup small-button"/>
    </form>
  </div>
  </section>
  )
  }

  handleChange = (e) => {

    this.setState({[e.target.name] : e.target.value})
  }

  showEditFields() {
    return (
      <section className="user-info">
      <div className="user-pic-wrapper">
        <img
          src={this.props.currentUser.picture}
          alt="user profile"
          className="user-pic-round"
        />
      </div>
      <div className="user-info-wrapper">
        <input value={this.state.firstName} className="inline first-name-input" name="firstName" onChange={this.handleChange}/>
        <input value={this.state.lastName} className="inline last-name-input" name="lastName"  onChange={this.handleChange}/>
        <br />
        <input value={this.state.username} className="last-name-input" name="username"  onChange={this.handleChange}/>
      </div>
      <div className="edit-button-wrapper">
      <form onSubmit={this.toggleEditForm}>
      <Button text="SAVE CHANGES" class="login-signup small-button"/>
      </form>
    </div>
    </section>
    )
  }

  deleteProfile = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/auth/deleteprofile/'+this.props.currentUser._id)
    .then((response) => {
      console.log(response);
      this.props.getCurrentUser()
    })
    .catch(err=> {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="wrapper">
        <div className="profile-bg">
          <img src={`https://images.unsplash.com/photo-1492541641671-bd75cf01a094?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1200&h=350&fit=crop&ixid=eyJhcHBfaWQiOjF9`}
          alt="profile background"
          className="profile-bg-pic"/>
        </div>
       
      {this.state.isEditing ? this.showEditFields() : this.showInfo()}
      <div className="delete-button-wrapper">
    </div>
      </div>
    );
  }
}

export default ProfileTop;
