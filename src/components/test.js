import React from 'react';
import MyContext from '../context/myContext';
import {Redirect} from "react-router-dom";

class Test extends React.Component {
    constructor (props) {
        super(props);
        this.state = {

        };

    }

    static contextType = MyContext;

    render(){
        console.log(this.context.loggedIn);

        return(
            <div id="test">
                {this.context.loggedIn && <Redirect from="/test" to="/" />} 
                <h2>Test</h2>
                <button onClick={() => this.context.changeLogin(true)} >login</button>

                <h3>{this.context.loggedIn}</h3>
            </div>
        );
    }



}

export default Test;