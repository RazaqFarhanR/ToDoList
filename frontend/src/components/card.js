import React from "react";
import { MdDeleteForever } from "react-icons/md";

export default class Card extends React.Component{
    render(){
        return(
            <div className="container">
                <div className="list-group-item alert bg-dark text-warning">
                    <div className="row">
                        <div className="col">
                                {this.props.catatan}
                        </div>
                        <div className="col"><MdDeleteForever/> </div>
                    </div>
                </div>
            </div>
            
        )
    }
}