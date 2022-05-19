import React, { Component } from "react";
import { saveUser } from "../Action/SaveUser";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from 'react-bootstrap/Button';
import axios from "../axios";
import fs from 'fs';
import { readFileSync } from 'fs';
import Alert from '@mui/material/Alert';

class UpdatePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
        first_name: '',
        last_name: '',
        error: null,
        show_customer: false
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
    const client = {
        f_name: this.state.first_name,
        l_name: this.state.last_name
    }
    axios.post("clients", client, httpsAgent)
    .then((response) => {
        console.log(response.data)
         this.setState({show_customer: true})
    })
    .catch((error) => {
        this.setState({error: 'failed to connect'})
        console.log(error.response.data)
    });
}
handleChangePass = () => {
    window.location.assign("/changepassword")
  }


  render() {
    if(!this.props.user.isLoggedIn){
        window.location.assign("/")
    }
    let customer = null
    if(this.state.show_customer){
        customer = <Alert severity="info" style={{textAlign: 'center'}}>{this.state.first_name} + " " + {this.state.last_name}</Alert>
    }
    return (
      <div style={{ position: 'fixed',  width: '100%', height: '100%', right: 0, left: 0, top: 0, bottom: 0, background: 'aliceblue'}}>
        <div style={{alignContent:'center', display: 'block', margin: 'auto 0'}}>
          <h1>Add New Client</h1>
          {this.state.error ?  <Alert severity="error" style={{textAlign: 'center'}}>{this.state.error}</Alert> : ''}
        <TextField
            id="outlined-name"
            label="First Name"
            onChange={(event) => {this.setState({first_name: event.target.value})}}
            variant="outlined"
          />
            <TextField
            id="outlined-name"
            label="Last Name"
            onChange={(event) => {this.setState({last_name: event.target.value})}}
            variant="outlined"
          />
          {customer}
          <Button onClick={this.postOperation}>ADD</Button>
          <Button onClick={this.handleChangePass}>To Change Password</Button>
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
