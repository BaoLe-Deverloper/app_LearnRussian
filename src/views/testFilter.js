import React, {Component} from 'react';

import { Link } from "react-router-dom";
import { Container, Card, CardBody, Row, Col, CardFooter,Badge, Collapse, Button, ListGroupItem, ListGroup, FormSelect,FormGroup } from "shards-react";
import PageTitle from "./../components/common/PageTitle";


import axios from "axios";
import { config } from "./../config";

class testFilter extends Component{
  constructor(){
    super();
    this.state={
      listTest:[],
      type:'all',
      lever:"all",
      collapse:false
    }
  }
  componentWillMount(){

    this.loadList();
  }
  componentWillUpdate(){
    this.loadList();
  }
  loadList = ()=>{
    
    const {type,lever} = this.state;
    const token  = localStorage.getItem("accessToken");
    if (token) {
      axios(config.UrlServerBase + "exam/getBy/" + lever+"&"+type, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
          'Authorization': "Bearer " + token

        }
      }).then(resp => {
        console.log(resp)
        if (!resp.data.message)
          this.setState({ listTest: resp.data });
      })
    }
  }
  toggle = ()=> {
    this.setState({ collapse: !this.state.collapse });
  }
  changeHandle = e=>{
    const target = e.target;
    this.setState({[target.name]:target.value});
  }
  Goto =id=>{

  }
  render(){
    console.log(this.state)
    return (
      <Container style={{ height:"790px" }} fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle title="Test List" className="text-sm-left mb-3" />
           

        </Row>
        <div>
          <Button onClick={this.toggle}> <i className="material-icons">filter_list</i> Filter</Button>
          <Collapse open={this.state.collapse}>
            <div className="p-3 mt-3 border rounded">
              <FormGroup>
                <label> Выберите тип теста</label>
                <FormSelect name="type" value={this.state.type} onChange={this.changeHandle}>
                  <option value="all">All </option>
                  <option value="test">Test</option>
                  <option value="mp4_or_mp3">Link Video Or Mp3</option>
                  <option value="youtube">Link Youtube</option>
                </FormSelect>
              </FormGroup>
              <FormGroup>
                <label>Выберите уровень</label>
                <FormSelect value={this.state.lever} name="lever" onChange={this.changeHandle} >
                  <option value="all">All Lever</option>
                  <option value="A1">Lever A1</option>
                  <option value="A2">Lever A2</option>
                  <option value="B1">Lever B1</option>
                  <option value="B2">Lever B2</option>
                  <option value="C1">Lever C1</option>
                  <option value="C2">Lever C2</option>
                  <option value="D1">Lever D1</option>
                  <option value="D2">Lever D2</option>
                </FormSelect>
              </FormGroup>
            </div>
          </Collapse>
        </div>
        <hr/>
        <Row>
          {this.state.listTest.map((test, idx) => (
            <Col lg="4" key={idx} style={{ marginTop: "10px" }}>
              <Card small className="card-post card-post--1 h-100">
                <div
                  className="card-post__image"
                  style={{ backgroundImage: `url('${test.type === "test" ? require("./../images/system/test.jpg") : require("./../images/system/media.jpg")}')` }}
                >
                   <Badge
                   theme="success"
                    pill
                    className={`card-post__category`}
                    
                  >
                    {"Lever - " +test.lever}
                  </Badge>
                </div>
                <CardBody>
                  <h5 className="card-title">
                   
                      {test.title}
                
                  </h5>
                  <p className="card-text">{test.description}</p>
                 
                  <p>дата создания : <small className="text-muted">{new Date(test.date_create).toGMTString()}</small></p>

                </CardBody>
                <CardFooter>
                  <ListGroup>
                    <ListGroupItem className="d-flex px-3 border-0">
                      <Link to={{ pathname: "/test", state: { id: test.id_link } }} >  <i className="material-icons">send</i> Go to Test </Link>
                    
                    </ListGroupItem>
                  </ListGroup>
                </CardFooter>
              </Card>
            </Col>
          ))}
        </Row>
        <br/>
      </Container>
    )
  }
}
export default testFilter;