import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class EditPage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div id = 'iframe'>
                <Hightlight />
                <Iframe />
            </div>

        )
    }
}

export default NoteComponent;