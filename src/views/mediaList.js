import React from "react";
import { Redirect } from "react-router-dom";
import { Container, Card, CardBody, Row, Col ,Button,CardFooter,ListGroupItem,ListGroup} from "shards-react";
import PageTitle from "./../components/common/PageTitle";

import axios from "axios";
import {config} from "./../config";

import SweetAlert from 'react-bootstrap-sweetalert';
 class mediaList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            listTest:[],
            token :localStorage.getItem("accessToken"),
            idTest:"",
            showAlert:false,
            _id:"",
            id_view:"",
            type:""
        }
    }
    componentWillMount(){
        this.loadData();
    }
    loadData = ()=>{
        const { token } = this.state;
        const type = this.props.location.state ? this.props.location.state.data : "";
        if (token) {
            axios(config.UrlServerBase + "exam/" + type, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                    'Authorization': "Bearer " + token

                }
            }).then(resp => {
                if (!resp.data.message)
                    this.setState({ listTest: resp.data ,type});
            })
        }
    }
    View = id=>{
        this.setState({idTest:id});

    }
    deleteTest =()=>{
        const { _id, token} = this.state;
       
        if (token) {
            axios(config.UrlServerBase + "test", {
                method: "DELETE",
                data: { id: _id },
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                    'Authorization': "Bearer " + token
                }
            }).then(resp => {
                if (!resp.data.err){
                    this.loadData();
                    this.setState({ showSuccess: true, showAlert: false });
                }
                    
            });
        }
    }
    render() {
   console.log(this.state)
       if(this.state.id_view){
           if (this.state.type === "test")
              return <Redirect to={{ pathname: '/add-test', state: { id: this.state.id_view } }} />;
           else
               return <Redirect to={{ pathname: '/add-video', state: { id: this.state.id_view } }} />; 
       }
          
       if(this.state.idTest)
           return <Redirect to={{pathname:"/send", state :{id:this.state.idTest}}}/>
        return (
            <Container fluid className="main-content-container px-4">
                <Row noGutters className="page-header py-4">
                    <PageTitle title="Media List" className="text-sm-left mb-3" />
                </Row>
                {
                    this.state.showAlert && <SweetAlert
                        info
                        showCancel
                        confirmBtnText="удалить"
                        confirmBtnBsStyle="danger"
                        cancelBtnBsStyle="default"
                        title="Ты уверен?"
                        onConfirm={this.deleteTest}
                        onCancel={() => this.setState({ showAlert: false })}
                    >
                       Вы хотите удалить этот тест?
                 </SweetAlert>
                }
                {
                    this.state.showSuccess && <SweetAlert success title="Уведомление" onConfirm={()=>this.setState({showSuccess:false})}>
                         Операция выполнена успешно !
                       </SweetAlert>

                }
                <Row>
                    {this.state.listTest.map((test, idx) => (
                        <Col lg="4" key={idx} style={{marginTop:"10px"}}>
                                <Card small className="card-post h-100">
                                    <div
                                    className="card-post__image"
                                    style={{ backgroundImage: `url('${test.type==="test"? require("./../images/system/test.jpg"): require("./../images/system/media.jpg")}')` }}
                                    />
                                    <CardBody>
                                    <h5 className="card-title">
                                        <h3 className="text-fiord-blue">
                                        {test.title}
                                        </h3>
                                    </h5>
                                    <p className="card-text">{test.description}</p>
                                   
                                    <p>дата создания : <small className="text-muted">{new Date(test.date_create).toGMTString() }</small></p>
                                   
                                    </CardBody>
                                   <CardFooter>
                                   <ListGroup>
                                         <ListGroupItem className="d-flex px-3 border-0">
                                            <Button outline theme="accent" size="sm" onClick={() => this.setState({ id_view: test.id_link})}>
                                                <i className="material-icons">remove_red_eye</i> View
                                        </Button>
                                            <Button outline theme="warning" size="sm" onClick={() => { this.setState({ showAlert: true, _id: test.id_link})}} >
                                                <i className="material-icons">delete_forever</i> Delete
                                        </Button>
                                        <Button theme="accent" size="sm" className="ml-auto" onClick={()=>{this.View(test.id_link)}}>
                                            <i className="material-icons">send</i> Send
                                        </Button>
                                        </ListGroupItem>
                                    </ListGroup>
                                   </CardFooter>
                                </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    }
}
export default mediaList;