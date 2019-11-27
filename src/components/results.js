import React from 'react';

import MyContext from '../context/myContext';
import {  withRouter} from "react-router-dom";
import '../css/results.css';
import '../css/global.css';

import { Doughnut, Bar } from 'react-chartjs-2';

import {getHeaders, getChapterStats_gql } from '../gql_requestBodies';
const config = require('../config.json');

class Result extends React.Component {
    constructor (props) {
        super(props);
        
        this.state = {
            chapterNr: this.props.nr,
            score: 0,
            answered: 0,
            unanswered: 0,
            values: []
        };



    }
    static contextType = MyContext;


    async componentDidUpdate(prevProps, prevState) {
        if(prevState.chapterNr !== this.props.nr){
            this.setState({
                chapterNr: this.props.nr,
            });
            try {
                const requestBody = getChapterStats_gql(this.context.userID, this.state.chapterNr - 1);
                const headers = getHeaders(this.context.token);
                const result =  await fetch(config.apiURL, {
                    method: 'POST',
                    body: JSON.stringify(requestBody),
                    headers: headers
                  });
                const jsonData = await result.json();
                const chapterScore = await jsonData.data.getStatsChapter.chapterScore;
                const valueCounts = await jsonData.data.getStatsChapter.valueCounts;
    
                let sum = 0;
                for(let i = 0; i < valueCounts.length; i++){
                    sum += valueCounts[i];
                }
                this.setState({
                    score: chapterScore,
                    answered: sum - valueCounts[0],
                    unanswered: valueCounts[0],
                    values: valueCounts
                });
              } catch (error) {}
        }
    }

    async componentDidMount() {
        try {
            const requestBody = getChapterStats_gql(this.context.userID, this.state.chapterNr - 1);
            const headers = getHeaders(this.context.token);
            const result =  await fetch(config.apiURL, {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: headers
              });
            const jsonData = await result.json();
            const chapterScore = await jsonData.data.getStatsChapter.chapterScore;
            const valueCounts = await jsonData.data.getStatsChapter.valueCounts;

            let sum = 0;
            for(let i = 0; i < valueCounts.length; i++){
                sum += valueCounts[i];
            }
            this.setState({
                score: chapterScore,
                answered: sum - valueCounts[0],
                unanswered: valueCounts[0],
                values: valueCounts
            });
          } catch (error) {}
    }


    clickQuestions = () => {
        const resultCard = document.getElementsByClassName("result");
            if(resultCard.length > 0){
                if(!resultCard[0].classList.contains("cardDissapear")){
                    resultCard[0].style.animationName = "dissappear";
                    resultCard[0].classList.add("cardDissapear");
                } 
            }
        setTimeout( () => {     
            this.props.history.push("/chapter/" + parseInt(this.state.chapterNr));
        }, 500);  
    }



    render(){

        let backButton;
        if(parseInt(this.state.chapterNr) !== 1){
            
            backButton = <button className="chapterButton backButton" 
                            onClick={() => this.props.history.push("/results/" + (parseInt(this.state.chapterNr) - 1))}>
                            <span>Back</span></button>;  
        } else {
            backButton = <button className="chapterButton backButton"
                            onClick={() => this.props.history.push("/results/6")}>
                            <span>Back</span></button>;  
        }
        let nextButton;
        if(this.state.chapterNr < 6){
            nextButton = <button className="chapterButton nextButton" 
                            onClick={() => this.props.history.push("/results/" + (parseInt(this.state.chapterNr) + 1))}>
                                <span>Next</span></button> 
        } else {
            nextButton = <button className="chapterButton nextButton"
                            onClick={() => this.props.history.push("/results/1")}><span>Next</span></button>;  
        }


        const data =  {
            labels: ["answered", "unanswered"],
            datasets: [
              {
                label: "",
                backgroundColor: ["#3e95cd", "#8e5ea2"],
                data: [this.state.answered, this.state.unanswered],
              }
            ]
          };
          const options =  {
            title: {
              display: true,
              text: ''
            }
          };

        const doughnutChart = <Doughnut data={data} height={200} width={200} options={options}/>;


        const dataBar =  {
            labels: ["0", "1", "2", "3", "4"],
            datasets: [
              {
                label: "",
                backgroundColor: ["#c45850", "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9"],
                data: this.state.values
              }
            ]
          };
        const optionsBar = {
            legend: { display: false },
            title: {
              display: false,
              text: ''
            },
            
        };
        const barChart = <Bar data={dataBar} height={200} width={200} options={optionsBar}/>;

        return(
            <div className="result myCard">
                <div className="myCardHeader" >
                <h3>Results of Chapter {this.state.chapterNr}</h3>

                </div>
                <div id="chartContainer" >
                    <div id="doughnut">
                        {doughnutChart} 
                    </div>
                    <div id="barCHart">
                        {barChart}
                    </div>
                </div>
                <div>
                    <h4>No recommendations availible...</h4>
                </div>
                <div id="chapterButtonsContainer">
                        {backButton}
                        <a className="headerButton resultButton" 
                            onClick={() => this.clickQuestions()}>
                            <i id="burgerButton" className="fa fa-question-circle"></i>
                        </a>
                        {nextButton} 
                    </div>
            </div>
        );
    }
    


}

export default withRouter(Result);