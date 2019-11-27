import React from 'react';
import MyContext from './myContext';


class GlobalState extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            loggedIn: false,
            isAdmin: true,
            token: null,
            userID: null,
            answered: 0,
            unanswered: 0 
        };
    }

    changeLogin = (param) => {
        this.setState({
            loggedIn: param
        })
    }

    setAuth = (id, token) => {
        this.setState({
          userID: id,
          token: token
        });
        
      }

    setProgress =  (answered, unanswered) => {
        //console.log("answered:" + answered + "  unanswered: " + unanswered);   
         this.setState({
            answered: answered,
            unanswered: unanswered
          });
        
    }

    getPercentage = () => {
        if(this.state.answered !== 0){
            const onepercent = (this.state.unanswered + this.state.answered) / 100;
            return parseInt(this.state.answered / onepercent);
        } else {
            return 0;
        }
        
    }

    
    



    render(){

        return(
            <div>
                <MyContext.Provider value={
                    {
                    loggedIn: this.state.loggedIn,
                    isAdmin: this.state.isAdmin,
                    token: this.state.token,
                    userID: this.state.userID,
                    answered: this.state.answered,
                    unanswered: this.state.unanswered,

                    changeLogin: this.changeLogin,
                    setToken: this.setToken,
                    setAuth: this.setAuth,
                    setProgress: this.setProgress,
                    getPercentage: this.getPercentage,
   

                    }
                }>
                {this.props.children}
                </MyContext.Provider>
            </div>
        );
    }
}


export default GlobalState;