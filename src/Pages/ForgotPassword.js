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
      error: null,
      show: false,
      show_password: false,
      password: ''
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
  sendCode = () => {
    const https = require("https");
    const httpsAgent = new https.Agent({
      maxVersion: "TLSv1.2",
      minVersion: "TLSv1.2"
    });
    axios.get("users/send_code/"+this.state.user.email, httpsAgent)
    .then((response) => {
        this.setState({show: true})
        console.log(response.data)
    })
    .catch((error) => {
        this.setState({error: 'user is not in the system'})
        console.log(error.response.data)
    });
}

hanldeCodeFromMail = () => {
    const https = require("https");
    const httpsAgent = new https.Agent({
      maxVersion: "TLSv1.2",
      minVersion: "TLSv1.2"
    });
    const code = {
        code: this.state.value_from_mail

    }
    axios.post("users/verify_code/"+this.state.user.email, code, httpsAgent)
    .then((response) => {
        console.log(response.data)
    })
    .catch((error) => {
        this.setState({error: 'code is wrong'})
        console.log(error.response.data)
    });
}

hanldeChangePassword = () => {
    const https = require("https");
    const httpsAgent = new https.Agent({
      maxVersion: "TLSv1.2",
      minVersion: "TLSv1.2"
    });
    const tmp = {
        password: this.state.password

    }
    axios.put("users/"+this.state.user.email, tmp, httpsAgent)
    .then((response) => {
        console.log(response.data)
        this.props.saveUser({isLoggedIn: true});
        window.location.assign("/system")        
    })
    .catch((error) => {
        this.setState({error: 'password is not acceptable'})
        console.log(error.response.data)
    });
}
handleLogin = () => {
    window.location.assign("/")
  }


  render() {
    console.log(this.state)
    let code_handler = null;
    if(this.state.show){
        code_handler = 
        <div>
          <TextField
            id="outlined-name"
            label="Code From Email"
            onChange={(event) => {this.setState({value_from_mail: event.target.value})}}
            variant="outlined"
          />
          <Button onClick={this.hanldeCodeFromMail}>Change Password</Button>
          </div>
    }
    let pass_handler = null;
    if(this.state.show_password){
        pass_handler = 
        <div>
          <TextField
            id="outlined-name"
            label="New Password"
            onChange={(event) => {this.setState({password: event.target.value})}}
            variant="outlined"
          />
          <Button onClick={this.hanldeChangePassword}>Change Password</Button>
          </div>
    }
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
          <Button onClick={this.sendCode}>Send Code</Button>
          <Button onClick={this.handleLogin}>To Login</Button>
          {code_handler}
          {pass_handler}
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
