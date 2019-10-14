import React, { Component } from "react";
import {
  Row,
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from "shards-react";

import {connect} from "react-redux";

class userInfo extends Component {
  render() {
    const currentUser = this.props.user.currentUser;
    return (
      <Card small className="h-100">
        <CardHeader className="border-bottom text-center">
          <div className="mb-3 mx-auto">
            <img
              className="rounded-circle"
              src={currentUser.urlAvatar?currentUser.urlAvatar: require("./../../images/avatars/userAvatar.png")}
              alt="avatar"
              width="110"
              style={{ width: "110px" }} 
            />
          </div>
          <h4 className="mb-0">{currentUser.name}</h4>
        </CardHeader>
        <CardBody className=" py-0">
           <h6 className="text-left"><b>Email: </b> {currentUser.email} </h6>
           <h6 className="text-left"><b>Date Create: </b>{new Date(currentUser.date_create).toString()} </h6>
           {currentUser.lever? <h6 className="text-left"><b>Lever: </b> {currentUser.lever} </h6>:""}
        </CardBody>
        <CardFooter className="border-top">
          <Row>

          </Row>
        </CardFooter>
      </Card>
    )
  }
}
const mapStateToProps = state =>({
  user:state.user
})
export default connect(mapStateToProps, null)(userInfo);