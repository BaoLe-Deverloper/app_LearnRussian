import React, { Component } from "react";
import firebase from "firebase/app";
import { Progress } from "shards-react";
import FileUploader from "react-firebase-file-uploader";
import  "./initFirebase";
class uploadFileToFirebase extends Component {
  state = {
    link: "",
    isUploading: false,
    progress: 0,
    FileURL: ""
  };

  dir_file=this.props.fileName?this.props.fileName:"media";
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
   
  };
  handleUploadSuccess = filename => {
    this.setState({ link: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref(this.dir_file)
      .child(filename)
      .getDownloadURL()
      .then(url => {
          this.setState({ FileURL: url })
          this.props.getFileUrl(url)
    });
  };
 
  render() {
   
    return (
        
    <label style={{backgroundColor: '#bed6ea', color: 'white', padding: 4, borderRadius: 4, pointer: 'cursor', width:'100%'}}>
           <h6 className="text-center">{this.props.title}</h6>
          <Progress theme="primary" value={this.state.progress} />
          <FileUploader
            accept="image/*, video/*, audio/*"
            name="media"
            randomizeFilename
            storageRef={firebase.storage().ref(this.dir_file)}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
            className="btn btn-primary btn-block"
            style={{padding:"5px", marginTop:"5px"}}
          />
      </label>
    );
  }
}
 
export default uploadFileToFirebase;