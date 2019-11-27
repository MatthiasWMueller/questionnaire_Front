import React from 'react';

import MyContext from '../context/myContext';
import {  withRouter} from "react-router-dom";



import '../css/chapterListEntry.css';

class ChapterListEntry extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            chapter: this.props.chapter,
            last: this.props.last,

        };



    }
    
    static contextType = MyContext;

    toChapter = (param) => {
        //console.log("go to chapter " + param);
        this.props.history.push('/chapter/' + param);
    }
    toResults = (param) => {
        //console.log("go to chapter " + param);
        this.props.history.push('/results/' + param);
    }



    render(){



        return(
            <div className="">
                <div>
                    <div>
                        <i className={"chapterIcon fa fa-"+ this.props.icon}></i>
                    </div>
                    
                </div>
                
 
            </div>
        );
    }



}


ChapterListEntry.defaultProps = {
    last: false,
}


export default withRouter(ChapterListEntry);