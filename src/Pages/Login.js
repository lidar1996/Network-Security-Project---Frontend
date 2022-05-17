import React, { Component } from "react";
import { saveUser } from "../Action/SaveUser";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from 'react-bootstrap/Button'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
      email: '',
      pasword: ''}
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

  render() {
    console.log(this.state)
    return (
      <div style={{ position: 'fixed',  width: '100%', height: '100%', right: 0, left: 0, top: 0, bottom: 0, background: 'aliceblue'}}>
        <div style={{alignContent:'center', display: 'block', margin: 'auto 0'}}>
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
          <Button>Login</Button>
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
