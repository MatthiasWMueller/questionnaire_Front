import React from 'react';
import MyContext from '../context/myContext';
import {  withRouter} from "react-router-dom";


class MyButton extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            kind: this.props.kind,
            linkTo: this.props.linkTo,

        };
        this.redirectTo = this.redirectTo.bind(this);



    }
    
    static contextType = MyContext;


/*
    componentDidUpdate(prevProps, prevState) {
        try {
            if(this.props.linkTo !== prevProps.linkTo){
                this.setState({
                    linkTo: this.props.linkTo
                })
            }
            
            
          } catch (error) {
            console.log("error z.52");
          }

    }
*/

    redirectTo = () => {
        if(this.state.kind === "chapter"){
            this.props.history.push('/chapter/' + this.props.linkTo);
        } else {
            this.props.history.push('/results/' + this.props.linkTo);
        }
        
    }



    render(){

        let text;
        if(this.state.kind === "chapter"){
            text = "Bewerten";
        } else {
            text = "Ergebnis";
        }

        return(
            <div className="myButton">
                    <a onClick={() => this.redirectTo()}>{text}</a>
                    <span>{this.props.klunk}</span>
            </div>
        );
    }



}

MyButton.defaultProps = {
    kind: "chapter",
    linkTo: 1,
}



export default withRouter(MyButton);