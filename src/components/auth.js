import React from 'react';
import startIMG from '../images/login.png';
import MyContext from '../context/myContext';
import { Redirect} from "react-router-dom";

import {sendQraphQlRequest } from '../gql_requestBodies';


import '../css/auth.css';

class Auth extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isLoginView: true,
            redirect: false,
            unautherized: false,
        };
        this.toggleLogReg = this.toggleLogReg.bind(this);
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.toggleWarning = this.toggleWarning.bind(this);
        
    }
    static contextType = MyContext;


    toggleLogReg = (e) => {
        e.preventDefault();
        this.setState(prevState => ({
            isLoginView: !prevState.isLoginView,
            unautherized: false
        })); 
    }




    login = (e) => {
        e.preventDefault();
        const name = document.getElementById('usernameInput').value;
        const pw = document.getElementById('passwordInput').value;
        if(name && pw){
            const requestBody = {
                query: 
                `query {
                  login(name: "${name}", pw: "${pw}") {
                    id
                    token
                    exp
                  }
                }`
              };
              sendQraphQlRequest(requestBody)
              .then(res => {
                if(res.status === 200){
                  return res.json();
                }
                else {
                  this.setState({
                      unautherized: true
                  });
                }
              })
              .then(resData => {
                if(resData.data.login){
                  const id = resData.data.login.id;
                  const token = resData.data.login.token;
                  if(token && id){
                    this.context.setAuth(id, token);
                    const elementsToHide = document.getElementsByClassName('showIfLoggedin');
                    for(let i = 0; i < elementsToHide.length; i++){
                        elementsToHide[i].style.visibility = 'visible';
                    }
                    this.setState({
                        unautherized: false
                    });
                    this.context.changeLogin(true);
                  } else {
                    this.setState({
                        unautherized: true
                    });
                  }
                }else {
                    this.setState({
                        unautherized: true
                    });
                }
              })



        }


        
    }




    toggleWarning = () => {
        const unauthElements = document.getElementsByClassName('unautherized');
        if(this.state.unautherized){
            for(let i = 0; i < unauthElements.length; i++){
                unauthElements[i].classList.remove('hide');
            } 
        } else {
            for(let i = 0; i < unauthElements.length; i++){
                unauthElements[i].classList.add('hide');
            }
        }
    }








    register = (e) => {
        e.preventDefault();
        console.log("register");
    }

    componentDidUpdate(){
        this.toggleWarning();
        
    }



    render(){

        

        let form;
        if(this.state.isLoginView){
            form = (
                <div id="loginFormWrap">
                    <h2>Questionnaire Tool using React, Express, MongoDB and GraphQL</h2>
                    <div id="bildundform">
                        <img src={startIMG} alt="login"/>
                        <form>
                            <h3>Login</h3>
                            <span>name</span>
                            <input type="text" id="usernameInput" ></input>
                            <span>password</span>
                            <input type="password" id="passwordInput" ></input>
                        <span className="unautherized hide">Email oder Passwort nicht korrekt</span>
                            <div id="logButtons">
                            <button className="formButton" onClick={(e) => this.toggleLogReg(e)} disabled>Register</button>
                            <button className="formButton" id="loginButton" onClick={(e) => this.login(e)}>Login</button>    
                            </div> 
                        </form>
                    </div>


                </div>
            );
        } else {
            form = (
                <div id="registerFormWrap">

                        <form>
                            <h3>Rgeistrierung</h3>
                            <span>email</span>
                            <input type="text" id="usernameInput" ></input>
                            <span>Bitte waählen Sie eine Rolle</span>
                            <select>
                                <option value="1">Zulieferer</option>
                                <option value="2">Hersteller</option>
                                <option value="3">Sonstiges</option>
                            </select>
                            <span>Passwort</span>
                            <input type="password" id="passwordInput" ></input>
                            <span>Passwort wiederholen </span>
                            <input type="password" id="passwordInput-2" ></input>
                            <div id="">
                        
                            <input type="checkbox" value="accept"></input>
                            <span>Ich erkläre mich mit den Datenschutzrichtlinien einverstanden.</span>
                            </div>
                            <div id="registerButtons">
                              <button className="secondaryButton" onClick={(e) => this.toggleLogReg(e)} >Login</button>    
                              <button className="primaryButton" id="regButton" onClick={(e) => this.register(e)}>Register</button>
                            </div> 
                        </form>
                    </div>
            );
        }

        return(
            <div id="auth">
                {form}
                {this.context.loggedIn && <Redirect from="/auth" to="/chapter/1" />}
            </div>
        );
    }



}

export default Auth;