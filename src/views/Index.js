import React from "react";
import { userAuth } from './../auth/isAuthenticated';
import { Redirect } from "react-router-dom";

import {
  Button,
  Collapse,
  FormSelect,
  FormCheckbox,
  Alert,
  Form,
  FormInput,
  FormGroup,
  Card,
  CardBody,
} from "shards-react";
import { Link } from "react-router-dom";

import { userActions } from "../Redux/Actions";
import UploadFileToFirebase from "./../firebase/uploadFileToFirebase";
import { connect } from "react-redux";
import 'toasted-notes/src/styles.css';
class index extends React.Component {
  constructor() {
    super();
    this.state = {
      open: true,
      collapse: true,
      claim: "student",
      email: "",
      password: "",
      lever: "",
      urlAvatar: "",
      confirm_pw: "",
      username: ""
    };

  }

  open_login = () => {
    this.setState({
      open: true
    });

  }

  toggle_collapse = () => {

    this.setState({
      collapse: !this.state.collapse,
      claim: !this.state.collapse ? "student" : "teacher"
    });
  }
  open_signup = () => {
    this.setState({
      open: false,
    });
  }


  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value })
  }

  handleSubmit_Login = e => {
    e.preventDefault();

    this.props._userLoginFetch(this.state);
  }

  handleSubmit_Signup = e => {
    e.preventDefault();
    this.props._userSignUpFetch(this.state);

  }

  getFileUrlImage = url => {
    this.setState({ ...this.state, urlAvatar: url })
  }
  render() {
    const style_btn_login = { width: "50%", margin: "10px 25%" }
    const alert = this.props.data.message === "" ? "" : <Alert theme="warning">{this.props.data.message}</Alert>;
    if (userAuth.isAuthenticated) {
      if (userAuth.claim === "student") {
        return <Redirect to="/" />
      }
      if (userAuth.claim === "teacher") {
        return <Redirect to="/teacher-dashboard" />
      }

    }
 const login = <Form onSubmit={this.handleSubmit_Login}>
      <h3 className="text-center">Login</h3>
      {alert}
      <FormGroup>
        <label htmlFor="#username">Email</label>
        <FormInput type="email" id="#username" name="email" onChange={this.handleChange} placeholder="Username" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="#password">Password</label>
        <FormInput onChange={this.handleChange} name="password" type="password" id="#password" placeholder="Password" />
      </FormGroup>

      <Button disabled={this.state.email === "" || this.state.password === ""} type="submit" style={style_btn_login} outline pill them="success"> Login </Button>
      <Link to="#" className="text-right" style={{ float: "right" }} onClick={this.open_signup}>You haven't account? Register </Link>
      <div className="footer-social-icons" style={{ marginTop: '20px' }}>
        <h4 className="_14">Follow us on</h4>
        <hr />
        <ul className="social-icons">
          <li><Link to="/" className="social-icon"> <i className="fa fa-facebook"></i></Link></li>
          <li><Link to="/" className="social-icon"> <i className="fa fa-twitter"></i></Link></li>
          <li><Link to="/" className="social-icon"> <i className="fa fa-rss"></i></Link></li>
          <li><Link to="/" className="social-icon"> <i className="fa fa-youtube"></i></Link></li>
          <li><Link to="/" className="social-icon"> <i className="fa fa-linkedin"></i></Link></li>
          <li><Link to="/" className="social-icon"> <i className="fa fa-google-plus"></i></Link></li>
        </ul>
      </div>
    </Form>;
    const signup = <Form onSubmit={this.handleSubmit_Signup}>
      <h3 className="text-center">Register</h3>
      {alert}
      <div className="mb-3 mx-auto text-center">
        <img
          className="rounded-circle"
          src={this.state.urlAvatar ? this.state.urlAvatar : require("./../images/avatars/userAvatar.png")}
          alt="avatar"
          width="100"
        />
        <UploadFileToFirebase fileName="avatarUsers" title="Загрузить изображение" getFileUrl={this.getFileUrlImage} />
      </div>


      <FormGroup>
        <label htmlFor="#username">Username</label>
        <FormInput id="#username" placeholder="Username" name="username" onChange={this.handleChange} />
      </FormGroup>
      <FormGroup>
        <label htmlFor="#password">Email</label>
        <FormInput type="email" id="#password" placeholder="abc@gmail.com" name="email" onChange={this.handleChange} />
      </FormGroup>
      <FormGroup>
        <label htmlFor="#password">Password</label>
        <FormInput type="password" id="#password" placeholder="***********" name="password" onChange={this.handleChange} />
      </FormGroup>
      <FormGroup>
        <label htmlFor="#password">Confirm Password</label>
        <FormInput invalid={this.state.password !== this.state.confirm_pw} type="password" id="#password" placeholder="************" name="confirm_pw" onChange={this.handleChange} />
      </FormGroup>
      <hr />
      <FormCheckbox checked={!this.state.collapse} toggle small onChange={this.toggle_collapse}  > Register for teacher ?  </FormCheckbox>

      <Collapse open={this.state.collapse}>
        <FormSelect name="lever" onChange={this.handleChange}>
          <option value="">choose your lever</option>
          <option value="A1">Lever A1</option>
          <option value="A2">Lever A2</option>
          <option value="B1">Lever B1</option>
          <option value="B2">Lever B2</option>
          <option value="C1">Lever C1</option>
          <option value="C2">Lever C2</option>
          <option value="D1">Lever D1</option>
          <option value="D2">Lever D2</option>
        </FormSelect>

      </Collapse>
      <br />
      <Button type="submit" disabled={this.state.username === "" || this.state.email === "" || this.state.password !== this.state.confirm_pw || this.state.password === ""} style={style_btn_login} outline pill theme="success"> Register </Button>
      <Link to="#" className="text-right" style={{ float: "right" }} onClick={this.open_login}> <span>You have account ?</span> Login </Link>
</Form>;

    return (
              <Card style={{maxWidth:"600px",margin: "40px auto"}}>
                <CardBody>
                  {this.state.open ? login : signup}

                </CardBody>
              </Card>
    );
  }
}
const mapStateToProps = state => ({
  data: state.user
})
const mapDispatchToProps = dispatch => ({
  _userLoginFetch: user => dispatch(userActions.userLoginFetch(user)),
  _userSignUpFetch: user => dispatch(userActions.userSignupFetch(user))
})
export default connect(mapStateToProps, mapDispatchToProps)(index);