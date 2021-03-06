import React, { Component } from "react";
import { saveUser } from "../Action/SaveUser";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from 'react-bootstrap/Button';
import axios from "../axios";
import Alert from '@mui/material/Alert';

class UpdatePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPass: '',
      newPass: '',
      error: null,
      show_succes: false
    };
    this.props.saveUser({
        isLoggedIn: true,
        user: {
          email: this.props.user.user.email,
          password: this.props.user.user.password                
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
    console.log("users/login/"+this.props.user.user.email+"/"+this.state.currentPass)
    axios.get("users/login/"+this.props.user.user.email+"/"+this.state.currentPass, httpsAgent)
    .then((response) => {
        console.log(response.data) 
        this.handle_change_pass()
    })
    .catch((error) => {
        this.setState({error: 'old password wrong'})
    });
}

handle_change_pass = () => {
    const https = require("https");
    const httpsAgent = new https.Agent({
      maxVersion: "TLSv1.2",
      minVersion: "TLSv1.2"
    });
    const tmp = {
        password: this.state.newPass
    }
    axios.put("users/"+this.props.user.user.email, tmp, httpsAgent)
    .then((response) => {
        console.log(response.data) 
        this.setState({error: null, show_succes: true})
        this.props.saveUser({
          isLoggedIn: true,
          
          user: {
            email: this.props.user.user.email,
            password: this.state.newPass                
          },
        });
    })
    .catch((error) => {
        this.setState({error: 'password is not acceptable'})
        console.log(error.response.data)
    });
}

handleLogin = () => {
    window.location.assign("/")
  }

  toSystem = () => {
    window.location.assign("/system")
  }


  render() {
    if(!this.props.user.isLoggedIn){
        window.location.assign("/")
      }
      let succes_msg = null
      if(this.state.show_succes){
        succes_msg = <Alert severity="info" style={{textAlign: 'center'}}>Password Updated</Alert>
      }
    return (
      <div style={{ position: 'fixed',  width: '100%', height: '100%', right: 0, left: 0, top: 0, bottom: 0, background: 'aliceblue'}}>
        <div style={{alignContent:'center', display: 'block', margin: 'auto 0'}}>
          <h1>Update Your Password</h1>
          {this.state.error ?  <Alert severity="error" style={{textAlign: 'center'}}>{this.state.error}</Alert> : ''}
        <TextField
            required
            id="outlined-name"
            label="Old Password"
            onChange={(event) => {this.setState({currentPass: event.target.value})}}
            variant="outlined"
          />
            <TextField
            required
            id="outlined-name"
            label="New Password"
            onChange={(event) => {this.setState({newPass: event.target.value})}}
            variant="outlined"
          />
          {succes_msg}
          <Button onClick={this.postOperation}>UPDATE</Button>
          <Button onClick={this.handleLogin}>To Login</Button>
          <Button onClick={this.toSystem}>To System</Button>
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

const SignIn = connect(mapStateToProps, mapDispatchToProps)(UpdatePassword);
export default connect()(SignIn);
