import React, { Component } from "react";
import IndexNavBar from './../components/layout/IndexNavbar'
class layoutIndex extends Component{
    
    render(){
      const sectionStyle = {
        backgroundSize: "cover",
        backgroundImage: `url( ${require('./../images/system/bg.jpg')} )`,
        height: "1000px",
        width: "100%",
        position:"relative"
      };
        return  (
            <div style={sectionStyle} >
                  <IndexNavBar/>
                  {this.props.children}
            </div>
          );
    }
}  


export default layoutIndex;
