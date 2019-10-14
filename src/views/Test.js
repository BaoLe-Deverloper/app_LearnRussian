import React from "react";

// import axios from "axios";
// import {config} from "./../config";
import {connect} from "react-redux";
import VideoTest from "./mediaTest/videoTest";
import Test from "./mediaTest/Test";
import {testActions} from "./../Redux/Actions";


 class test extends React.Component {
    constructor(props){
        super(props);
       if(props.location.state)
          props._getTest(props.location.state.id)
        this.state = {
            answers:[]
        }
    }
   componentWillUnmount(){
      sessionStorage.removeItem("notifications") ;
   }
    render() {
        return (
          <div>
                {this.props.test && this.props.test.type !== "test" ? <VideoTest id={this.props.location.state.id} test={this.props.test} /> : <Test id={this.props.location.state.id} test={this.props.test}/> }
          </div>
             
        );
    }
}
const mapStateToProps = state=>({
    test:state.test.test
})
const mapDispatchToProps = dispatch=>({
    _getTest: id =>{dispatch(testActions.getTest(id))}
})
export default connect(mapStateToProps,mapDispatchToProps)(test);