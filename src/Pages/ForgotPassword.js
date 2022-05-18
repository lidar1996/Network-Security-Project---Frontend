import React, { Component } from "react";
import { saveUser } from "../Action/SaveUser";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from 'react-bootstrap/Button';
import axios from "../axios";
import fs from 'fs';
import { readFileSync } from 'fs';
import Alert from '@mui/material/Alert';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      value_from_mail: '',
      error: null
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
      minVersion: "TLSv1.2",
      ca: fs.readFileSync("./resource/bundle.crt"),        
      cert: fs.readFileSync("./resrouce/thirdparty.crt"),
      key: fs.readFileSync("./resource/key.pem"),
    });
    axios.get("users/"+this.state.user.pasword+"/"+this.state.user.email, httpsAgent)
    .then((response) => {
        console.log(response.data) 
        this.props.saveUser({
          isLoggedIn: true,
          
          user: {
            email: response.data.email,
            password: response.data.password                
          },
        });
        window.location.assign("/system")
    })
    .catch((error) => {
        this.setState({error: 'failed to connect'})
        console.log(error.response.data)
    });
}
handleLogin = () => {
    window.location.assign("/")
  }


  render() {
    console.log(this.state)
    return (
      <div style={{ position: 'fixed',  width: '100%', height: '100%', right: 0, left: 0, top: 0, bottom: 0, background: 'aliceblue'}}>
        <div style={{alignContent:'center', display: 'block', margin: 'auto 0'}}>
          <h1>Forgot Your Password?</h1>
          {this.state.error ?  <Alert severity="error" style={{textAlign: 'center'}}>{this.state.error}</Alert> : ''}
        <TextField
            id="outlined-name"
            label="Email"
            onChange={(event) => {this.setState({email: event.target.value})}}
            variant="outlined"
          />
          <Button onClick={this.postOperation}>Send Code</Button>
          <Button onClick={this.handleLogin}>To Login</Button>
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

const SignIn = connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
export default connect()(SignIn);
