import React from 'react';
import MyContext from '../context/myContext';
import {  withRouter} from "react-router-dom";

import {getHeaders, getTotalStats_gql } from '../gql_requestBodies';

import ChapterSelect from './chapterSelect';
import Chart from './chart';
import Chapter from './chapter';
import Result from './results';

import '../css/main.css';
import '../css/global.css';
import Results from './results';
const config = require('../config.json');

class Main extends React.Component {
    constructor (props) {
        super(props);
        let x;
        if(typeof(this.props.match.params.nr) === 'undefined'){
            x = 1;      
        } else {
            x = this.props.match.params.nr;
        }
        this.state = {
            score : 5,
            averages: [],
            chapter: x,
            getNewScore: false
        };
        this.updateScoreMain = this.updateScoreMain.bind(this);
        
        

    }

    static contextType = MyContext;

    async componentDidUpdate(prevProps, prevState) {
        if(typeof(this.props.match.params.nr) !== 'undefined'){
            const requestBody = getTotalStats_gql(this.context.userID);
            try {

                    if(this.state.chapter !== this.props.match.params.nr){
                        const headers = getHeaders(this.context.token);
                        const result =  await fetch(config.apiURL, {
                            method: 'POST',
                            body: JSON.stringify(requestBody),
                            headers: headers
                            });
                        const jsonData = await result.json();
                        const totalAVG = await jsonData.data.getStatsTotal.totalAVG;
                        const chapterAVGs = await jsonData.data.getStatsTotal.chapterAVGs;
                        const progress = await jsonData.data.getStatsTotal.answerProg;
                        this.context.setProgress(progress[0], progress[1] - progress[0]);
                            this.setState({
                                score: totalAVG,
                                averages: chapterAVGs,
                                chapter: this.props.match.params.nr
                            }); 
                    }
              } catch (error) {
                console.log("error z.52");
              }
        } else {
            console.log("no params in url");
        }
        

      }



      async updateScoreMain () {
        const score = document.getElementById("score");
        score.innerHTML = '<i class="fa fa-spinner fa-pulse"></i>';
        setTimeout(async () => {
            const requestBody = getTotalStats_gql(this.context.userID);
            const headers = getHeaders(this.context.token);
            const result =  await fetch(config.apiURL, {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: headers
              });
            const jsonData = await result.json();
            const totalAVG = await jsonData.data.getStatsTotal.totalAVG;
            const chapterAVGs = await jsonData.data.getStatsTotal.chapterAVGs;
            const progress = await jsonData.data.getStatsTotal.answerProg;
            this.context.setProgress(progress[0], progress[1] - progress[0]);
    //        score.innerHTML = "x";
               this.setState({
                    score: totalAVG,
                    averages: chapterAVGs,
                }); 
        }, 1000);


              
    }
    


    async componentDidMount() {
        try {
            const requestBody = getTotalStats_gql(this.context.userID);

            const headers = getHeaders(this.context.token);
            const result =  await fetch(config.apiURL, {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: headers
              });
            const jsonData = await result.json();
            const totalAVG = await jsonData.data.getStatsTotal.totalAVG;
            const chapterAVGs = await jsonData.data.getStatsTotal.chapterAVGs;
            const progress = await jsonData.data.getStatsTotal.answerProg;
            this.context.setProgress(progress[0], progress[1] - progress[0]);
            //console.log(chapterAVGs);

            if(typeof(this.props.match.params.nr) === 'undefined'){
                this.setState(prevState => ({
                    score: totalAVG,
                    averages: chapterAVGs,
                  }));
            } else {
                this.setState(prevState => ({
                    score: totalAVG,
                    averages: chapterAVGs,
       
                  }));
            }
            
          } catch (error) {}




          
    }
// 

// 

    render(){
        console.log("result    " + this.props.result);
        let chapOrRes;
        if(this.props.result){
            chapOrRes = <Result nr={this.state.chapter} />;
        } else {
            chapOrRes = <Chapter nr={this.state.chapter} updateScoreMain={this.updateScoreMain}/>;
        }

        return(
            <div id="main">
                <div id="leftCol" className="">
                    <Chart score={this.state.score} averages={this.state.averages}/>
                </div >
                    {chapOrRes}
                <div>
                   <ChapterSelect /> 
                </div>
                

                
            </div>
        );
    }



}


export default withRouter(Main);