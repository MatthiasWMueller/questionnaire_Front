import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect, withRouter} from "react-router-dom";
import Auth from './components/auth';
import Test from './components/test';
import Header from './components/header';
import Main from './components/main';
import Chapter from './components/chapter';
import Results from './components/results';
import GlobalContext from './context/globalContext';
import MyContext from './context/myContext';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';


class App extends React.Component {
  constructor (props) {
      super(props);
      this.state = {

      };

  }


  static contextType = MyContext;

  render(){



      return (
        <div className="App">
          <GlobalContext>
          
            <Router>
            
            <Header />

              <div id="everythingExceptHeader">
                <Switch>
                
                
                <Route exact  path="/auth" component={Auth}></Route>

                

                <Route exact 
                    path='/chapter/:nr'
                    render={(props) => <Main {...props} result={false}
                    />}
                  />

                <Route exact 
                    path='/results/:nr'
                    render={(props) => <Main {...props} result={true}
                    />}
                  />
                </Switch>
                <Redirect from="/" to="/auth" /> 
              </div>
              
              
              
              
            </Router>
          </GlobalContext>
          
          
        </div>
      );
  }

}
  


export default App;



