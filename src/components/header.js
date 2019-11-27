import React from 'react';
import MyContext from '../context/myContext';
import { Redirect, withRouter} from "react-router-dom";

import '../css/header.css';
import 'font-awesome/css/font-awesome.min.css';

class Header extends React.Component {
    constructor (props) {
        super(props);
        this.state = {

        };
        this.logout = this.logout.bind(this);
        this.menuClick = this.menuClick.bind(this);

    }

    static contextType = MyContext;


    logout = () => {
    
        this.context.changeLogin(false);
        const elementsToHide = document.getElementsByClassName('showIfLoggedin');
        for(let i = 0; i < elementsToHide.length; i++){
            elementsToHide[i].style.visibility = 'hidden';
        }
        const hiddenMenu = document.getElementById('hiddenMenu'); 
        this.menuClick();
    }


    menuClick = () => {
 
        const hiddenMenu = document.getElementById("hiddenMenu");
        const burgerWidth = document.getElementById("burgerButton").getBoundingClientRect().width;
        const menuButton = document.getElementById("menuButton").firstChild;
        const menuIcon = menuButton.firstChild;

        console.log(menuIcon);
        
        if(!hiddenMenu.style.visibility){
            hiddenMenu.style.display = "none";
        }

        if(hiddenMenu.style.visibility === "visible" || hiddenMenu.style.display !== "none"){
            hiddenMenu.style.visibility = "hidden";
            hiddenMenu.style.display = "none";

            menuIcon.style.color = "black";
            menuButton.style.background = "white";
            
        } else {
            hiddenMenu.style.visibility = "visible";
            hiddenMenu.style.display = "inline-block";
            hiddenMenu.style.left = burgerWidth + "px";

            menuIcon.style.color = "white";

           // menuButton.style.background = "black";
            menuButton.style.background = "rgba(60, 60, 60, .7) ";

        }
        //this.props.history.push('/main');
    }
        




    

    render(){

        return(
            <div id="header">
                
                <div id="menuWrapper" className="showIfLoggedin">
                    <div className="headerButton" id="homeButton" >
                        <a onClick={() => this.props.history.push('/chapter/1')}>
                            <i className="fa fa-home"></i>
                        </a>
                    </div>
                    <div  id="menuButton" >
                        <a className="headerButton" onClick={(e) => this.menuClick(e)}>
                            <i id="burgerButton" className="fa fa-bars"></i>
                        </a>

                        <div id="hiddenMenu" className="headerButton ">
                            <div className="hiddenMenuItem">
                                <a>Account</a>
                            </div>
                            <div className="hiddenMenuItem">
                                
                                <a onClick={() => this.logout()}>Log Out</a>
                            </div>
                        </div>

                    </div>
                </div>
                
                


                
                {!this.context.loggedIn && <Redirect  to="/auth" />}
            </div>
        );
    }



}

export default withRouter(Header);