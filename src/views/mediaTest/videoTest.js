import React, {Component} from "react";
import { Container, Collapse, Alert, Row, Button, Col, ListGroupItem, ListGroup, Modal,ModalBody,ModalFooter ,ModalHeader, Badge } from "shards-react";
import { Scrollbars } from 'react-custom-scrollbars';
import YouTube from 'react-youtube';
import {Link} from "react-router-dom"
import { Player } from 'video-react';
import TimeDown from './TimeDown';
import SweetAlert from 'react-bootstrap-sweetalert';
import {connect} from 'react-redux';
import {testActions} from './../../Redux/Actions';
import tickImg from "./../../images/system/tick.jpg";
import failImg from "./../../images/system/Fail.png"
class videoTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answers: [],
            collapse: false,
            showAlert:false,
            open:false,
            start:false
          
        }
    }
    toggle  = () =>{
        this.setState({ collapse: !this.state.collapse,start:true });
    }
    answerHandle(id, e) {
        e.target.classList.toggle("badge-primary");
        e.target.classList.toggle("badge-danger");
        const number = parseInt(e.target.parentNode.id);
        const { answers } = this.state;
        var questionOld = answers.find(q => q.number === number);
        if (questionOld) {
            const index = questionOld.answers.find(q => q.id === id);
            if (!index)
                questionOld.answers.push({ id });
            else
                questionOld.answers = questionOld.answers.filter(q=>q.id!==id);
        } else
            answers.push({ number: number, answers: [{ id: id }] });

        this.setState({ answers });
        //clientAnswer , id
    }

    stop=()=>{
        this.onConfirm();
    }
    onConfirm=()=>{
        
        const test = { id: this.props.id, clientAnswers: this.state.answers };
        console.log(test)
        this.props._checkTest(test);
        this.setState({ showAlert: false });
    }
    toggleResult=()=>{
        this.setState({open:false});
    }
    componentWillUnmount = () => {
        if (this.props.response)
            this.props._resetResult();
    }
    render(){
        
        const result = this.props.response;
     
        let open = this.state.open;
        if (result){
            open = true;
        }
      console.log(this.state)
        return(
            <Container fluid className="main-content-container">
               { 
                 this.state.showAlert && <SweetAlert
                    info
                    showCancel
                    confirmBtnText="Отправить !"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title="Ты уверен?"
                    onConfirm={this.onConfirm}
                    onCancel={() => this.setState({ showAlert: false })}
                >
                    Вы хотите отправить свои ответы на сервер, чтобы проверить результаты ?
                 </SweetAlert>
                }


                <Modal size="lg" open={open} toggle={this.toggleResult}>
                    <ModalHeader>Результат вашего теста</ModalHeader>
                    <ModalBody>
                        <ListGroup>
                            {result && result.map((question, isx)=>(
                                <ListGroupItem id={isx+1} key={isx} className="px-3 pb-2">
                                    <b style={{ "fontWeight": "1000", marginRight: "10px" }}>{isx + 1}{" - "}{question.question}</b>
                                    <br />
                                    <br />
                                    {question.answers.map((val, i) => (
                                        <Badge key={i} theme={
                                            val.status === -1 ? "danger" : val.status===1 ?"success": val.status=== -2?"warning":"light"
                                        } style={{ fontSize: "16px", margin: "10px" }}>
                                            {i+ 1}{" - "} {val.answer}
                                        </Badge>
                                    ))}
                                    <img alt="img" style={{ position: "absolute", width: "50px",top:"5px", right: "10px" }} src={question.status? tickImg:failImg}/>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Link to="/"> Go Home Page </Link>
                    </ModalFooter>
                </Modal>

                <Row>
                    <Col  lg="4" sm="12">
                        {this.props.test && this.props.test.type === "mp4_or_mp3" ? <Player
                            playsInline
                            poster={this.props.test.coverImage}
                            src={this.props.test.url_media}
                        /> : this.props.test.type === "youtube" ? <YouTube opts={{ width: "100%", height: "300px" }}
                                videoId={this.props.test.url_media ? this.props.test.url_media.split("=")[1].split("&")[0] : ""}
                        /> : <Alert > Loading ...... </Alert>}
                    </Col>
                    <Col lg="8" sm="12" style={{ height: "600px", overflow: "auto" }}>
                        <Scrollbars>
                            <ListGroup>
                                <ListGroupItem>
                                    
                                    <Button outline pill theme="dark" onClick={this.toggle}>Ответь на вопросы</Button>
                                    {this.state.start && <TimeDown time={this.props.test.timeTest}  stop={this.stop} />} 
                                </ListGroupItem>
                                <Collapse open={this.state.collapse}>
                                {this.props.test ? this.props.test.questions.map((question, isx) => (
                                    <ListGroupItem id={isx + 1} key={isx} className="px-3 pb-2">
                                        <b style={{ "fontWeight": "1000", marginRight: "10px" }}>{isx + 1}{" - "}{question.question}</b>
                                        <br/>
                                        <br />
                                        {question.answers.map((val, i) => (
                                            <Badge onClick={e => { this.answerHandle(val.id, e) }} key={i} style={{ fontSize: "16px", margin: "10px", cursor: "pointer" }}>
                                                {i + 1}{" - "} {val.answer}
                                            </Badge>
                                        ))}
                                    </ListGroupItem>
                                )) : <Alert > Loading ...... </Alert>}
                                    <ListGroupItem  style={{ height: "50px" }}>
                                        <Button style={{ position: "absolute", right: "15px" }} pill theme="success" onClick={() => this.setState({ showAlert: true })}>Oтправить свои ответы</Button>
                                    </ListGroupItem>
                                </Collapse>
                              
                            </ListGroup>
                        </Scrollbars>
                    </Col>
                </Row>
            </Container>
        )
    }
}
const mapStateToProps = state => ({
    response: state.test.response
})
  const mapDispatchToProps = dispatch =>({
      _checkTest: test => { dispatch(testActions.checkTest(test)) },
      _resetResult: () => { dispatch({ type: "RESET_TEST" }) }
  })
export default connect(mapStateToProps,mapDispatchToProps)(videoTest);