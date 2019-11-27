import React from 'react';

import MyContext from '../context/myContext';
import { } from "react-router-dom";

import '../css/progressBar.css';


class ProgressBar extends React.Component {
    constructor (props) {
        super(props);
        this.state = {

        };



    }
    static contextType = MyContext;

    componentDidUpdate(){
        const bar = document.getElementById("progressbar");
        bar.style.width = this.context.getPercentage() + "%";
        bar.firstChild.innerHTML = this.context.getPercentage() + "%";
    //    console.log(this.context.getPercentage());
    }
    
    componentDidMount () {
        const bar = document.getElementById("progressbar");
        bar.style.width = this.context.getPercentage() + "%";
        bar.firstChild.innerHTML = this.context.getPercentage() + "";
    //    console.log(this.context.getPercentage());
    }


    render(){

        const answered = this.context.answered;
        const unanswered = this.context.unanswered;
        return(


            <div id="progressContainer">
                <div id="progressbar" className="progressbar" ><span>{this.context.getPercentage()}</span></div>
            </div>
        );
    }
    


}

export default ProgressBar;