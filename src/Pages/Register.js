import React, { Component } from "react";
import { saveUser } from "../Action/SaveUser";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from 'react-bootstrap/Button';
import axios from "../axios";
import fs from 'fs';
import { readFileSync } from 'fs';
import Alert from '@mui/material/Alert';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: '',
        error: ''
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
    const tmp = {
        email: this.state.email,
        password: this.state.password  
    }
    console.log(tmp)
    axios.post("users", tmp, httpsAgent)
    .then((response) => {
        console.log(response.data) 
        this.props.saveUser({
          isLoggedIn: true,
          user: {
            email: this.state.email,
            password: this.state.password                
          },
        });
        window.location.assign("/system")
    })
    .catch((error) => {
        this.setState({error: 'failed to create'})
        console.log(error.response.data)
    });
}
handleToLogin = () => {
    window.location.assign("/")
  }


  render() {
    console.log(this.state)
    return (
      <div style={{ position: 'fixed',  width: '100%', height: '100%', right: 0, left: 0, top: 0, bottom: 0, background: 'aliceblue'}}>
        <div style={{alignContent:'center', display: 'block', margin: 'auto 0'}}>
          <h1>REGISTER</h1>
          {this.state.error ?  <Alert severity="error" style={{textAlign: 'center'}}>{this.state.error}</Alert> : ''}
        <TextField
            id="outlined-name"
            label="Email"
            onChange={(event) => {this.setState({email: event.target.value})}}
            variant="outlined"
          />
            <TextField
            id="outlined-name"
            label="Password"
            onChange={(event) => {this.setState({password: event.target.value})}}
            variant="outlined"
          />
          <Button onClick={this.postOperation}>Register</Button>
          <Button onClick={this.handleToLogin}>To Login</Button>
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

const reg = connect(mapStateToProps, mapDispatchToProps)(Register);
export default connect()(reg);
