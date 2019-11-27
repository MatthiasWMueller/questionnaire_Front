import React from 'react';
import Question from './question';
import ProgressBar from './progressBar';

import MyContext from '../context/myContext';
import { Redirect,  withRouter, Route} from "react-router-dom";
import {getHeaders, getQuestions_gql } from '../gql_requestBodies';

import '../css/chapter.css';
import '../css/global.css';
const config = require('../config.json');

class Chapter extends React.Component {
    constructor (props) {
        super(props);
        
        this.state = {
            chapterNr: this.props.nr,
            questions: [],
            getNewScore: false

        };
        this.updateScore = this.updateScore.bind(this);
        this.clickResult = this.clickResult.bind(this);
        

    }
    static contextType = MyContext;


    async componentDidUpdate(prevProps, prevState) {
        if(this.state.chapterNr !== 0 || this.state.chapterNr !== prevState.chapterNr){
            try {


                if(this.props.nr !== prevProps.nr ){
                    const requestBody = getQuestions_gql(parseInt(this.props.nr), this.context.userID);
                    const headers = getHeaders(this.context.token);
                    const result =  await fetch(config.apiURL, {
                        method: 'POST',
                        body: JSON.stringify(requestBody),
                        headers: headers
                    });
                    const y = await result.json();
                    const q = await y.data.questions;
                    if(q){
                    this.setState({
                        chapterNr: parseInt(this.props.nr),
                        questions: q
                    });
                    } else {
                        console.log("questions empty");
                    }
                }
                
              } catch (error) {
                console.log("error z.52");
              }
        } else {
            console.log("chapter is 0");
        }
        

      }

    

      updateScore = async () => {
        await this.props.updateScoreMain();
    }



    async componentDidMount() {

   

        try {
            const requestBody = getQuestions_gql(this.state.chapterNr, this.context.userID);
            const headers = getHeaders(this.context.token);
            const result =  await fetch(config.apiURL, {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: headers
              });
            const y = await result.json();
            const q = await y.data.questions;

            this.setState(prevState => ({
                questions: q,
              }));
          } catch (error) {}

    }


    clickResult = () => {
        const chapterCard = document.getElementsByClassName("chapter");
            if(chapterCard.length > 0){
                if(!chapterCard[0].classList.contains("cardDissapear")){
                    chapterCard[0].classList.add("cardDissapear");
                } 
            }
        setTimeout( () => {
            
            this.props.history.push("/results/" + parseInt(this.state.chapterNr));
        }, 500);  
    }

    



    render(){
        let counter = 0;
        let questions;
        if(this.state.questions.length > 0){
            questions = this.state.questions.map(question => {
                return <Question 
                chapter={this.state.chapterNr} 
                id={question.id} 
                key={question.id} 
                left={question.left} 
                right={question.right}
                value={question.value} 
                updateScore={this.updateScore}
                />
                
            })
        }

   
        let backButton;
        //console.log("chapterNR: " + this.state.chapterNr);
        if(parseInt(this.state.chapterNr) !== 1){
            
            backButton = <button className="chapterButton backButton" 
                            onClick={() => this.props.history.push("/chapter/" + (parseInt(this.state.chapterNr) - 1))}>
                            <span>Zurück</span></button>;  
        } else {
            backButton = <button className="chapterButton backButton"
                            onClick={() => this.props.history.push("/main")}>
                            <span>Zurück</span></button>;  
        }
        let nextButton;
        if(this.state.chapterNr < 6){
            nextButton = <button className="chapterButton nextButton" 
                            onClick={() => this.props.history.push("/chapter/" + (parseInt(this.state.chapterNr) + 1))}>
                                <span>Weiter</span></button> 
        } else {
            nextButton = <button className="chapterButton nextButton"
                            onClick={() => this.props.history.push("/main")}><span>Weiter</span></button>;  
        }
         


        let content;
            if(!this.state.chapterNr == 0){
                content = 
                <div className="myCard" >
                    <div className="myCardHeader">
                        <b>chapter {this.state.chapterNr}</b>
                    </div>
    
                    <ProgressBar />
                    <div>
                        {questions} 
                    </div>  
                    <div id="chapterButtonsContainer">
                        {backButton}
                        <a className="headerButton resultButton" 
                            onClick={() => this.clickResult()}>
                            <i id="burgerButton" className="fa fa-bar-chart"></i>
                        </a>
                        {nextButton} 
                    </div>
                </div> ;
            } else {
                content = "";
            }
        

        
        

        return(
            <div className="chapter ">
                {content}           
            </div>
        );
    }
    


}

export default withRouter(Chapter);




