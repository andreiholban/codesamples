import React, { Component } from "react";
import ReactLoading from "react-loading";
import { browserHistory } from "react-router";

import { register } from "../../apiCalls";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      email: '',
      password: "",
      rePassword: '',
      loading: false,
      loginError: false,
      agreeAll: false,
      signupErrorStatus: false,
      signupErrorMessage: '',
    };
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeRePassword = this.handleChangeRePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeAgreeStatus = this.handleChangeAgreeStatus.bind(this);
  }

  handleChangeAgreeStatus(e) {
    this.setState({
      agreeAll: !this.state.agreeAll,
    })
  }
  handleChangeUserName(e) {
    this.setState({
      userName: e.target.value
    });
  }
  handleChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  handleChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  handleChangeRePassword(e) {
    this.setState({
      rePassword: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      loading: true,
    })
    const name = this.state.userName;
    const email = this.state.email;
    const password = this.state.password;
    const rePassword = this.state.rePassword;
    let flag = true;
    if (password !== rePassword) {
      flag = false;
      this.setState({
        signupErrorMessage: 'Passwords are not matching',
        signupErrorStatus: true,
        loading: false,
      })
    } else if (!this.state.agreeAll) {
      flag = false;
      this.setState({
        signupErrorMessage: 'Please agree to all terms',
        signupErrorStatus: true,
        loading: false,
      })
    }
    if (flag) {
      const data = {
        name,
        email,
        password
      }
      register(data)
        .then((response) => {
          // console.log('register response' , response.data);
          this.setState({
            loading: false,
          })

          browserHistory.push("/login");
        })
        .catch((error) => {
          // console.log('register error', error.response.data);
          this.setState({
            signupErrorMessage: error.response.data.error,
            signupErrorStatus: true,
            loading: false,
          })
        })
    }
  }
  loadingComponent() {
    return (
      <ReactLoading type={"bars"} color={"rgb(141, 141, 141)"} />
    );
  }
  render() {
    // console.log("register component");
    return (
      <div
        className="login-register"
        style={{
          backgroundImage:
            "url('../assets/images/background/login-register.jpg')"
        }}
      >
        <div className="login-box card">
          <div className="card-body">
            <form
              className="form-horizontal form-material"
              id="loginform"
              onSubmit={this.handleSubmit}
            >
              <h3 className="box-title m-b-20">Sign Up</h3>
              <div className="form-group">
                <div className="col-xs-12">
                  <input
                    className="form-control"
                    type="text"
                    required=""
                    value={this.state.userName}
                    onChange={this.handleChangeUserName}
                    placeholder="Name"
                  />
                </div>
              </div>
              <div className="form-group ">
                <div className="col-xs-12">
                  <input
                    className="form-control"
                    type="text"
                    required=""
                    value={this.state.email}
                    onChange={this.handleChangeEmail}
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="form-group ">
                <div className="col-xs-12">
                  <input
                    className="form-control"
                    type="password"
                    required=""
                    value={this.state.password}
                    onChange={this.handleChangePassword}
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-12">
                  <input
                    className="form-control"
                    type="password"
                    required=""
                    value={this.state.rePassword}
                    onChange={this.handleChangeRePassword}
                    placeholder="Confirm Password"
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-12">
                  <div className="checkbox checkbox-success p-t-0 p-l-10">
                    <input id="checkbox-signup" type="checkbox" checked={this.state.agreeAll} onChange={this.handleChangeAgreeStatus} />
                    <label htmlFor="checkbox-signup">
                      {" "}
                      I agree to all <a href="#">Terms</a>
                    </label>
                  </div>
                </div>
              </div>
              <div className={this.state.signupErrorStatus ? 'col-sm-12 text-center intell-red' : 'intell-no-display'}>
                {this.state.signupErrorMessage}
              </div>
              <div className="form-group text-center m-t-20">
                <div className={this.state.loading ? 'intell-no-display' : 'col-xs-12'}>
                  <button
                    className="btn btn-info btn-lg btn-block text-uppercase waves-effect waves-light"
                    type="submit"
                  >
                    Sign Up
                  </button>
                </div>
                <div
                  className={
                    this.state.loading
                      ? "col-md-2 offset-md-5"
                      : "intell-no-display"
                  }
                >
                  <div className="col-xs-3">{this.loadingComponent()}</div>
                </div>
              </div>
              <div className="form-group m-b-0">
                <div className="col-sm-12 text-center">
                  <p>
                    Already have an account?{" "}
                    <a href="/login" className="text-info m-l-5">
                      <b>Sign In</b>
                    </a>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
