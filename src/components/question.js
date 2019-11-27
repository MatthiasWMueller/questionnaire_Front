import React from 'react';
import MyContext from '../context/myContext';
import {   withRouter} from "react-router-dom";
import { saveAnswer } from '../gql_requestBodies';

import '../css/question.css';
import '../css/global.css';

class Question extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            nr: this.props.nr,
            chapter: this.props.chapter,
            currentValue: this.props.value,     
            leftText: props.left,
            rightText: props.right,
            isNew: this.props.isNew,
        };



    }
    static contextType = MyContext;


    async componentDidUpdate(prevProps, prevState) {

        console.log("question updated,    value: "+ this.state.currentValue);

        if(this.state.currentValue !== prevState.currentValue){
            //console.log("Question currentValue:  " + this.state.currentValue);
            await this.props.updateScore();
        }
      }


    

    async setValue(v) {
        // send to api 
        await saveAnswer(this.props.id, this.context.userID, v, this.context.token, this.state.chapter);
        if(this.state.currentValue === 0){
            if(v !== 0){
                this.context.setProgress(this.context.answered + 1, this.context.unanswered - 1);
            }
        } else {
            if(v === 0){
                this.context.setProgress(this.context.answered - 1, this.context.unanswered + 1);
            }
        }
        this.setState({
            currentValue: v
        });
    }

    
    isChecked = (num) => {
        if(num === this.state.currentValue){
            return true;
        } else {
            return false;
        } 
    }





    render(){
        return(
            <div className="question" id={"question" + this.state.nr}>
                <div className="questionText">
                    <span>{this.state.leftText}</span>
                </div>
                <div className="choiceArea">
                    <div className="oneToFour">
                        <label className="oneToFour">
                            <input type="checkbox" value="1" name="check" onChange={() => this.setValue(1)}  checked={this.isChecked(1)} />
                            <span className="boxLabel" ></span>
                        </label>
                        <label className="oneToFour">
                            <input type="checkbox" value="2" name="check" onChange={() => this.setValue(2)}  checked={this.isChecked(2)} />
                            <span className="boxLabel"></span>
                        </label>
                        <label className="oneToFour">
                            <input type="checkbox" value="3" name="check" onChange={() => this.setValue(3)}  checked={this.isChecked(3)} />
                            <span className="boxLabel"></span>
                        </label>
                        <label className="oneToFour">
                            <input type="checkbox" value="4" name="check" onChange={() => this.setValue(4)}  checked={this.isChecked(4)} />
                            <span className="boxLabel"></span>
                        </label >
                    </div>
                    <div className="noAnswer">
                        <label >
                            <input type="checkbox" value="0" name="check"  
                            onChange={() => this.setValue(0)} checked={this.isChecked(0)} />
                            <span className="noAnswerLabel"></span>
                        </label >
                    </div>
                </div>
                <div className="questionText">
                    <span>{this.state.rightText}</span>
                </div>

                
            </div>
        );
    }
    


}

Question.defaultProps = {
    isNew: false,
 
}

export default withRouter(Question);
