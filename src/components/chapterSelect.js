import React from 'react';

import MyContext from '../context/myContext';
import {withRouter } from "react-router-dom";

import ChapterListEntry from './chapterListEntry';
import MyButton from './myButton';


import '../css/global.css';


class ChapterSelect extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            chapterHover: null
        };
        this.mouseIn = this.mouseIn.bind(this);
        this.mouseOut = this.mouseOut.bind(this);
        this.mouseOverChapter = this.mouseOverChapter.bind(this);
        this.mouseLeaveChapter = this.mouseLeaveChapter.bind(this);
        this.cardEnterHover = this.cardEnterHover.bind(this);
        this.cardLeaveHover = this.cardLeaveHover.bind(this);
        

    }
    static contextType = MyContext;



    componentDidUpdate(prevProps, prevState) {
        try {
            const markedChapter = document.getElementById("item" + this.state.chapterHover);
            if(markedChapter){
                markedChapter.classList.add("markedChapter");
            }
              
           const gridFlash = document.getElementById("gridFlash");
                if(gridFlash){
                    if(!gridFlash.classList.contains("gridCenterFlash")){
          //              gridFlash.classList.add("gridCenterFlash");
                        setTimeout(function(){ gridFlash.classList.remove("gridCenterFlash"); }, 100);
                    }
                    
                }     
            if(this.state.chapterHover !== prevState.chapterHover){
                const unMarkedChapter = document.getElementById("item" + prevState.chapterHover);
                unMarkedChapter.classList.remove("markedChapter");

                
            }
            
            
          } catch (error) {
            console.log("error z.52");
          }

    }

    mouseIn = () => {
        const gridCenter = document.getElementsByClassName("gridCenter");
        
        console.log("add");
        gridCenter[0].style.visibility = "visible";
        //gridCenter[0].style.height = "auto";
        gridCenter[0].style.animation = "showCenter 0.3s both";
    
        
    }
    mouseOut = () => {
        const gridCenter = document.getElementsByClassName("gridCenter")[0];
        gridCenter.style.animation = "hideCenter 0.7s both";
        const markedChapter = document.getElementById("item" + this.state.chapterHover);
        markedChapter.classList.remove("markedChapter");

    }
    mouseOverChapter = (number) => {

        const gridFlash = document.getElementById("gridFlash");
                if(gridFlash){
                        gridFlash.classList.remove("gridCenterFlash");
                }
        if(number !== this.state.chapterHover){

            console.log("chapterSelect setState");

            this.setState({
                chapterHover: number
            });           
        }
           
        
        
    }

    mouseLeaveChapter = (number) => {

            const gridFlash = document.getElementById("gridFlash");
                if(gridFlash){
                        gridFlash.classList.remove("gridCenterFlash");                 
                }   
    }

    cardEnterHover = () => {
        const card = document.getElementById("chapterSelect");
        card.style.boxShadow  = "0 12px 20px 0 rgba(0,0,0,0.2)";

     }
     cardLeaveHover = () => {
        const card = document.getElementById("chapterSelect");
        card.style.boxShadow  = "0 4px 8px 0 rgba(0,0,0,0.2)";

    }
    
    
    

    

    render(){

        

        return(
            <div id="chapterSelect" className="myCard"
            onMouseEnter={() => {this.cardEnterHover()}}
            onMouseLeave={() => {this.cardLeaveHover()}}
            >
                <div className="myCardHeader">
                    <b>Chapters</b>
                </div>
                <div className="myCaedBody " id="chapterGrid" 
                    onMouseEnter={() => {this.mouseIn()}} 
                    onMouseLeave={() => {this.mouseOut()}}>

                    <div onMouseEnter={() => {this.mouseOverChapter(1)}} id="item1"
                         onMouseLeave={() => {this.mouseLeaveChapter(1)}}>
                        <ChapterListEntry chapter={1} className="item1" icon="book"/>
                    </div>
                    <div onMouseEnter={() => {this.mouseOverChapter(2)}} id="item2"
                         onMouseLeave={() => {this.mouseLeaveChapter(2)}}>
                        <ChapterListEntry chapter={2} className="item2" icon="dribbble"/>  
                    </div>
                    <div onMouseEnter={() => {this.mouseOverChapter(3)}} id="item3"
                          onMouseLeave={() => {this.mouseLeaveChapter(3)}}>
                        <ChapterListEntry chapter={3} className="item3" icon="picture-o"/>  
                    </div>

                    <div className="gridCenter">
                        <div id="gridFlash">
                            <MyButton id="leButton" kind="chapter" linkTo={this.state.chapterHover} />
                            <div className="circle"><div>{this.state.chapterHover}</div></div>
                            <MyButton id="" kind="result" linkTo={this.state.chapterHover} />
                        </div>
                        
                    </div>

                    <div onMouseEnter={() => {this.mouseOverChapter(4)}} id="item4">
                    <ChapterListEntry chapter={4} className="item4" icon="adjust"/>
                    </div>
                    <div onMouseEnter={() => {this.mouseOverChapter(5)}} id="item5">
                    <ChapterListEntry chapter={5} className="item5" icon="graduation-cap"/>   
                    </div>
                    <div onMouseEnter={() => {this.mouseOverChapter(6)}} id="item6">
                    <ChapterListEntry chapter={6} className="item6" icon="comments"/>  
                    </div>
                </div>


                

            </div>
        );
    }



}

export default withRouter(ChapterSelect);