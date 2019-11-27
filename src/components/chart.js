import React from 'react';

import MyContext from '../context/myContext';
import { } from "react-router-dom";
import { Radar } from 'react-chartjs-2';


import '../css/chart.css';
import '../css/global.css';

class Chart extends React.Component {
    constructor (props) {
        super(props);
        this.state = {

        };
        this.cardEnterHover = this.cardEnterHover.bind(this);
        this.cardLeaveHover = this.cardLeaveHover.bind(this);
        this.pinClick = this.pinClick.bind(this);
        


    }
    static contextType = MyContext;


    componentDidUpdate(prevProps, prevState) {
        const score = document.getElementById("score");
        score.innerHTML = this.props.score + " / 4";
        console.log("SCORE: " + this.props.score);
        /*

        if (prevState.score !== this.props.score) {
           // console.log("chart setState");
            this.setState({
                score: this.props.score,
            })
        }
        */
    }


    componentDidMount() {
        const canvas = document.getElementsByClassName("chartjs-render-monitor")[0];
        const chart = document.getElementById("chart");
        chart.style.height = canvas.style.height;
        chart.style.width = canvas.style.width;
        chart.style.padding = "20px 20px 20px 0px";

    }

    
    cardEnterHover = () => {
        const card = document.getElementById("leftCard");
        card.style.boxShadow  = "0 12px 20px 0 rgba(0,0,0,0.2)";
        card.style.maxHeight  =  "450px";
        card.style.transition  = "max-height 0.25s ease-in";
        const arrowDown = document.getElementById("arrowDown");
        arrowDown.style.display  =  "none";
        


     }
     cardLeaveHover = () => {
        const pinButton = document.getElementById("pinButton");
        if(!pinButton.classList.contains("pinDown")){
            const card = document.getElementById("leftCard");
            card.style.boxShadow  = "0 4px 8px 0 rgba(0,0,0,0.2)";
            card.style.overflow  = "hidden";
            card.style.maxHeight  =  "194px";
            card.style.transition  = "max-height 0.25s ease-in";
            const arrowDown = document.getElementById("arrowDown");
            arrowDown.style.display  =  "block";
        }
        
      
    }


    pinClick = () => {
        const pinButton = document.getElementById("pinButton");
        if(pinButton.classList.contains("pinDown")){
            pinButton.classList.remove("pinDown");
        } else {
            pinButton.classList.add("pinDown");
        }
    }


    render(){
        let stars;
        switch (true) {
            case (this.props.score < 0.3):
                stars = <div>
                        <i className="fa fa-star-o"></i><i className="fa fa-star-o"></i>
                        <i className="fa fa-star-o"></i><i className="fa fa-star-o"></i>
                        </div>;
                break;
            case (this.props.score >= 0.3 && this.props.score < 0.8):
                stars = <div>
                            <i className="fa fa-star-half-o"></i><i className="fa fa-star-o"></i>
                            <i className="fa fa-star-o"></i><i className="fa fa-star-o"></i>
                        </div>;
                break;
            case (this.props.score >= 0.8 && this.props.score < 1.3):
                stars = <div>
                            <i className="fa fa-star"></i><i className="fa fa-star-o"></i>
                            <i className="fa fa-star-o"></i><i className="fa fa-star-o"></i>
                        </div>;
                break;
            case (this.props.score >= 1.3 && this.props.score <= 1.8):
                stars = <div>
                            <i className="fa fa-star"></i><i className="fa fa-star-half-o"></i>
                            <i className="fa fa-star-o"></i><i className="fa fa-star-o"></i>
                        </div>;
                break;
            case (this.props.score > 1.8 && this.props.score < 2.3):
                stars =  <div>
                            <i className="fa fa-star"></i><i className="fa fa-star"></i>
                            <i className="fa fa-star-o"></i><i className="fa fa-star-o"></i>
                        </div>;
                break;   
            case (this.props.score >= 2.3 && this.props.score < 2.8):
                stars = <div>
                            <i className="fa fa-star"></i><i className="fa fa-star"></i>
                            <i className="fa fa-star-half-o"></i><i className="fa fa-star-o"></i>
                        </div>;
                break;   
            case (this.props.score >= 2.8 && this.props.score < 3.3):
                stars = <div>
                            <i className="fa fa-star"></i><i className="fa fa-star"></i>
                            <i className="fa fa-star"></i><i className="fa fa-star-o"></i>
                        </div>
                break; 
            case (this.props.score >= 3.3 && this.props.score < 3.8):
                stars = <div>
                            <i className="fa fa-star"></i><i className="fa fa-star"></i>
                            <i className="fa fa-star"></i><i className="fa fa-star-half-o"></i>
                        </div>;
                break; 
            case (this.props.score >= 3.8):
                stars = <div>
                            <i className="fa fa-star"></i><i className="fa fa-star"></i>
                            <i className="fa fa-star"></i><i className="fa fa-star"></i>
                        </div>;
                break; 
            default:
                stars = <div>
                    <i className="fa fa-star-o"></i><i className="fa fa-star-o"></i>
                    <i className="fa fa-star-o"></i><i className="fa fa-star-o"></i>
                </div>
              console.log("default");
          }

        const data = {
            labels: ['1', '2', '3', '4', '5', '6'],
            datasets: [{
                data: this.props.averages
            }]
        };
        const options = {
            legend: {
                display: false
            },
            title: {
              display: false
            },
            scale: {
              reverse: false,
              gridLines: {
                color: 'black'
              },
              ticks: {
                beginAtZero: true
              },
              responsive:true,
              maintainAspectRatio: false
            }
          }

        


        const myRadarChart = <Radar data={data} height={250} width={250} options={options}/>;
        

        return(
            <div  className="myCard" id="leftCard"
            onMouseEnter={() => this.cardEnterHover()}
            onMouseLeave={() => this.cardLeaveHover()}
            >
                <div className="myCardHeader">
                    <b>Evaluation</b>
                </div>
                <div className="myCaedBody" id="containerPinButton">

                    

                    <h2 id="score">{this.props.score} / 4</h2>
                    <div id="stars">
                        {stars}
                    </div>
                    <div id="arrowDown">
                        <i className="fa fa-chevron-down"></i>
                    </div>
                    <div id="chart">
                        {myRadarChart}
                    </div>
                    <div id="pinButton" onClick={() => this.pinClick()}>
                        <i className="fa fa-thumb-tack"></i>
                    </div>
                    

                </div>
                
                
            </div>
        );
    }
    


}

export default Chart;