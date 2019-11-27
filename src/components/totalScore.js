import React from 'react';

import MyContext from '../context/myContext';
import { } from "react-router-dom";


import '../css/totalScore.css';
import '../css/global.css';

class TotalScore extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            score: this.props.score,

        };
   


    }
    static contextType = MyContext;

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.score !== this.props.score) {
            this.setState({
                score: this.props.score,
            })
        }
    }

    render(){

        let stars;
        switch (true) {
            case (this.state.score < 0.3):
                stars = <div>
                        <i className="fa fa-star-o"></i><i className="fa fa-star-o"></i>
                        <i className="fa fa-star-o"></i><i className="fa fa-star-o"></i>
                        </div>;
                break;
            case (this.state.score >= 0.3 && this.state.score < 0.8):
                stars = <div>
                            <i className="fa fa-star-half-o"></i><i className="fa fa-star-o"></i>
                            <i className="fa fa-star-o"></i><i className="fa fa-star-o"></i>
                        </div>;
                break;
            case (this.state.score >= 0.8 && this.state.score < 1.3):
                stars = <div>
                            <i className="fa fa-star"></i><i className="fa fa-star-o"></i>
                            <i className="fa fa-star-o"></i><i className="fa fa-star-o"></i>
                        </div>;
                break;
            case (this.state.score >= 1.3 && this.state.score >= 1.8):
                stars = <div>
                            <i className="fa fa-star"></i><i className="fa fa-star-half-o"></i>
                            <i className="fa fa-star-o"></i><i className="fa fa-star-o"></i>
                        </div>;
                break;
            case (this.state.score > 1.8 && this.state.score < 2.3):
                stars =  <div>
                            <i className="fa fa-star"></i><i className="fa fa-star"></i>
                            <i className="fa fa-star-o"></i><i className="fa fa-star-o"></i>
                        </div>;
                break;   
            case (this.state.score >= 2.3 && this.state.score < 2.8):
                stars = <div>
                            <i className="fa fa-star"></i><i className="fa fa-star"></i>
                            <i className="fa fa-star-half-o"></i><i className="fa fa-star-o"></i>
                        </div>;
                break;   
            case (this.state.score >= 2.8 && this.state.score < 3.3):
                stars = <div>
                            <i className="fa fa-star"></i><i className="fa fa-star"></i>
                            <i className="fa fa-star"></i><i className="fa fa-star-o"></i>
                        </div>
                break; 
            case (this.state.score >= 3.3 && this.state.score < 3.8):
                stars = <div>
                            <i className="fa fa-star"></i><i className="fa fa-star"></i>
                            <i className="fa fa-star"></i><i className="fa fa-star-half-o"></i>
                        </div>;
                break; 
            case (this.state.score >= 3.8):
                stars = <div>
                            <i className="fa fa-star"></i><i className="fa fa-star"></i>
                            <i className="fa fa-star"></i><i className="fa fa-star"></i>
                        </div>
                break; 
            default:
              console.log("default");
          }

        return(
            <div id="totalScore" className="myCard">
                <div className="myCardHeader">
                    <b>Industrialisierungsgrad</b>
                </div>
                <div className="myCaedBody">
                    <h3>{this.state.score} / 4</h3>
                    <div id="stars">
                        {stars}
                    </div>
                    

                </div>
                
            </div>
        );
    }



}

export default TotalScore;