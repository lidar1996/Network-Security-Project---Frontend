import React, { Component } from "react";
import { saveUser } from "../Action/SaveUser";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from 'react-bootstrap/Button';
import axios from "../axios";
import fs from 'fs';
import { readFileSync } from 'fs';
import Alert from '@mui/material/Alert';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
      email: '',
      pasword: '',
      error: null}
    };
    this.props.saveUser({
      isLoggedIn: false,

      user: {
        email: this.props.user.user.email,
        password: this.props.user.user.password,

      },
    });
    console.log(this.props.user.user);
  }
  postOperation = () => {
    const https = require("https");
    const httpsAgent = new https.Agent({
      maxVersion: "TLSv1.2",
      minVersion: "TLSv1.2"
    });
    axios.get("users/login/"+this.state.user.email+"/"+this.state.user.pasword, httpsAgent)
    .then((response) => {
        console.log(response.data) 
        this.props.saveUser({
          isLoggedIn: true,
          
          user: {
            email: this.state.user.email,
            password: this.state.user.pasword               
          },
        });
        window.location.assign("/system")
    })
    .catch((error) => {
        this.setState({error: 'failed to connect'})
        console.log(error.response.data)
    });
}
  handleRegister = () => {
    window.location.assign("/register")
  }

  handleForgot = () => {
    window.location.assign("/forgotpassword")
  }


  render() {
    console.log(this.state)
    return (
      <div style={{ position: 'fixed',  width: '100%', height: '100%', right: 0, left: 0, top: 0, bottom: 0, background: 'aliceblue'}}>
        <div style={{alignContent:'center', display: 'block', margin: 'auto 0'}}>
          <h1>Welcome to Comunication_LTD</h1>
          {this.state.error ?  <Alert severity="error" style={{textAlign: 'center'}}>{this.state.error}</Alert> : ''}
        <TextField
            id="outlined-name"
            label="Email"
            onChange={(event) => {this.setState({user:{email: event.target.value}})}}
            variant="outlined"
          />
            <TextField
            id="outlined-name"
            label="Password"
            onChange={(event) => {this.setState({user:{password: event.target.value}})}}
            variant="outlined"
          />
          <Button onClick={this.postOperation}>Login</Button>
          <Button onClick={this.handleRegister}>To Register</Button>
          <Button onClick={this.handleForgot}>Forgot Password</Button>
          </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    saveUser: (user) => dispatch(saveUser(user)),
  };
}

const SignIn = connect(mapStateToProps, mapDispatchToProps)(Login);
export default connect()(SignIn);
