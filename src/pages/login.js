import React, { Component } from 'react';
import '../styles/register.css';
import firebase from 'firebase';
import swal from 'sweetalert';

export default class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    signInWithEmail = () => {
        document.getElementById('spinner').style.display = 'block';
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          localStorage.setItem('user', user.email);
          window.location.href = '/home';
          document.getElementById('spinner').style.display = 'none';
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          swal(errorMessage);
          document.getElementById('spinner').style.display = 'none';
        });
    }

    signInWithGoogle = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;
                var token = credential.accessToken;
                var user = result.user;
                localStorage.setItem('user', user.email);
                sessionStorage.setItem('token', token);
                window.location.href = '/home';
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                swal(errorMessage);
            });
    }

    signInWithFacebook = () => {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;
                var user = result.user;
                var accessToken = credential.accessToken;
                if(user.displayName == null || user.displayName == undefined){
                    if(user.email == null || user.email == undefined){
                      localStorage.setItem('user', user.phoneNumber)
                      sessionStorage.setItem('token', accessToken)
                      window.location.href = '/home';              
                    }else{
                      localStorage.setItem('user', user.email)
                      sessionStorage.setItem('token', accessToken)
                      window.location.href = '/home';
                    }
                }else{
                  localStorage.setItem('user', user.displayName)
                  sessionStorage.setItem('token', accessToken)
                  window.location.href = '/home';
                }
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                swal(errorMessage);
            });
    }

    signInWithGithub = () => {
        var provider = new firebase.auth.GithubAuthProvider();
        firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;
          var token = credential.accessToken;
          var user = result.user;
          if(user.displayName == null || user.displayName == undefined){
              if(user.email == null || user.email == undefined){
                localStorage.setItem('user', user.phoneNumber)
                sessionStorage.setItem('token', token)
                window.location.href = '/home';              
              }else{
                localStorage.setItem('user', user.email)
                sessionStorage.setItem('token', token)
                window.location.href = '/home';
              }
          }else{
            localStorage.setItem('user', user.displayName)
            sessionStorage.setItem('token', token)
            window.location.href = '/home';
          }
        }).catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          swal(errorMessage)
        });      
    }

    render() {
        return (
            <section className="login-block">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                                <div className="auth-box card">
                                    <div className="card-block">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <h3 className="text-center heading">Login to book hotels</h3>
                                            </div>
                                        </div>
                                        <div className="form-group form-primary"> <input type="text" className="form-control" name="email" value={this.state.email} placeholder="Email" id="email" onChange={(e)=>this.setState({email: e.target.value})} /> </div>
                                        <div className="form-group form-primary"> <input type="password" className="form-control" name="password" placeholder="Password" value={this.state.password} id="password" onChange={(e)=>this.setState({password: e.target.value})} /> </div>
                                        <div className="row">
                                            <button className="btn btn-primary btn-md btn-block waves-effect text-center m-b-20" name="submit" value="Login" onClick={()=>this.signInWithEmail()}><span className="spinner-border spinner-border-sm" role="status" id='spinner' style={{display: 'none'}} aria-hidden="true"></span> Login Using Email/Password</button>                                        </div>
                                        <div className="or-container">
                                            <div className="line-separator"></div>
                                            <div className="or-label">or</div>
                                            <div className="line-separator"></div>
                                        </div>
                                        <div className="row">
                                            <button className="btn btn-lg btn-google btn-block btn-outline" onClick={() => this.signInWithGoogle()}><img src="https://img.icons8.com/color/16/000000/google-logo.png" /> Login Using Google</button>
                                            <br />
                                            <div className="line-separator"></div>
                                            <div className="line-separator"></div>
                                            <div className="line-separator"></div>
                                            <button className="btn btn-lg btn-facebook btn-block btn-outline" onClick={() => this.signInWithFacebook()}><img src="https://pnggrid.com/wp-content/uploads/2021/05/Facebook-logo-2021.png" width={19} height={19} /> Login Using Facebook</button>
                                            <div className="line-separator"></div>
                                        <div className="line-separator"></div>
                                        <div className="line-separator"></div>
                                        <button className="btn btn-lg btn-github btn-block btn-outline" onClick={() => this.signInWithGithub()}><img src="https://pbs.twimg.com/profile_images/1414990564408262661/r6YemvF9_400x400.jpg" width={19} height={19} /> Login Using Github</button>
                                        </div> <br />
                                        <p className="text-inverse text-center">Don't have an account? <a href="/register" data-abc="true">Signup</a></p>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}