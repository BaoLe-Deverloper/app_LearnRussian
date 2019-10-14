import React, { Component } from "react";
import { Container, Row, Col, ListGroupItem, ListGroup, Badge, Button } from "shards-react";
import { Scrollbars } from 'react-custom-scrollbars';
import renderHTML from 'react-render-html';
import TimeDown from './TimeDown';
import { Link} from "react-router-dom"
import SweetAlert from 'react-bootstrap-sweetalert';
import { connect } from 'react-redux';
import { testActions } from './../../Redux/Actions';
import tickImg from "./../../images/system/tick.jpg";
import failImg from "./../../images/system/Fail.png"
import "./test.css"
class test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answers: [],
            showAlert: false,
        }
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
                questionOld.answers = questionOld.answers.filter(q => q.id !== id); 
        } else
            answers.push({ number: number, answers: [{ id: id }] });

        this.setState({ answers });
    }
    stop = ()=>{
        this.onConfirm();
    }
    onConfirm = () => {

        const test = { id: this.props.id, clientAnswers: this.state.answers };
        this.props._checkTest(test);
        this.setState({ showAlert: false });
    }
    componentWillUnmount = () =>{
        if (this.props.response)
          this.props._resetResult();
    }
    render() {
        const result = this.props.response;
       // console.log(result)
        const html = this.props.test ? this.props.test.url_media : "<p>loading...</p>";
        let questions = this.props.test ? this.props.test.questions.map((question, isx) => (
            <ListGroupItem id={question.number} key={isx} className="px-3 pb-2">
                <b style={{ "fontWeight": "1000", marginRight: "10px" }}>{question.number}</b>
                {question.answers.map((val, i) => (
                    <Badge onClick={e => { this.answerHandle(val.id, e) }} key={i} style={{ fontSize: "16px", marginRight: "10px", cursor: "pointer" }}>
                        {val.answer}
                    </Badge>
                ))}
            </ListGroupItem>
        )) : "loading..";

        questions = result ? result.map((question, isx) => (
            <ListGroupItem id={isx + 1} key={isx} className="px-3 pb-2">
                <b style={{ "fontWeight": "1000", marginRight: "10px" }}>{question.number + " - "}</b>

                {question.answers.map((val, i) => (
                    <Badge key={i} theme={
                        val.status === -1 ? "danger" : val.status === 1 ? "success" : val.status === -2 ? "warning" : "light"
                    } style={{ fontSize: "16px", margin: "10px" }}>
                        {' '} {val.answer} {' '}
                    </Badge>
                ))}
                <img alt="img" style={{ position: "absolute", width: "50px", top: "5px", right: "10px" }} src={question.status ? tickImg : failImg} />
            </ListGroupItem>
        )) : questions;

        return (
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
                <Row noGutters className="page-header" style={{height:"50px", position:"relative"}}>
                    {this.props.test && !result? <TimeDown time={this.props.test.timeTest} stop={this.stop} />:""}
                </Row>
                <Row>
                    <Col style={{ height: "600px" }} lg="9" sm="12">
                        <Scrollbars>
                            {renderHTML(html)}
                        </Scrollbars>

                    </Col>
                    <Col className="answer_css" lg="3" sm="12" >
                        <Scrollbars>
                            <ListGroup style={{marginRight:"30px"}}>
                                <ListGroupItem>
                                    <h3 className="text-center">Answers</h3>
                                
                                </ListGroupItem>

                                {questions}
                                <ListGroupItem style={{ height: "50px" }}>
                                    {result ? <Link to="/"> Go Home Page </Link>:<Button style={{ position: "absolute", right: "15px" }} pill theme="success" onClick={() => this.setState({ showAlert: true })}>Oтправить свои ответы</Button>}
                                   
                                </ListGroupItem>
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
const mapDispatchToProps = dispatch => ({
    _checkTest: test => { dispatch(testActions.checkTest(test)) },
    _resetResult: () => { dispatch({type:"RESET_TEST"})}
})
export default connect(mapStateToProps, mapDispatchToProps)(test);