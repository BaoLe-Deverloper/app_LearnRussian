import React, { Component } from "react";
import { Container, Card, CardBody, Row, Col } from "shards-react";
import { Link } from "react-router-dom";
import PageTitle from "./../components/common/PageTitle";
import { config } from "./../config";
import axios from "axios";
import UserInfo from "../components/Info/UserInfo";
// import NewDraft from "../components/Info/NewDraft";
import Discussions from "../components/Info/Discussions";
// import TopReferrals from "./../components/common/TopReferrals";

class TeacherDashBoard extends Component {
  constructor(){
    super();
    this.state ={
      _manaStudent: null
    }
    }
  componentWillMount = ()=>{
    
    const _mana = JSON.parse(sessionStorage.getItem("_manageStudents"));
        if(!_mana){
            const  token =  localStorage.getItem("accessToken"); 
            if (token) {
              axios(config.UrlServerBase + "user/getStudents", {
                  headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                    'Authorization': "Bearer " + token
                  
                }}).then(resp => {
                  if(!resp.data.message){
                    sessionStorage.setItem("_manageStudents",JSON.stringify(resp.data));
                    this.setState({_manaStudent:resp.data})
                  }
                })
            }
        }
       else{
        this.setState({_manaStudent:_mana})
    }
  }
  render() {
    return (<Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle title="Dashboard" className="text-sm-left mb-3" />
      </Row>

      <Row>
        <Col className="col-lg mb-4" >
          <Link to={{ pathname: "/media", state: { data: "test" } }} >
            <Card style={{ background: "linear-gradient(to top left, #FAECD5, #CAE4D8)" }} small className="stats-small">
              <CardBody className="p-0 d-flex">
                <div className="flex-column m-auto text-center">

                  <h5 className=" text-uppercase">Testing</h5>
                 

                </div>
              </CardBody>
            </Card>
          </Link>
        </Col>
        <Col className="col-lg mb-4" >
          <Link to={{ pathname: "/media", state: { data: "youtube" } }} >
            <Card style={{ background: "linear-gradient(to top left, powderblue, pink)" }} small className="stats-small">
              <CardBody className="p-0 d-flex">
                <div className="flex-column m-auto text-center">

                  <h5 className=" text-uppercase">Video Test</h5>
               

                </div>
              </CardBody>
            </Card>
          </Link>
        </Col>
        <Col className="col-lg mb-4" >
          <Link to={{ pathname: "/media", state: { data: "mp4_or_mp3" } }} >
            <Card style={{ background: "linear-gradient(to top left, #FAECD5, #CAE4D8)" }} small className="stats-small">
              <CardBody className="p-0 d-flex">
                <div className="flex-column m-auto text-center">

                  <h5 className=" text-uppercase">mp4_or_mp3</h5>
                  

                </div>
              </CardBody>
            </Card>
          </Link>
        </Col>
      </Row>


      <Row>
        {/* Users Overview */}
        <Col lg="8" md="12" sm="12" className="mb-4">
          <Discussions students = {this.state._manaStudent}/>
        </Col>

        {/* Users by Device */}
        <Col lg="4" md="6" sm="12" className="mb-4">
          <UserInfo />
        </Col>

        {/* New Draft */}
        {/* <Col lg="4" md="6" sm="12" className="mb-4">
          <NewDraft />
        </Col> */}

        {/* Discussions */}
        {/* <Col lg="5" md="12" sm="12" className="mb-4">
          <NewDraft />
        </Col> */}

        {/* Top Referrals */}
        {/* <Col lg="3" md="12" sm="12" className="mb-4">
          <TopReferrals />
        </Col> */}
      </Row>
    </Container>
    );

  }
}



export default TeacherDashBoard;
